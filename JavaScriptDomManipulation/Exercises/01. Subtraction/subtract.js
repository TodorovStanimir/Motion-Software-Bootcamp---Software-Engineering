function subtract() {
  const firstNumberEl = document.querySelector("#firstNumber");
  const secondNumberEl = document.querySelector("#secondNumber");
  const resultEl = document.querySelector("#result");

  if (firstNumberEl === null || secondNumberEl === null || resultEl === null) {
    throw new Error("Missing HTML elements.");
  }
  firstNumberEl.disabled = false;
  secondNumberEl.disabled = false;

  function getValueFromHTMLEl(htmlEl) { return htmlEl.value; }

  function calculateValue(firstNumber = 0, secondNumber = 0) { return firstNumber - secondNumber; }

  function addTextContentToHTMLEl(htmlEl, value) { htmlEl.textContent = value;
  }

  function recalculateHandler() {
    addTextContentToHTMLEl(
      resultEl,
      calculateValue(
        Number(getValueFromHTMLEl(firstNumberEl)),
        Number(getValueFromHTMLEl(secondNumberEl))
      )
    );
  }

  recalculateHandler();

  document.addEventListener("change", recalculateHandler);
}
