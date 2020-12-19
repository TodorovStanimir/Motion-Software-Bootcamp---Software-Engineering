function createElement(type, content, value) {
  let e = document.createElement(type);
  e.value = value;

  if (typeof content === "string") {
    e.innerHTML = content;
  }

  if (typeof content === "object") {
    e.appendChild(content);
  }

  return e;
}

function getValue(el) { return el.value; }

function clearValue(el) {return el.value = ""; }

function addToHTML(parent, child) { parent.appendChild(child); }

function addItem(output, elementCreator, content, value) {
  if (content !== "" && value !== "") {
    output(elementCreator(content, value));
  }
}

function main() {
  const newItemTextEl = document.querySelector("#newItemText");
  const newItemValueEl = document.querySelector("#newItemValue");
  const menuEl = document.querySelector("#menu");
  const ctaAdd = document.querySelector("input[value=Add]");

  if (newItemTextEl === null, newItemValueEl === null, menuEl === null, ctaAdd === null) {
    throw new Error("Missing html elements.");
  }

  function addItemHandler() {
    addItem(
      addToHTML.bind(undefined, menuEl),
      createElement.bind(undefined, "option"),
      getValue(newItemTextEl),
      getValue(newItemValueEl)
    );
    clearValue(newItemTextEl);
    clearValue(newItemValueEl);
  }

  const boundAddItemHandler = addItemHandler.bind(undefined);

  ctaAdd.addEventListener("click", boundAddItemHandler);
}

document.addEventListener("DOMContentLoaded", main);
