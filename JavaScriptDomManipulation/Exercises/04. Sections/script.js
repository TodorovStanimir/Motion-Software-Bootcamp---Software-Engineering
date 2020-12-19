function createHTMLEl(type, content) {
  let e = document.createElement(type);

  if (typeof content === "string") {
    e.innerHTML = content;
  }

  if (typeof content === "object") {
    e.appendChild(content);
  }

  return e;
}
function changeStyleOfHTMLEl(htmlEl, property, value) {
  return (htmlEl.style[`${property}`] = value);
}
function addToHTML(parent, child) {
  parent.appendChild(child);
}
function addEventListener(htmlEl, event, func) {
  htmlEl.addEventListener(event, func);
}
function displayShowHandler(e) {
  e.target.children[0].style.display = "block";
}

function create() {
  const contentEl = document.querySelector("#content");

  if (contentEl === null) {
    throw new Error("Missing content element");
  }
  
  ["Section 1", "Section 2", "Section 3", "Section 4"].map((word) => {
    const newDiv = createHTMLEl("div");
    const newPEl = createHTMLEl("p", word);
    changeStyleOfHTMLEl(newPEl, "display", "none");
    addEventListener(newDiv, "click", displayShowHandler);
    addToHTML(newDiv, newPEl);
    addToHTML(contentEl, newDiv);
  });
}

document.addEventListener("DOMContentLoaded", create);
