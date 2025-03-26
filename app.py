import cv2
import time
from collections import defaultdict
import pygame
import json
import asyncio
from flask import Flask, render_template, Response, jsonify
from ultralytics import YOLO
from telegram import Bot
import fonc
from config import (
    TELEGRAM_BOT_TOKEN,
    TELEGRAM_CHAT_ID,
    VIDEO_PATH,
    MODEL_PATH,
    ALARM_SOUND_PATH,
    DETECTION_WINDOW,
    PAUSE_DURATION,
)

app = Flask(__name__)
pygame.mixer.init()
alarm_sound = pygame.mixer.Sound("alarm.wav")

model = YOLO("yolo11n.pt")

detection_history = defaultdict(list)
latest_detection_data = {"speed": "", "detections": []}


async def send_telegram_notification():
    """Envoie une notification Telegram en cas d'activité suspecte."""
    bot = Bot(token=TELEGRAM_BOT_TOKEN)
    latitude, longitude = 14.7460, -17.5210
    message = (
        "🚨 **Alerte Patrouille** 🚨\n\n"
        "Une alerte de patrouille a été déclenchée et confirmée sur la plage de N'Gor, Dakar.\n\n"
        f"📍 **Coordonnées** :\nLatitude : {latitude}\nLongitude : {longitude}\n\n"
        f"🔗 [Voir sur la carte](https://www.google.com/maps?q={latitude},{longitude})"
    )
    await bot.send_message(
        chat_id=TELEGRAM_CHAT_ID, text=message, parse_mode="Markdown"
    )


def process_frame(frame):
    """Traite une frame pour détecter les objets et retourne les résultats."""
    results = model(frame)
    detections = []

    for result in results:
        boxes = result.boxes
        for box in boxes:
            cls = int(box.cls)
            label = model.names[cls]
            conf = float(box.conf)
            x1, y1, x2, y2 = map(int, box.xyxy[0])

            # Dessiner la boîte et le label
            cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
            cv2.putText(
                frame,
                label,
                (x1, y1 - 10),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.9,
                (0, 255, 0),
                2,
            )

            detections.append(
                {"label": label, "confidence": conf, "bbox": [x1, y1, x2, y2]}
            )

    return results, detections


def gen_frames():
    """Générateur de frames pour le flux vidéo."""
    global latest_detection_data

    cap = cv2.VideoCapture(VIDEO_PATH) 
    if not cap.isOpened():
        raise RuntimeError("Erreur : Impossible d'ouvrir la vidéo.")

    start_time = time.time()
    frame_count = 0
    pause = False

    try:
        while True:
            if not pause:
                ret, frame = cap.read()
                if not ret:
                    cap.set(cv2.CAP_PROP_POS_FRAMES, 0)
                    continue

                results, detections = process_frame(frame)
                speed_info = results[0].speed

                latest_detection_data = {
                    "speed": (
                        f"Speed: {speed_info['preprocess']:.1f}ms preprocess, "
                        f"{speed_info['inference']:.1f}ms inference, "
                        f"{speed_info['postprocess']:.1f}ms postprocess per image at shape {results[0].orig_shape}"
                    ),
                    "detections": detections,
                }

                # Vérifier les activités suspectes
                if time.time() - start_time >= DETECTION_WINDOW:
                    if fonc.check_suspicious_activity_1(detection_history):
                        for result in results:
                            for box in result.boxes:
                                x1, y1, x2, y2 = map(int, box.xyxy[0])
                                cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 0, 255), 2)
                                cv2.putText(
                                    frame,
                                    "Activité suspecte détectée",
                                    (x1, y1 - 30),
                                    cv2.FONT_HERSHEY_SIMPLEX,
                                    0.9,
                                    (0, 0, 255),
                                    2,
                                )

                        alarm_sound.play()
                        print("Activité suspecte détectée !")
                        pause = True
                        start_time = time.time()

                    detection_history.clear()
                    start_time = time.time()

            if pause and time.time() - start_time >= PAUSE_DURATION:
                pause = False
                start_time = time.time()

            _, buffer = cv2.imencode(".jpg", frame)
            frame_bytes = buffer.tobytes()
            yield (
                b"--frame\r\n"
                b"Content-Type: image/jpeg\r\n\r\n" + frame_bytes + b"\r\n"
            )
    finally:
        cap.release() 


@app.route("/")
def index():
    """Route principale pour l'interface web."""
    return render_template("index.html")

@app.route("/stats")
def stats():
    return render_template("stats.html")

@app.route("/video_feed")
def video_feed():
    """Route pour le flux vidéo."""
    return Response(gen_frames(), mimetype="multipart/x-mixed-replace; boundary=frame")


@app.route("/detection_data")
def detection_data():
    """Route pour obtenir les données de détection."""
    return jsonify(latest_detection_data)


@app.route("/send_alert", methods=["POST"])
def send_alert():
    """Route pour envoyer une alerte Telegram."""
    try:
        asyncio.run(send_telegram_notification())
        return jsonify(
            {"status": "success", "message": "Notification envoyée avec succès !"}
        )
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


if __name__ == "__main__":
    app.run(port=6000,debug=True)
