function solve() {
  const expressionEl = document.querySelector("#expressionOutput");
  const outputEl = document.querySelector("#resultOutput");
  const numberRegex = /(\d*\.?\d+)/gi;
  const arithmeticOperators = /\+|-|x|\//gi;

  const mapper = {
    "-": (x, y) => x - y,
    "+": (x, y) => x + y,
    "/": (x, y) => x / y,
    x: (x, y) => x * y,
  };

  const specialKeys = {
    C: () => {
      expressionEl.textContent = "";
      outputEl.textContent = "";
    },
    "=": () => {
      const numbers = expressionEl.textContent.match(numberRegex).map(Number);
      const operators = expressionEl.textContent.match(arithmeticOperators);

      if (numbers.length === 1 || numbers.length <= operators.length) {
        return (outputEl.textContent = "NaN");
      }

      outputEl.textContent = numbers.reduce((acc, el, ind) => {
        return ind === 0 ? el : mapper[operators[ind - 1]](acc, el);
      }, 0);
    },
  };

  document.addEventListener("click", (e) => {
    if (e.target.nodeName !== "BUTTON") {
      return;
    }

    const keyValue = e.target.textContent;

    typeof specialKeys[keyValue] === "function"
      ? specialKeys[keyValue]()
      : (expressionEl.textContent +=
          +keyValue >= 0 || keyValue === "." ? `${keyValue}` : ` ${keyValue} `);
  });
}
