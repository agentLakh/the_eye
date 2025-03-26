  // Gestion de la modale
  document.getElementById('filter-btn').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('filter-modal').classList.remove('hidden');
});

document.getElementById('close-filter').addEventListener('click', function() {
    document.getElementById('filter-modal').classList.add('hidden');
});

document.getElementById('reset-filters').addEventListener('click', function() {
    // Réinitialiser tous les filtres
    document.querySelectorAll('#filter-modal input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
    });
});

document.getElementById('apply-filters').addEventListener('click', function() {
    // Récupérer les valeurs sélectionnées
    const filters = {
        period: Array.from(document.querySelectorAll('input[name="period"]:checked')).map(el => el.value),
        locations: Array.from(document.querySelectorAll('.filter-select option:checked')).map(el => el.value),
        alertTypes: Array.from(document.querySelectorAll('input[name="alert-type"]:checked')).map(el => el.value),
        options: {
            heatmap: document.querySelector('input[name="show-heatmap"]').checked,
            nightVision: document.querySelector('input[name="night-vision"]').checked
        }
    };
    
    console.log('Filtres appliqués:', filters);
    document.getElementById('filter-modal').classList.add('hidden');
    
    // Ici vous pouvez ajouter le code pour appliquer les filtres à votre dashboard
});

// Fermer la modale en cliquant à l'extérieur
document.getElementById('filter-modal').addEventListener('click', function(e) {
    if (e.target === this) {
        this.classList.add('hidden');
    }
});
    // Fonction pour basculer en plein écran
    function toggleFullscreen(cameraId) {
        const camera = document.getElementById(cameraId);
        
        if (camera.classList.contains('fullscreen')) {
            // Quitter le mode plein écran
            camera.classList.remove('fullscreen');
            camera.style.objectFit = 'cover';
            camera.parentElement.style.position = 'relative';
        } else {
            // Activer le mode plein écran
            camera.classList.add('fullscreen');
            camera.style.objectFit = 'contain';
            camera.parentElement.style.position = 'static';
        }
    }

    document.getElementById("drone-launch").addEventListener("click", () => {
        const codeCorrect = "1234"; // Remplace par ton code d'accès
        const userCode = prompt("Veuillez saisir le code de lancement du drone 🚀 :");

        if (userCode === codeCorrect) {
            alert("Drone en cours de lancement...");
            // Ajoute ici la fonction pour réellement lancer le drone
        } else {
            alert("Code incorrect. Accès refusé !");
        }
    });
    
    document.getElementById("thermal-vision").addEventListener("click", () => {
        alert("Fonctionnalité 'Activer la vision thermique' non implémentée.");
    });

    function showAlert(level) {
        alert(`Alerte de niveau ${level} activée!`);
    }

    // Fonction pour récupérer les données de détection
    async function fetchDetectionData() {
        try {
            const response = await fetch("/detection_data");
            const data = await response.json();

            // Afficher les informations de vitesse
            document.getElementById("speed-info").textContent = data.speed;

            // Afficher les détections
            const detectionsList = document.getElementById("detections-list");
            detectionsList.innerHTML = ""; // Effacer la liste précédente
            data.detections.forEach((detection) => {
                const li = document.createElement("li");
                li.textContent = `${detection.label} (${(detection.confidence * 100).toFixed(
                2
                )}%)`;
                detectionsList.appendChild(li);
            });
        } catch (error) {
            console.error(
            "Erreur lors de la récupération des données de détection :",
            error
            );
        }
    }

    // Mettre à jour les données toutes les secondes
    setInterval(fetchDetectionData, 1000);
    
    var ctx = document.getElementById('barChart').getContext('2d');
    var barChart = new Chart(ctx, {
        type: 'bar',  // Type de graphique : barres
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],  // Labels pour l'axe X
            datasets: [{
                label: 'Page Load Time (s)',  // Légende du graphique
                data: [2.5, 3.1, 2.7, 3.8, 2.4, 2.9],  // Données pour l'axe Y (temps de chargement en secondes)
                backgroundColor: 'rgba(75, 192, 192, 0.6)',  // Couleur des barres
                borderColor: 'rgba(75, 192, 192, 1)',  // Bordure des barres
                borderWidth: 1  // Épaisseur de la bordure
            }]
        },
        options: {
            responsive: true,  // Graphique responsive
            plugins: {
                legend: {
                    display: true  // Masquer la légende
                }
            },
            scales: {
                x: {
                    beginAtZero: true  // L'axe X commence à zéro
                },
                y: {
                    beginAtZero: true  // L'axe Y commence à zéro
                }
            }
        }
    });
    
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',  // Type de graphique (ici un graphique linéaire)
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],  // Labels pour l'axe X
            datasets: [{
                label: 'Server Requests',  // Légende de la courbe
                data: [12, 19, 3, 5, 2, 3, 8],  // Données pour l'axe Y
                borderColor: 'rgba(75, 192, 192, 1)',  // Couleur de la courbe
                backgroundColor: 'rgba(75, 192, 192, 0.2)',  // Couleur de fond de la courbe
                borderWidth: 1,  // Épaisseur de la courbe
                tension: 0.1  // Lissage de la courbe
            },
            {
                label: 'Client Requests',  // Nouvelle légende pour la deuxième courbe
                data: [5, 9, 2, 3, 7, 1, 4],  // Données pour la deuxième courbe
                borderColor: '#CD7408',  // Couleur de la courbe
                backgroundColor: 'rgba(205, 116, 8, 0.2)',  // Couleur de fond de la courbe
                borderWidth: 1,  // Épaisseur de la courbe
                tension: 0.1  // Lissage de la courbe
            }]
        },
        options: {
            responsive: true,  // Rendre le graphique responsive
            plugins: {
                legend: {
                    display: true  // Afficher la légende
                }
            },
            scales: {
                y: {
                    beginAtZero: true  // Commencer l'axe Y à zéro
                }
            }
        }
    });
    
    am5.ready(function() {

// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");


// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
am5themes_Animated.new(root)
]);


