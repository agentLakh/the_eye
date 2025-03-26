from ultralytics import YOLO
import cv2
import time
from collections import defaultdict
import pygame
import fonc

pygame.mixer.init()
alarm_sound = pygame.mixer.Sound("alarm.wav")

detection_window = 30  # Période d'analyse en secondes
detection_history = defaultdict(list)  # Stocke les détections par classe

model = YOLO("yolo11n.pt")  

video_path = "VideoTest/dday.mp4"
cap = cv2.VideoCapture(video_path)

if not cap.isOpened():
    print("Erreur : Impossible d'ouvrir la vidéo.")
    exit()

start_time = time.time()
frame_count = 0
pause = False  

def surveiller():
    global frame_count, pause, frame, start_time

    while cap.isOpened():
        if not pause:
            ret, frame = cap.read()
            if not ret:
                break

        # Sauter des frames pour accélérer le traitement
        if not pause:
            cap.set(cv2.CAP_PROP_POS_FRAMES, cap.get(cv2.CAP_PROP_POS_FRAMES) + 2)

        results = model(frame,conf=0.60)

        for result in results:
            boxes = result.boxes 
            for box in boxes:
                cls = int(box.cls)  
                conf = float(box.conf)  
                label = model.names[cls]  

                x1, y1, x2, y2 = map(int, box.xyxy[0])  # Coordonnées de la boîte
                cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)  # Vert
                cv2.putText(frame, label, (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 255, 0), 2)

                detection_history[label].append((frame_count, time.time()))

        if time.time() - start_time >= detection_window:
            # Vérifier les activités suspectes
            if (
                
                fonc.check_suspicious_activity_1(detection_history)
                or fonc.check_suspicious_activity_2(detection_history)
                #or fonc.fire()
                ):
            
                for box in boxes:
                    x1, y1, x2, y2 = map(int, box.xyxy[0])
                    cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 0, 255), 2)  # Rouge
                    cv2.putText(frame, "Activité suspecte détectée", (x1, y1 - 30), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 0, 255), 2)

                alarm_sound.play()  
                print("Activité suspecte détectée !")

                pause = True

            detection_history.clear()
            start_time = time.time()

        cv2.imshow("Analyse en Direct", frame)

        key = cv2.waitKey(1) & 0xFF
        if key == ord(' '):  
            pause = False
        elif key == ord('q'): 
            break

        frame_count += 1

if __name__ == "__main__":
    surveiller()  

    cap.release()
    cv2.destroyAllWindows()
    pygame.mixer.quit()