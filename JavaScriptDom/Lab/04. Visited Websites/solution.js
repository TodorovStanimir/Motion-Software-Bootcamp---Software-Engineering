function solve() {
  const state = {};

  const findKey = (el) => el.querySelector("a").textContent.trim();
  const template = (x) => `visited ${x} times`;

  const elements = Array.from(document.querySelectorAll(".link-1"));

  elements.map((el) => {
    const key = findKey(el);
    const value = el.querySelector("p").textContent.match(/\d+/)[0];
    Object.defineProperty(state, `${key}`, { value: +value, writable: true });
  });

  document.addEventListener("click", (event) => {
    const clickedEl = event.target.parentNode.parentNode;

    if (clickedEl.classList.contains("link-1")) {
      clickedEl.querySelector("p").textContent = template(
        ++state[findKey(clickedEl)]
      );
    }
  });
}
