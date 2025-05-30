import * as faceapi from 'face-api.js';

// Load models once at app start
export async function loadModels() {
  const MODEL_URL = process.env.PUBLIC_URL + '/models';
  await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
}

// Given an HTMLImageElement <img> or HTMLCanvasElement <canvas>, detect faces and blur them
export async function blurFacesInCanvas(canvasElement) {
  const options = new faceapi.TinyFaceDetectorOptions();
  // Detect all faces in the image
  const detections = await faceapi.detectAllFaces(canvasElement, options);

  const ctx = canvasElement.getContext('2d');
  for (const det of detections) {
    const box = det.box;
    // Extract the face region as image data
    const faceData = ctx.getImageData(box.x, box.y, box.width, box.height);

    // Simple box‐blur: draw that region at a smaller resolution, then scale back up
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = box.width / 8;  // downscale factor
    tempCanvas.height = box.height / 8;
    const tctx = tempCanvas.getContext('2d');

    // Draw the face region small
    tctx.drawImage(
      canvasElement,
      box.x,
      box.y,
      box.width,
      box.height,
      0,
      0,
      tempCanvas.width,
      tempCanvas.height
    );
    // Now scale it back up (blurring happens when scaling low→high)
    ctx.drawImage(
      tempCanvas,
      0,
      0,
      tempCanvas.width,
      tempCanvas.height,
      box.x,
      box.y,
      box.width,
      box.height
    );
  }
  return canvasElement;
}
