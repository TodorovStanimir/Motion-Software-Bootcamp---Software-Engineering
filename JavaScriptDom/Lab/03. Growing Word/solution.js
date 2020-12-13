function growingWord() {
  const exerciseEl = document.querySelector("#exercise");
  const holdColorsEl = document.querySelector("#colors");

  if (exerciseEl === null || holdColorsEl === null) {
    throw new Error("Something happened, please reload the page");
  }

  const growEl = exerciseEl.querySelector("p");

  if (growEl === null) {
    throw new Error("Grow element missing. Please reload the page");
  }

  const currentFontSize = growEl.style.fontSize
    ? growEl.style.fontSize.match(/\d+/)[0]
    : 0;
  const currentColor = growEl.style.color;

  const colors = Array.from(holdColorsEl.querySelectorAll("div")).map((el) =>
    window.getComputedStyle(el, null).getPropertyValue("background-color")
  );

  const colorIndex = colors.findIndex((color) => color === currentColor);

  const newColorIndex =
    colorIndex === -1 || colorIndex === colors.length - 1 ? 0 : colorIndex + 1;

  const newSize = currentFontSize === 0 ? "2px" : 2 * currentFontSize + "px";

  growEl.style.color = colors[newColorIndex];
  growEl.style.fontSize = newSize;
}
