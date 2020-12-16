function createElement(type, content) {
  let e = document.createElement(type);

  if (typeof content === "string") {
    e.innerHTML = content;
  }

  if (typeof content === "object") {
    e.appendChild(content);
  }

  return e;
}
function clickHandler(output, elementCreator, input) {
  addItem(output, elementCreator, input.value);
}

function addToHTML(parent, child) {
  parent.appendChild(child);
}

function addItem(output, elementCreator, value) {
  if (value !== "") {
    output(elementCreator(value));
  }
}

function main() {
  const cta = document.getElementById("addCTA");
  const list = document.getElementById("items");
  const input = document.getElementById("newItemText");

  if (cta === null || list === null || input === null) {
    throw new Error("Missing dom elements");
  }

  const boundClickHandler = clickHandler.bind(
    undefined,
    addToHTML.bind(undefined, list),
    createElement.bind(undefined, "li"),
    input
  );

  cta.addEventListener("click", boundClickHandler);
}

document.addEventListener("DOMContentLoaded", main);
