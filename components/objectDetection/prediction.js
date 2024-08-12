

let model = null;

export async function loadModel() {
  model = await cocoSsd.load();
}

export async function predictObject(videoElement) {
  if (model && videoElement) {
    const predictions = await model.detect(videoElement);
    return predictions;
  }
  return [];
}
