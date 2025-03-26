# 🚀 The Eye - Système de Surveillance Intelligente Avancé

![Bannière du projet](static/images/eye.png)

**The Eye** est une plateforme complète alliant surveillance en temps réel et prédiction d'activités suspectes grâce à des modèles de machine learning avancés.

## 🔍 Algorithmes de Prédiction

### 🛠️ Stack Technologique
![Scikit-learn](https://img.shields.io/badge/Scikit--learn-1.2+-blue?logo=scikit-learn)
![XGBoost](https://img.shields.io/badge/XGBoost-1.7+-green?logo=xgboost)
![TensorFlow](https://img.shields.io/badge/TensorFlow-2.12+-orange?logo=tensorflow)

### 📊 Pipeline de Prédiction
```mermaid
graph LR
    A[Données historiques] --> B(Feature Engineering)
    B --> C[Entraînement des modèles]
    C --> D((Modèle final))
    D --> E[Prédictions en temps réel]
    E --> F[Dashboard]

    Modèles Implémentés

Modèle	Précision	Recall	Cas d'utilisation
Random Forest	92%	89%	Détection d'intrusions
XGBoost	94%	91%	Prédiction temporelle
LSTM	89%	85%	Séries temporelles complexes
📈 Features Clés

Variables temporelles (heures, jours, saisons)
Densité d'objets détectés par YOLO
Mouvements (vitesse, direction)
Contexte géographique (zone sensible, historique)
🌟 Fonctionnalités Principales (Mise à jour)

🤖 Algorithme hybride (YOLOv8 + Random Forest)
⏳ Prédiction proactive (15-30 min à l'avance)
🔄 Auto-apprentissage continu
📉 Analyse des tendances long terme