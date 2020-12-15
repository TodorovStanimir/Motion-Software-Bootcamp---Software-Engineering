function solve() {
  const actions = {
    button: () => {
      const liElements = olEl.querySelectorAll("li");

      const name = inputEl.value
        .split("")
        .map((el, ind) => (ind === 0 ? el.toUpperCase() : el))
        .join("");

      const firstLetter = name.charCodeAt(0) - 65;

      const currentContent = liElements[firstLetter].innerText;

      liElements[firstLetter].innerText = !currentContent
        ? name
        : currentContent + `, ${name}`;
      inputEl.value = "";
    },
  };

  const inputEl = document.querySelector('input[type="text"]');
  const olEl = document.querySelector('ol[type="A"]');

  if (inputEl === null || olEl === null) {
    throw new Error("Something happens please reload the page!");
  }

  document.getElementsByTagName("button")[0].addEventListener("click", (e) => {
    if (typeof actions[e.target.getAttribute("type")] === "function") {
      actions[e.target.getAttribute("type")]();
    }
  });
}
