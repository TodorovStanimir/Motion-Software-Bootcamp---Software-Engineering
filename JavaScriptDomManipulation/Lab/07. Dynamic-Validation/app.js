function validate() {
  const inputEl = document.querySelector("#email");

  if (inputEl === null) {
    throw new Error("Missing input element");
  }

  function addClass(el, newClass) {
    el.classList.add(newClass);
  }
  function removeClass(el, redundantClass) {
    el.classList.remove(redundantClass);
  }
  function checkEmail(string) {
    const emailPattern = /(.+)@(.+){2,}\.(.+){2,}/i;
    return emailPattern.test(string);
  }
  function validateEmail(string, checkEmail, removeClass, addClass) {
    checkEmail(string)
      ? removeClass(inputEl, "error")
      : addClass(inputEl, "error");
  }

  function validateEmailHandler(e) {
    validateEmail(e.target.value, checkEmail, removeClass, addClass);
  }

  inputEl.addEventListener("change", validateEmailHandler);
}