// Create the map chart
// https://www.amcharts.com/docs/v5/charts/map-chart/
var chart = root.container.children.push(am5map.MapChart.new(root, {
panX: "translateX",
panY: "translateY",
projection: am5map.geoMercator()
}));

var cont = chart.children.push(am5.Container.new(root, {
layout: root.horizontalLayout,
x: 20,
y: 40
}));


// Add labels and controls
cont.children.push(am5.Label.new(root, {
centerY: am5.p50,
text: "Map"
}));

var switchButton = cont.children.push(am5.Button.new(root, {
themeTags: ["switch"],
centerY: am5.p50,
icon: am5.Circle.new(root, {
themeTags: ["icon"]
})
}));

switchButton.on("active", function() {
if (!switchButton.get("active")) {
chart.set("projection", am5map.geoMercator());
chart.set("panX", "translateX");
chart.set("panY", "translateY");
}
else {
chart.set("projection", am5map.geoOrthographic());
chart.set("panX", "rotateX");
chart.set("panY", "rotateY");
}
});

cont.children.push(am5.Label.new(root, {
centerY: am5.p50,
text: "Globe"
}));

// Create main polygon series for countries
// https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/
var polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
geoJSON: am5geodata_worldLow
}));

var graticuleSeries = chart.series.push(am5map.GraticuleSeries.new(root, {}));
graticuleSeries.mapLines.template.setAll({
stroke: root.interfaceColors.get("alternativeBackground"),
strokeOpacity: 0.08
});

// Create line series for trajectory lines
// https://www.amcharts.com/docs/v5/charts/map-chart/map-line-series/

// this will be invisible line (note strokeOpacity = 0) along which invisible points will animate
var lineSeries = chart.series.push(am5map.MapLineSeries.new(root, {}));
lineSeries.mapLines.template.setAll({
stroke: root.interfaceColors.get("alternativeBackground"),
strokeOpacity: 0
});

// this will be visible line. Lines will connectg animating points so they will look like animated
var animatedLineSeries = chart.series.push(am5map.MapLineSeries.new(root, {}));
animatedLineSeries.mapLines.template.setAll({
stroke: root.interfaceColors.get("alternativeBackground"),
strokeOpacity: 0.6
});

// destination series
var citySeries = chart.series.push(
am5map.MapPointSeries.new(root, {})
);

// visible city circles
citySeries.bullets.push(function() {
var circle = am5.Circle.new(root, {
radius: 5,
tooltipText: "{title}",
tooltipY: 0,
fill: am5.color(0xffba00),
stroke: root.interfaceColors.get("background"),
strokeWidth: 2
});

return am5.Bullet.new(root, {
sprite: circle
});
});

// invisible series which will animate along invisible lines
var animatedBulletSeries = chart.series.push(
am5map.MapPointSeries.new(root, {})
);

animatedBulletSeries.bullets.push(function() {
var circle = am5.Circle.new(root, {
radius: 0
});

return am5.Bullet.new(root, {
sprite: circle
});
});


