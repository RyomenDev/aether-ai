document.addEventListener("DOMContentLoaded", () => {
  const markerContainer = document.querySelector("a-scene");

  const generateMarkers = (startChar, endChar) => {
    for (let i = startChar.charCodeAt(0); i <= endChar.charCodeAt(0); i++) {
      const char = String.fromCharCode(i);

      // Create the marker element
      const marker = document.createElement("a-marker");
      marker.setAttribute("type", "pattern");
      marker.setAttribute(
        "url",
        `../assets/customMarkers/Patt/pattern-${char}.patt`
      );

      // Create the image element
      const image = document.createElement("a-image");
      image.setAttribute("src", `#${char}`);
      image.setAttribute("rotation", "90 0 0");
      image.setAttribute("position", "0 0 0");

      // Append the image to the marker
      marker.appendChild(image);

      // Append the marker to the scene
      markerContainer.appendChild(marker);
    }
  };

  // Generate markers from D to Z
  generateMarkers("D", "Z");
});
