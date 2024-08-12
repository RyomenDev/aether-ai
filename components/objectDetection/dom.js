// dom.js

export function updatePredictions(predictions, predictionsElement) {
  predictionsElement.innerHTML =
    "<h3>Predictions:</h3><ul>" +
    predictions
      .map(
        (prediction) =>
          `<li>${prediction.class} (${(prediction.score * 100).toFixed(
            2
          )}%)</li>`
      )
      .join("") +
    "</ul>";
}

export function updateOverlay(predictions, overlayElement) {
  overlayElement.innerHTML = predictions
    .map(
      (prediction) => `
        <div class="annotation" style="
            left: ${prediction.bbox[0]}px;
            top: ${prediction.bbox[1]}px;
            width: ${prediction.bbox[2] - prediction.bbox[0]}px;
            height: ${prediction.bbox[3] - prediction.bbox[1]}px;
            border: 2px solid red;
        ">
            <p style="
                position: absolute;
                left: ${prediction.bbox[0]}px;
                top: ${prediction.bbox[1] - 20}px;
                background: rgba(255, 255, 255, 0.7);
                padding: 5px;
                border-radius: 5px;
            ">
                ${prediction.class} - ${Math.round(
        prediction.score * 100
      )}% confidence
            </p>
        </div>
    `
    )
    .join("");
}

export function updateImages(images, imageCardsElement) {
  imageCardsElement.innerHTML = Object.keys(images)
    .map(
      (key) => `
        <div class="card">
            <h4>${key}</h4>
            <img src="${images[key]}" alt="${key}" />
        </div>
    `
    )
    .join("");
}
