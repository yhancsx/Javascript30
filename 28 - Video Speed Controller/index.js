const speed = document.querySelector(".speed");
const bar = speed.querySelector(".speed-bar");
const video = document.querySelector(".flex");

function handleMove(e) {
  const y = e.pageY - this.offsetTop;
  const ratio = y / this.offsetHeight;

  const min = 0.4;
  const max = 4;
  const height = Math.round(ratio * 100);
  const playbackRate = ratio * (max - min) + min;

  bar.style.height = `${height}%`;
  bar.textContent = playbackRate.toFixed(2) + "x";
  video.playbackRate = playbackRate;
}

speed.addEventListener("mousemove", handleMove);
