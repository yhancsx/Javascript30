let countdown;
const timerDisplay = document.querySelector(".display__time-left");
const endTime = document.querySelector(".display__end-time");
const buttons = document.querySelectorAll("[data-time]");
const form = document.querySelector("form#custom");

let interval;

function timer(seconds) {
  clearInterval(interval);

  const now = Date.now();
  const then = now + seconds * 1000;

  displayEndTime(then);

  let remain = seconds;
  displayRemainTime(remain);

  interval = setInterval(() => {
    remain = Math.round((then - Date.now()) / 1000);
    displayRemainTime(remain);
    if (remain <= 0) clearInterval(interval);
  }, 1000);
}

function paddingNumber(number) {
  if (number < 10) return `0${number}`;
  return number;
}

function displayRemainTime(seconds) {
  const str = formatRemainTime(seconds);
  document.title = str;
  timerDisplay.textContent = str;
}

function formatRemainTime(seconds) {
  const hour = Math.floor(seconds / (60 * 60));
  const minute = Math.floor((seconds % (60 * 60)) / 60);
  const second = seconds % 60;
  const str = [hour, minute, second].map((v) => paddingNumber(v)).join(":");
  return str;
}

function displayEndTime(seconds) {
  const end = new Date(seconds);

  const endHour = end.getHours();
  const endMinute = end.getMinutes();
  const endString = `Be Back At ${paddingNumber(endHour)}:${paddingNumber(endMinute)}`;
  endTime.textContent = endString;
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const seconds = e.target.minutes.value;
  this.reset();
  if (isNaN(seconds)) return;
  timer(seconds);
});

buttons.forEach((button) => {
  const seconds = button.dataset.time;
  button.addEventListener("click", () => timer(+seconds));
});
