const inbox = document.querySelector(".inbox");
const checkboxes = [
  ...document.querySelectorAll('.inbox input[type="checkbox"]'),
];

let lastChecked = -1;

function handleCheck(e) {
  const target = e.target;
  if (target.tagName !== "INPUT") return;

  const clickedIndex = checkboxes.findIndex((checkbox) => checkbox === target);

  if (lastChecked > -1 && target.checked && e.shiftKey) {
    const [start, end] =
      clickedIndex > lastChecked
        ? [lastChecked, clickedIndex]
        : [clickedIndex, lastChecked];
    checkboxes
      .slice(start, end + 1)
      .forEach((checkbox) => (checkbox.checked = true));
  }
  lastChecked = clickedIndex;
}

inbox.addEventListener("click", handleCheck);
