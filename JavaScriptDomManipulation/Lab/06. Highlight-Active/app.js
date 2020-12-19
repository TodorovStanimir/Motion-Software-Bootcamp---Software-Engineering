function focus() {
  const inputEl = document.querySelectorAll("input[type=text]");

  function addClass(htmlEl, newClass) {
    htmlEl.classList.add(newClass);
  }

  function removeClass(htmlEl, redundantClass) {
    htmlEl.classList.remove(redundantClass);
  }

  function getParentEl(htmlEl) {
    return htmlEl.parentNode;
  }

  function executeOnInputEl(nodeName, f) {
    if (nodeName === "INPUT") f();
  }

  function focusHandler(e) {
    executeOnInputEl(e.target, addClass(getParentEl(e.target), "focused"));
  }

  function blurHandler(e) {
    executeOnInputEl(e.target, removeClass(getParentEl(e.target), "focused"));
  }
  
  document.addEventListener("focus", focusHandler, true);
  document.addEventListener("blur", blurHandler, true);
}
