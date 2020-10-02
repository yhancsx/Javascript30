const hourHand = document.querySelector(".hour-hand");
const minsHand = document.querySelector(".min-hand");
const secondHand = document.querySelector(".second-hand");

function setDate() {
  const current = new Date();
  const hour = current.getHours();
  const minute = current.getMinutes();
  const second = current.getSeconds();

  const hourAngle = 90 + ((hour % 12) / 12) * 360;
  const minuteAngle = 90 + (minute / 60) * 360;
  const secondAngle = 90 + (second / 60) * 360;

  if (secondAngle === 90) {
    document.querySelector(".hand").style.transition = null;
  } else {
    document.querySelector(".hand").style.transition = "all 0.05s";
  }
  hourHand.style.transform = `rotate(${hourAngle}deg)`;
  minsHand.style.transform = `rotate(${minuteAngle}deg)`;
  secondHand.style.transform = `rotate(${secondAngle}deg)`;
}

setInterval(setDate, 1000);

setDate();
