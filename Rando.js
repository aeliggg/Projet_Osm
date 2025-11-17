
const map = L.map('map').setView([45.185198, 6.480861], 20);


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);



fetch("data/reseau-2000-rando.geojson")
  .then(r => r.json())
  .then(geojsonData => {
    L.geoJSON(geojsonData, {
      style: {
        color: "blue",
        weight: 2
      },
      onEachFeature: (feature, layer) => {
        const p = feature.properties;

        let html = `
          <b>Itinéraire :</b> ${p.nom_itineraire || "Non renseigné"}<br>
          <b>Pratique :</b> ${p.pratique || "?"}<br>
          <b>Type :</b> ${p.type_itinéraire || "?"}<br>
          <b>Gestion :</b> ${p.gestion || "?"}<br>
          <b>Commune(s) :</b> ${p.communes_nom || "?"}<br>
          <b>Type de sol :</b> ${p.type_sol || "?"}<br>
        `;

        layer.bindTooltip(html);
      }
    }).addTo(map);
  });