// --- Initialisation de la carte ---
const map = L.map('map').setView([46.5, 2], 6);

// --- Fond OpenStreetMap ---
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// --- Chargement du fichier GeoJSON ---
fetch("data/parcs.geojson")
  .then(response => response.json())
  .then(geojsonData => {

    // Ajout du GeoJSON sur la carte
    L.geoJSON(geojsonData, {
      onEachFeature: (feature, layer) => {

        // Tooltip au survol
        layer.bindTooltip(
          `<b>${feature.properties.nom}</b><br>
           Ville : ${feature.properties.ville ?? "N/A"}<br>
           Région : ${feature.properties.region ?? "N/A"}`
        );
      },

      // Style visuel des parcs
      style: {
        color: "green",
        weight: 2,
        fillOpacity: 0.3
      }
    }).addTo(map);

  })
  .catch(err => console.error("Erreur GeoJSON :", err));
