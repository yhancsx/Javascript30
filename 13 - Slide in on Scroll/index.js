function debounce(func, wait = 20, immediate = true) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

const sliderImages = document.querySelectorAll(".slide-in");

const options = {
  root: null,
  rootMargin: "0px",
  threshold: 0,
};
const callback = (entries) => {
  const entry = entries[0];
  if (entry.isIntersecting) entry.target.classList.add("active");
  else entry.target.classList.remove("active");
};
sliderImages.forEach((image) => {
  const observer = new IntersectionObserver(callback, options);
  observer.observe(image);
});
