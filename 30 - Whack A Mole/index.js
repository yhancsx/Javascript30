const holes = document.querySelectorAll(".hole");
const scoreBoard = document.querySelector(".score");
const moles = document.querySelectorAll(".mole");

const gamePeriod = 5000;
let lastHole;
let timeUp = false;
let score = 0;

function startGame() {
  const start = Date.now();
  const int = setInterval(() => {
    lastHole?.classList.remove("up");
    lastHole = getRandomHole();
    lastHole.classList.add("up");
    if (Date.now() - start > gamePeriod) clearInterval(int);
  }, 500);
}

function getRandomHole() {
  const rand = getRandNumber();
  const hole = holes[rand];
  if (hole === lastHole) return getRandomHole();

  lastHole = hole;
  return hole;
}

function getRandNumber() {
  return Math.floor((Math.random() * 100) % 6);
}

function clickMole() {
  score += 1;
  scoreBoard.textContent = score;
}

moles.forEach((mole) => mole.addEventListener("click", clickMole));
