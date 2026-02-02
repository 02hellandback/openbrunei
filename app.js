const mapStatus = document.getElementById("map-status");
const mapCanvas = document.getElementById("map");

function updateMapStatus(message, isError = false) {
  if (!mapStatus) return;
  mapStatus.textContent = message;
  mapStatus.style.color = isError ? "#b42318" : "#667085";
}

function initializeMap() {
  if (window.MapCN && typeof window.MapCN.Map === "function") {
    const map = new window.MapCN.Map(mapCanvas, {
      center: [4.9031, 114.9398],
      zoom: 12,
    });
    map.addMarker({
      position: [4.8897, 114.9414],
      label: "Omar Ali Saifuddien Mosque",
    });
    updateMapStatus("MapCN loaded. Explore highlighted places on the map.");
  } else {
    updateMapStatus(
      "MapCN SDK not detected. Connect the MapCN API to enable live map tiles.",
      true
    );
  }
}

window.addEventListener("load", initializeMap);
