function changeStyleProp(display, el) {
  el.style.display = display;
}

function changeTextContent(content, el) {
  el.textContent = content;
}

function getTextContent(el) {
  return el.textContent;
}

function toggle(styleChanger, textContentChanger, extraEl, ctaButton) {
  if (getTextContent(ctaButton) === "More") {
    styleChanger("block", extraEl);
    textContentChanger("Less", ctaButton);
  } else {
    styleChanger("none", extraEl);
    textContentChanger("More", ctaButton);
  }
}

function main() {
  const extraEl = document.querySelector("#extra");
  const ctaButton = document.querySelector("span[class=button]");

  function toggleHandle() {
    toggle(changeStyleProp, changeTextContent, extraEl, ctaButton);
  }

  ctaButton.addEventListener("click", toggleHandle);
}

document.addEventListener("DOMContentLoaded", main);
