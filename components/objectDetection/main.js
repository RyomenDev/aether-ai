
import { fetchUnsplashImages } from "./api.js";
import { isWebcamStarted, startWebcam, stopWebcam } from "./webcam.js";
import { loadModel, predictObject } from "./prediction.js";
import { updatePredictions, updateOverlay, updateImages } from "./dom.js";

document.addEventListener("DOMContentLoaded", async () => {
  const video = document.getElementById("video");
  const overlay = document.getElementById("overlay");
  const predictionsElement = document.getElementById("predictions");
  const imageCardsElement = document.getElementById("image-cards");
  const toggleWebcamButton = document.getElementById("toggleWebcam");

  await loadModel();

  toggleWebcamButton.addEventListener("click", async () => {
    if (isWebcamStarted) {
      stopWebcam(video, toggleWebcamButton);
      predictionsElement.innerHTML = "";
      imageCardsElement.innerHTML = "";
    } else {
      startWebcam(video, toggleWebcamButton);
      setInterval(async () => {
        const predictions = await predictObject(video);
        updatePredictions(predictions, predictionsElement);
        updateOverlay(predictions, overlay);

        const updatedImages = {};
        for (const prediction of predictions) {
          const images = await fetchUnsplashImages(prediction.class);
          updatedImages[prediction.class] = images[0] || "";
        }
        updateImages(updatedImages, imageCardsElement);
      }, 500);
    }
  });
});
