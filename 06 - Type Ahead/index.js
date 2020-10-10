const URL =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

async function main() {
  try {
    const response = await fetch(URL);
    const places = await response.json();

    const suggestions = document.querySelector(".suggestions");
    const defaultSuggestions = suggestions.innerHTML;

    function displayMatches(e) {
      e.preventDefault();
      e.stopPropagation();

      const keyword = e.target.value;
      if (keyword === "") {
        suggestions.innerHTML = defaultSuggestions;
        return;
      }

      const matchPlaces = findMatches(places, keyword);

      suggestions.innerHTML = matchPlaces
        .map(
          ({ city, state, population }) =>
            `<li>
        <span>
          ${city.replace(
            convertStringtoRegex(keyword),
            convertHilightedSpan(keyword)
          )}, 
          ${state.replace(
            convertStringtoRegex(keyword),
            convertHilightedSpan(keyword)
          )}
        </span>
        <span class="population">${(+population).toLocaleString()}</span>
      </li>`
        )
        .join("");
    }

    const searchInput = document.querySelector(".search");

    searchInput.addEventListener("change", displayMatches);
    searchInput.addEventListener("keyup", displayMatches);
  } catch {}
}
const convertHilightedSpan = (keyword) => {
  return `<span class="hl">${keyword}</span>`;
};
const findMatches = (places, keyword) =>
  places.filter(
    ({ city, state }) =>
      city.match(convertStringtoRegex(keyword)) ||
      state.match(convertStringtoRegex(keyword))
  );
const convertStringtoRegex = (keyword) => new RegExp(keyword, "gi");
const searchForm = document.querySelector(".search-form");

searchForm.addEventListener("submit", (e) => e.preventDefault());

main();