var cities = [
{
id: "london",
title: "London",
geometry: { type: "Point", coordinates: [-0.1262, 51.5002] },
},
{
id: "brussels",
title: "Brussels",
geometry: { type: "Point", coordinates: [4.3676, 50.8371] }
}, {
id: "prague",
title: "Prague",
geometry: { type: "Point", coordinates: [14.4205, 50.0878] }
}, {
id: "athens",
title: "Athens",
geometry: { type: "Point", coordinates: [23.7166, 37.9792] }
}, {
id: "reykjavik",
title: "Reykjavik",
geometry: { type: "Point", coordinates: [-21.8952, 64.1353] }
}, {
id: "dublin",
title: "Dublin",
geometry: { type: "Point", coordinates: [-6.2675, 53.3441] }
}, {
id: "oslo",
title: "Oslo",
geometry: { type: "Point", coordinates: [10.7387, 59.9138] }
}, {
id: "lisbon",
title: "Lisbon",
geometry: { type: "Point", coordinates: [-9.1355, 38.7072] }
}, {
id: "moscow",
title: "Moscow",
geometry: { type: "Point", coordinates: [37.6176, 55.7558] }
}, {
id: "belgrade",
title: "Belgrade",
geometry: { type: "Point", coordinates: [20.4781, 44.8048] }
}, {
id: "bratislava",
title: "Bratislava",
geometry: { type: "Point", coordinates: [17.1547, 48.2116] }
}, {
id: "ljublana",
title: "Ljubljana",
geometry: { type: "Point", coordinates: [14.5060, 46.0514] }
}, {
id: "madrid",
title: "Madrid",
geometry: { type: "Point", coordinates: [-3.7033, 40.4167] }
}, {
id: "stockholm",
title: "Stockholm",
geometry: { type: "Point", coordinates: [18.0645, 59.3328] }
}, {
id: "bern",
title: "Bern",
geometry: { type: "Point", coordinates: [7.4481, 46.9480] }
}, {
id: "kiev",
title: "Kiev",
geometry: { type: "Point", coordinates: [30.5367, 50.4422] }
}, {
id: "paris",
title: "Paris",
geometry: { type: "Point", coordinates: [2.3510, 48.8567] }
}, {
id: "new york",
title: "New York",
geometry: { type: "Point", coordinates: [-74, 40.43] }
}];

citySeries.data.setAll(cities);

// Prepare line series data
var destinations = ["reykjavik", "lisbon", "moscow", "belgrade", "ljublana", "madrid", "stockholm", "bern", "kiev", "new york"];

// London coordinates
var originLongitude = -0.1262;
var originLatitude = 51.5002;

var londonDataItem = citySeries.getDataItemById("london");

// this will do all the animations
am5.array.each(destinations, function(did) {
var destinationDataItem = citySeries.getDataItemById(did);
var lineDataItem = lineSeries.pushDataItem({});
lineDataItem.set("pointsToConnect", [londonDataItem, destinationDataItem])

var startDataItem = animatedBulletSeries.pushDataItem({});
startDataItem.setAll({
lineDataItem: lineDataItem,
positionOnLine: 0
});

var endDataItem = animatedBulletSeries.pushDataItem({});
endDataItem.setAll({
lineDataItem: lineDataItem,
positionOnLine: 1
});

var animatedLineDataItem = animatedLineSeries.pushDataItem({});
animatedLineDataItem.set("pointsToConnect", [startDataItem, endDataItem])

var lon0 = londonDataItem.get("longitude");
var lat0 = londonDataItem.get("latitude");

var lon1 = destinationDataItem.get("longitude");
var lat1 = destinationDataItem.get("latitude");


var distance = Math.hypot(lon1 - lon0, lat1 - lat0);
var duration = distance * 100;

animateStart(startDataItem, endDataItem, duration);
});

function animateStart(startDataItem, endDataItem, duration) {

var startAnimation = startDataItem.animate({
key: "positionOnLine",
from: 0,
to: 1,
duration: duration
});

startAnimation.events.on("stopped", function() {
animateEnd(startDataItem, endDataItem, duration);
});
}

function animateEnd(startDataItem, endDataItem, duration) {
startDataItem.set("positionOnLine", 0)
var endAnimation = endDataItem.animate({
key: "positionOnLine",
from: 0,
to: 1,
duration: duration
})

endAnimation.events.on("stopped", function() {
animateStart(startDataItem, endDataItem, duration);
});
}

polygonSeries.events.on("datavalidated", function() {
chart.zoomToGeoPoint({
longitude: -0.1262,
latitude: 51.5002
}, 3);
});


// Make stuff animate on load
chart.appear(1000, 100);

});
    
    function showPopup(title, message) {
        document.getElementById("popup-title").innerText = title;
        document.getElementById("popup-message").innerText = message;
        document.getElementById("popup").classList.remove("hidden");
    }

    function closePopup() {
        document.getElementById("popup").classList.add("hidden");
    }

    const SECURITY_CODE = "1234"; // Code de sécurité prédéfini

    document.getElementById("patrol-alert").addEventListener("click", async () => {
        // Demander à l'utilisateur de saisir le code de sécurité
        const userCode = prompt(
        "Veuillez entrer le code de sécurité pour envoyer l'alerte :"
        );

        // Vérifier si le code est correct
        if (userCode === SECURITY_CODE) {
            try {
                // Envoyer une requête à la route Flask pour déclencher la notification
                const response = await fetch("/send_alert", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({}), // Aucune donnée à envoyer
                });

                const result = await response.json();
                alert(result.message); // Afficher le message de succès
            } catch (error) {
                console.error("Erreur lors de l'envoi de l'alerte :", error);
                alert("Erreur lors de l'envoi de l'alerte.");
            }
        } else {
            // Code incorrect
            alert("Code de sécurité incorrect. Accès refusé !");
        }
    });