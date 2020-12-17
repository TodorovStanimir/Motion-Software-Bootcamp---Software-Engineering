function createElement(type, content) {
  const e = document.createElement(type);

  if (typeof content === "string") {
    e.innerHTML = content;
  }

  if (typeof content === "object") {
    e.appendChild(content);
  }

  return e;
}
function clickHandller(output, elementCreator, input) {
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

function findChildIndexByRef(parent, child) {
  return Array.prototype.findIndex.call(parent.children, (el) => el === child);
}

function removeItem(output, elementLocator, element) {
  return output(elementLocator(element));
}

function removeFromHTMLByIndex(parent, index) {
    return parent.removeChild(parent.children[index]);
}

function listClickHandler(e) {
  if (e.target.nodeName === "A") {
      removeItem(
        removeFromHTMLByIndex.bind(undefined, e.currentTarget),
        findChildIndexByRef.bind(undefined, e.currentTarget),
        e.target.parentNode
      )
  }
}

function main() {
  const cta = document.getElementById("addCTA");
  const list = document.getElementById("items");
  const input = document.getElementById("newText");

  if (cta === null || list === null || input === null) {
    throw new Error("Missing dom elements");
  }

  const boundClickHandler = clickHandller.bind(
    undefined,
    addToHTML.bind(undefined, list),
    (value) => {
      let li = createElement("li");
      let a = createElement("a");
      a.setAttribute("href", "javascript:;");
      a.appendChild(document.createTextNode("[Delete]"));
      li.appendChild(document.createTextNode(`${value} `));
      li.appendChild(a);
      return li;
    },
    input
  );

  cta.addEventListener("click", boundClickHandler);
  list.addEventListener("click", listClickHandler);
}

document.addEventListener("DOMContentLoaded", main);
