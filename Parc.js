// --- Initialisation de la carte ---
const map = L.map('map').setView([46.5, 2], 6);

// --- Fond OpenStreetMap ---
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// --- Couche 1 : Parcs naturels ---
fetch("data/pnr.geojson")
  .then(r => r.json())
  .then(geojsonData => {
    L.geoJSON(geojsonData, {
      style: {
        color: "green",
        weight: 2,
        fillOpacity: 0.3
      },
      onEachFeature: (feature, layer) => {
        const p = feature.properties;
        layer.bindTooltip(`<b>Parc :</b> ${p.DRGP_L_LIB}`);
      }
    }).addTo(map);
  });


