

export let isWebcamStarted = false;

export async function startWebcam(videoElement, toggleButton) {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoElement.srcObject = stream;
    videoElement.play();
    isWebcamStarted = true;
    toggleButton.textContent = "Stop Webcam";
  } catch (error) {
    console.error("Error accessing webcam:", error);
  }
}

export function stopWebcam(videoElement, toggleButton) {
  if (videoElement.srcObject) {
    const stream = videoElement.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach((track) => track.stop());
    videoElement.srcObject = null;
    isWebcamStarted = false;
    toggleButton.textContent = "Start Webcam";
  }
}
