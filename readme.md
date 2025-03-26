# 👁️ The Eye - Système de Surveillance Intelligente Avancé

![Bannière du projet](static/images/banner.jpg)

**The Eye** est une plateforme complète alliant surveillance en temps réel et prédiction d'activités suspectes grâce à des modèles de machine learning avancés.

---

## 🔍 Algorithmes de Prédiction

### 🛠️ Stack Technologique

![Scikit-learn](https://img.shields.io/badge/Scikit--learn-1.2+-blue?logo=scikit-learn) ![XGBoost](https://img.shields.io/badge/XGBoost-1.7+-green?logo=xgboost) ![TensorFlow](https://img.shields.io/badge/TensorFlow-2.12+-orange?logo=tensorflow)

### 📊 Pipeline de Prédiction
```mermaid
graph TD
    A[Flux Vidéo] --> B{Détection YOLO}
    B -->|Objets| C[Features Engineering]
    B -->|Activités| D[Analyse Temporelle]
    C --> E[Modèle Random Forest]
    D --> F[Modèle LSTM]
    E --> G[Prédiction]
    F --> G
    G --> H[Dashboard]
```

### 📈 Modèles Implémentés

| Modèle         | Précision | Recall | Cas d'utilisation         |
|---------------|-----------|--------|---------------------------|
| Random Forest | 92%       | 89%    | Détection d'intrusions    |
| XGBoost       | 94%       | 91%    | Prédiction temporelle     |
| LSTM          | 89%       | 85%    | Séries temporelles complexes |

### 🔑 Features Clés

- Variables temporelles (heures, jours, saisons)
- Densité d'objets détectés par YOLO
- Mouvements (vitesse, direction)
- Contexte géographique (zone sensible, historique)

---

## 🌟 Fonctionnalités Principales

- 🤖 Algorithme hybride (YOLOv8 + Random Forest)
- ⏳ Prédiction proactive (15-30 min à l'avance)
- 🔄 Auto-apprentissage continu
- 📉 Analyse des tendances long terme

---

## 🖥️ Interface Utilisateur

![Interface](static/images/interface.png)

L'interface comprend :

- 4 flux vidéo en temps réel
- Graphiques analytiques
- Historique des détections
- Contrôles rapides (drones, patrouilles)
- Système de filtres avancés

---

## ⚙️ Installation

### 1️⃣ Prérequis

- Python 3.9+
- NVIDIA GPU (recommandé)

### 2️⃣ Installation

```bash
git clone https://github.com/agentLakh/the_eye.git
cd the_eye
pip install -r requirements.txt
```

### 3️⃣ Configuration des variables d'environnement

Créez un fichier `config.py` avec :

```python
TELEGRAM_BOT_TOKEN = "votre_token"
TELEGRAM_CHAT_ID = "votre_chat_id"
VIDEO_PATH = "chemin/vers/video.mp4"
MODEL_PATH = "yolov8n.pt"
ALARM_SOUND_PATH = "static/sounds/alarm.wav"
```

### 4️⃣ Lancement

```bash
python3 model.py
```

---

## 📡 Architecture

```mermaid
sequenceDiagram
    participant C as Caméra
    participant S as Serveur
    participant M as Modèle YOLO
    participant T as Telegram
    
    C->>S: Flux vidéo
    S->>M: Frame à analyser
    M-->>S: Résultats détection
    alt Activité suspecte
        S->>T: Envoi notification
        S->>S: Déclenche alarme
    end
    S->>S: Mise à jour dashboard
```

---

## 🚨 Fonctions d'Alerte

| Niveau | Couleur  | Gravité | Description                   |
|--------|---------|--------|--------------------------------|
| Alpha  | 🔵 Bleu  | Faible  | Mouvement inhabituel          |
| Beta   | 🟠 Orange | Moyenne | Objet suspect détecté        |
| Gamma  | 🔴 Rouge  | Haute   | Activité dangereuse confirmée |

---

## 📄 Licence

Ce projet est sous licence **MIT**. Voir le fichier `LICENSE` pour plus de détails.

---

## 📷 Captures d'écran supplémentaires

- **Filtres avancés** : Interface des filtres avancés
- **Alertes** : Gestion des alertes multi-niveaux

---

## 🔗 Liens utiles

- [📚 Documentation YOLOv8](https://github.com/ultralytics/yolov8)
- [🤖 API Telegram Bot](https://core.telegram.org/bots/api)
- [📸 OpenCV Documentation](https://docs.opencv.org/)

---

<div align="center">
    <img src="static/images/eye.png" width="200">
    <p>© 2023 The Eye - Système de Surveillance Intelligente</p>
</div>

