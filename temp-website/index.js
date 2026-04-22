let totalRainL = 0;

// 🌧️ Obtener lluvia diaria
async function getRain() {
  try {
    const lat = 42.24;
    const lon = -8.72;

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=precipitation`;

    const res = await fetch(url);
    const data = await res.json();

    let total = 0;

    for (let i = 0; i < 24; i++) {
      total += data.hourly.precipitation[i];
    }

    totalRainL = total;

    document.getElementById("rain").textContent =
      `${total.toFixed(2)} L/m² hoy`;

  } catch (err) {
    document.getElementById("rain").textContent =
      "Error al obtener lluvia";
  }
}

// 📡 Solo gestionar datos del HUB (entrada/salida)
function setupZones() {
  const zones = document.querySelectorAll(".zone");

  zones.forEach((zone, index) => {
    const areaInput = zone.querySelector(".area");
    const levelSelect = zone.querySelector(".level");

    // 💾 cargar datos guardados si existen
    const savedArea = localStorage.getItem(`zone_${index}_area`);
    const savedLevel = localStorage.getItem(`zone_${index}_level`);

    if (savedArea) areaInput.value = savedArea;
    if (savedLevel) levelSelect.value = savedLevel;

    // 💾 guardar cambios en HUB (localStorage por ahora)
    areaInput.addEventListener("input", () => {
      localStorage.setItem(`zone_${index}_area`, areaInput.value);
    });

    levelSelect.addEventListener("change", () => {
      localStorage.setItem(`zone_${index}_level`, levelSelect.value);
    });
  });
}

// 🚀 init
getRain();
setupZones();