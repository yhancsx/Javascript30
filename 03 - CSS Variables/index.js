function handleUpdate(e) {
  const target = e.target;
  if (target.tagName !== "INPUT") return;
  const suffix = target.dataset.sizing || "";
  document.documentElement.style.setProperty(
    `--${target.name}`,
    target.value + suffix
  );
}
const inputContainer = document.querySelector(".controls");
inputContainer.addEventListener("change", handleUpdate);
inputContainer.addEventListener("mousemove", handleUpdate);
