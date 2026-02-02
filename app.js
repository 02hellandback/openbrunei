const mapStatus = document.getElementById("map-status");
const mapCanvas = document.getElementById("map");
const MAP_SDK_URL = "https://map.cn/api.js";

function updateMapStatus(message, isError = false) {
  if (!mapStatus) return;
  mapStatus.textContent = message;
  mapStatus.style.color = isError ? "#b42318" : "#667085";
}

function loadMapSDK(url, timeout = 10000) {
  return new Promise((resolve, reject) => {
    if (window.MapCN) return resolve();
    // If the page already included the script via <script src="..." defer>, it may still be loading.
    // Poll briefly if the global isn't present yet.
    let pollTimer;
    const start = Date.now();

    function pollForGlobal() {
      if (window.MapCN) {
        clearInterval(pollTimer);
        return resolve();
      }
      if (Date.now() - start > timeout) {
        clearInterval(pollTimer);
        return reject(new Error("MapCN global not available"));
      }
    }

    pollTimer = setInterval(pollForGlobal, 150);

    // Also try to dynamically inject the SDK if it's not already referenced.
    // If a script with the same src exists, don't add another one.
    const exists = Array.from(document.scripts).some(s => s.src === url);
    if (exists) return; // keep polling until timeout or global appears

    const s = document.createElement("script");
    s.src = url;
    s.async = true;
    s.onload = () => {
      // let polling detect the global
    };
    s.onerror = () => {
      clearInterval(pollTimer);
      reject(new Error("Failed to load MapCN SDK"));
    };
    document.head.appendChild(s);
  });
}

function tryCreateMap() {
  try {
    const options = { center: [4.9031, 114.9398], zoom: 12 };
    let map;

    if (window.MapCN && typeof window.MapCN.Map === "function") {
      // Try constructing with the element first, fallback to id string
      try {
        map = new window.MapCN.Map(mapCanvas, options);
      } catch (err) {
        map = new window.MapCN.Map("map", options);
      }
    } else if (window.MapCN && typeof window.MapCN.create === "function") {
      map = window.MapCN.create(mapCanvas, options);
    } else {
      throw new Error("Unsupported MapCN API");
    }

    if (map && typeof map.addMarker === "function") {
      map.addMarker({ position: [4.8897, 114.9414], label: "Omar Ali Saifuddien Mosque" });
    }

    mapCanvas.classList.add("has-map");
    updateMapStatus("MapCN loaded. Explore highlighted places on the map.");
    return true;
  } catch (err) {
    updateMapStatus("MapCN SDK loaded but failed to initialize map: " + err.message, true);
    return false;
  }
}

async function initializeMap() {
  try {
    updateMapStatus("Initializing MapCN...");
    await loadMapSDK(MAP_SDK_URL);
    const ok = tryCreateMap();
    if (!ok) {
      updateMapStatus("MapCN SDK loaded but initialization failed.", true);
    }
  } catch (err) {
    updateMapStatus("MapCN SDK not detected. Connect the MapCN API to enable live map tiles.", true);
  }
}

window.addEventListener("load", initializeMap);
