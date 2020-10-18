const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");

function togglePlay() {
  const method = video.paused ? "play" : "pause";
  video[method]();
}
function toggleButton() {
  toggle.textContent = this.paused ? "►" : "❚ ❚";
}
function handleSkip() {
  video.currentTime += parseInt(this.dataset.skip);
}
function handleProgress() {
  progressBar.style.flexBasis = `${(this.currentTime / this.duration) * 100}%`;
}
function handleProgressSliderMove(e) {
  const newTime = video.duration * (e.offsetX / progress.offsetWidth);
  video.currentTime = newTime;
}
function handleVideoFunctionBar() {
  video[this.name] = this.value;
}
function handleVideoDoubleClick(e) {
  if (e.offsetX / this.offsetWidth > 0.5) {
    this.currentTime += 10;
  } else {
    this.currentTime -= 10;
  }
}

video.addEventListener("click", togglePlay);
video.addEventListener("play", toggleButton);
video.addEventListener("pause", toggleButton);
video.addEventListener("timeupdate", handleProgress);
video.addEventListener("dblclick", handleVideoDoubleClick);

toggle.addEventListener("click", togglePlay);
skipButtons.forEach((button) => button.addEventListener("click", handleSkip));
ranges.forEach((range) =>
  range.addEventListener("click", handleVideoFunctionBar)
);
ranges.forEach((range) =>
  range.addEventListener("mousemove", handleVideoFunctionBar)
);

let progressClicked = false;
progress.addEventListener("click", handleProgressSliderMove);
progress.addEventListener(
  "mousemove",
  (e) => progressClicked && handleProgressSliderMove(e)
);
progress.addEventListener("mousedown", () => (progressClicked = true));
progress.addEventListener("mouseup", () => (progressClicked = false));
document.addEventListener("keydown", (e) => e.code == "Space" && togglePlay());
