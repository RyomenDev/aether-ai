// Initialize Howl objects with volume set to 0.2
let guitar = new Howl({
  src: ["../assets/audio/guitar.mp3"],
  volume: 0.1,
});

let mic = new Howl({
  src: ["../assets/audio/mic.mp3"],
  volume: 0.1,
});

let drums = new Howl({
  src: ["../assets/audio/drums.mp3"],
  volume: 0.1,
});

let piano = new Howl({
  src: ["../assets/audio/piano.mp3"],
  volume: 0.1,
});

// Map marker names to their corresponding Howl objects
let audioMap = {
  guitar: guitar,
  drums: drums,
  piano: piano,
  mic: mic,
};

// Play all sounds on page load with initial volume set to 0.2
guitar.play();
mic.play();
drums.play();
piano.play();

window.onload = function () {
  let arMarkers = document.getElementsByClassName("ar-marker");

  Array.from(arMarkers).forEach(function (arMarker) {
    let name = arMarker.getAttribute("name");

    arMarker.addEventListener("markerFound", function () {
      audioMap[name].volume(1); // Set volume to 1 when marker is detected
    });

    arMarker.addEventListener("markerLost", function () {
      audioMap[name].volume(0.1); // Set volume to 0.1 when marker is not detected
    });
  });
};
