document.addEventListener("DOMContentLoaded", async () => {
  const UNSPLASH_API_KEY = "tBM14o9tfvarzQBIaM-NVHHDLG6c_v1jPQL51DM1Euo";
  const UNSPLASH_API_URL = "https://api.unsplash.com/search/photos";

  let model = null;
  let isWebcamStarted = false;
  const video = document.getElementById("video");
  const overlay = document.getElementById("overlay");
  const predictionsElement = document.getElementById("predictions");
  const imageCardsElement = document.getElementById("image-cards");
  const toggleWebcamButton = document.getElementById("toggleWebcam");

  async function fetchUnsplashImages(query) {
    try {
      const response = await fetch(
        `${UNSPLASH_API_URL}?query=${query}&client_id=${UNSPLASH_API_KEY}`
      );
      const data = await response.json();
      console.log(`Unsplash response for ${query}:`, data); // Log the entire response for debugging
      return data.results.map((result) => result.urls.small);
    } catch (error) {
      console.error("Error fetching images from Unsplash:", error);
      return [];
    }
  }

  async function predictObject() {
    if (model && video) {
      const predictions = await model.detect(video);
      updatePredictions(predictions);
      const updatedImages = {};
      for (const prediction of predictions) {
        const images = await fetchUnsplashImages(prediction.class);
        console.log(`Images for ${prediction.class}:`, images); // Log fetched images
        updatedImages[prediction.class] = images[0] || ""; // Use the first image URL for each detected object
      }
      updateImages(updatedImages);
    }
  }

  function updatePredictions(predictions) {
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
    updateOverlay(predictions);
  }

  function updateOverlay(predictions) {
    overlay.innerHTML = predictions
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

  function updateImages(images) {
    console.log("Updating images with:", images); // Log images before updating the DOM
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

  async function startWebcam() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      video.srcObject = stream;
      video.play();
      isWebcamStarted = true;
      toggleWebcamButton.textContent = "Stop Webcam";
      setInterval(predictObject, 500);
    } catch (error) {
      console.error("Error accessing webcam:", error);
    }
  }

  function stopWebcam() {
    if (video.srcObject) {
      const stream = video.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      video.srcObject = null;
      isWebcamStarted = false;
      toggleWebcamButton.textContent = "Start Webcam";
      predictionsElement.innerHTML = "";
      imageCardsElement.innerHTML = "";
    }
  }

  toggleWebcamButton.addEventListener("click", () => {
    if (isWebcamStarted) {
      stopWebcam();
    } else {
      startWebcam();
    }
  });

  // Load the model when the page is loaded
  cocoSsd.load().then((loadedModel) => {
    model = loadedModel;
  });
});
