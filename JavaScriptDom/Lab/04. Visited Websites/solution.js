function solve() {
  const state = {
    SoftUni: 1,
    Google: 2,
    YouTube: 4,
    Wikipedia: 4,
    Gmail: 7,
    stackoverflow: 6
  };

  const findKey = (el) => el.querySelector("a").textContent.trim();
  const template = (x) => `visited ${x} times`;

  document.addEventListener("click", (event) => {
    const clickedEl = event.target.parentNode.parentNode;

    if (clickedEl && clickedEl.classList.contains("link-1")) {
      clickedEl.querySelector("p").textContent = template(
        ++state[findKey(clickedEl)]
      );
    }
  });
}
