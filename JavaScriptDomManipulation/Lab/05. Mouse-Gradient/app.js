function attachGradientEvents() {
  const resultEl = document.getElementById("result");
  const gradientEl = document.getElementById("gradient");

  if (resultEl === null || gradientEl === null) {
    throw new Error("Missing HTML elements.");
  }

  function calculatePower(e) {
    return Math.floor((e.offsetX / (e.target.clientWidth - 1)) * 100) + "%";
  }

  function addTextContent(htmlEl, content) {
    htmlEl.textContent = content;
  }

  function gradientMouseMoveHandler(e) {
    addTextContent(resultEl, calculatePower(e));
  }

  function gradientMouseOutHandler(e) {
    addTextContent(resultEl, "");
  }

  gradientEl.addEventListener("mousemove", gradientMouseMoveHandler);

  gradientEl.addEventListener("mouseout", gradientMouseOutHandler);
}
