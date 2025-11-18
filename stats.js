"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchStats = fetchStats;
const geocoding_js_1 = require("./geocoding.js");
let statsVisible = false;
function toggleStats() {
    const panel = document.getElementById('stats-panel');
    const button = document.getElementById('stats-button');
    if (!panel || !button)
        return;
    if (statsVisible) {
        panel.style.display = 'none';
        button.style.display = 'block';
    }
    else {
        panel.style.display = 'block';
        button.style.display = 'none';
        fetchStats();
    }
    statsVisible = !statsVisible;
}
function fetchStats() {
    const content = document.getElementById('stats-content');
    if (!content)
        return;
    const geocodingHits = geocoding_js_1.GeocodeCache.stats.geocoding.hits;
    const geocodingMisses = geocoding_js_1.GeocodeCache.stats.geocoding.misses;
    const geocodingTotal = geocodingHits + geocodingMisses;
    const geocodingRate = geocodingTotal > 0 ? Math.round((geocodingHits / geocodingTotal) * 100) : 0;
    const boundaryHits = geocoding_js_1.GeocodeCache.stats.boundary.hits;
    const boundaryMisses = geocoding_js_1.GeocodeCache.stats.boundary.misses;
    const boundaryTotal = boundaryHits + boundaryMisses;
    const boundaryRate = boundaryTotal > 0 ? Math.round((boundaryHits / boundaryTotal) * 100) : 0;
    const statsHTML = `
    <table>
      <tr>
        <th colspan="2">Cache</th>
      </tr>
      <tr>
        <td>Géocodage:</td>
        <td>${geocoding_js_1.GeocodeCache.geocode.size} entrées</td>
      </tr>
      <tr>
        <td>Frontières:</td>
        <td>${geocoding_js_1.GeocodeCache.boundary.size} entrées</td>
      </tr>
      <tr>
        <th colspan="2">Performance</th>
      </tr>
      <tr>
        <td>Taux cache géocodage:</td>
        <td>${geocodingRate}% (${geocodingHits}/${geocodingTotal})</td>
      </tr>
      <tr>
        <td>Taux cache frontières:</td>
        <td>${boundaryRate}% (${boundaryHits}/${boundaryTotal})</td>
      </tr>
      <tr>
        <th colspan="2">Client</th>
      </tr>
      <tr>
        <td>Version:</td>
        <td>2.0.0</td>
      </tr>
    </table>
    <div style="margin-top:10px; text-align:center;">
      <button onclick="fetchStats()" style="background:#2980b9; color:white; border:none; border-radius:4px; padding:5px 10px;">Rafraîchir</button>
    </div>
  `;
    content.innerHTML = statsHTML;
}
// Rendre fetchStats accessible globalement pour le bouton HTML
window.fetchStats = fetchStats;
document.addEventListener('DOMContentLoaded', () => {
    const statsButton = document.getElementById('stats-button');
    const closeStats = document.getElementById('close-stats');
    if (statsButton) {
        statsButton.addEventListener('click', toggleStats);
    }
    if (closeStats) {
        closeStats.addEventListener('click', toggleStats);
    }
});
//# sourceMappingURL=stats.js.map