from collections import defaultdict
from ultralytics import YOLO
from datetime import datetime

def alert_level_alpha(detection_history):
    boat_detections = [t for label, detections in detection_history.items() if label == "boat" for t in detections]
    person_detections = [t for label, detections in detection_history.items() if label == "person" for t in detections]
    return len(boat_detections) > 0 and len(person_detections) > 10

def alert_level_alpha_thermal(detection_history):
    thermal_boat_detections = [t for label, detections in detection_history.items() if label == "boat" for t in detections]
    thermal_person_detections = [t for label, detections in detection_history.items() if label == "person" for t in detections]
    return len(thermal_boat_detections) > 0 and len(thermal_person_detections) > 10

def thermal_confirmation(detection_history):
    """ en raison du manque de camera thermique la confirmation thermique est actuellement hyphothetique """
    thermal_boat_detections = [t for label, detections in detection_history.items() if label == "boat" for t in detections]
    thermal_person_detections = [t for label, detections in detection_history.items() if label == "person" for t in detections]
    return len(thermal_boat_detections) > 0 and len(thermal_person_detections) > 10

def alert_level_beta(detection_history):
    if (
       alert_level_alpha(detection_history) and 
       thermal_confirmation(detection_history)
    ):
        return True


def weather():
    return False

def time():
    now = datetime.now().hour 
    return now >= 23 or now < 5  

def person(detection_history):
    person_detections = [t for label, detections in detection_history.items() if label == "person" for t in detections]
    return len(person_detections) > 50

def boat(detection_history):
    boat_detections = [t for label, detections in detection_history.items() if label == "boat" for t in detections]
    return len(boat_detections) > 0

def alert_level_gamma(detection_history):
    if (
        person(detection_history) and
        boat(detection_history) and 
        thermal_confirmation(detection_history)and
        time() and
        weather()
    ):
        return True