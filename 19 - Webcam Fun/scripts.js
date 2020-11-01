const video = document.querySelector(".player");
const canvas = document.querySelector(".photo");
const ctx = canvas.getContext("2d");
const strip = document.querySelector(".strip");
const snap = document.querySelector(".snap");
const btnCapture = document.querySelector(".capture");

function getVideo() {
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    .then((localMediaStream) => {
      video.srcObject = localMediaStream;
      video.onloadedmetadata = function (e) {
        video.play();
      };
    })
    .catch(() => {});
}

function paintToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;

  canvas.width = width;
  canvas.height = height;

  function Draw() {
    ctx.drawImage(video, 0, 0, width, height);
    const pixels = rgbEffects(ctx.getImageData(0, 0, width, height));
    ctx.putImageData(pixels, 0, 0);
    requestAnimationFrame(Draw);
  }
  requestAnimationFrame(Draw);
}
function playTakePhotoSounds() {
  snap.currentTime = 0;
  snap.play();
}
function takePhoto() {
  playTakePhotoSounds();
  const image = canvas.toDataURL("image/jpeg");

  const link = document.createElement("a");
  link.href = image;
  link.setAttribute("download", "yohan.jpg");
  link.innerHTML = `<img src=${image} alt="yhan"/>`;
  strip.insertBefore(link, strip.firstChild);
}
function rgbEffects(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i - 150] = pixels.data[i];
    pixels.data[i + 500] = pixels.data[i + 1];
    pixels.data[i - 550] = pixels.data[i + 2];
  }
  return pixels;
}
getVideo();
video.addEventListener("canplay", paintToCanvas);
btnCapture.addEventListener("click", takePhoto);
