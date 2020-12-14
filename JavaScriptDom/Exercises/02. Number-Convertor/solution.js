function solve() {
  const inputEl = document.querySelector("#input");
  const toSelectEl = document.querySelector("#selectMenuTo");
  const outputEl = document.querySelector("#result");
  const ctaBtn = document.querySelector("button");

  if (
    inputEl === null ||
    toSelectEl === null ||
    outputEl === null ||
    ctaBtn === null
  ) {
    throw new Error("Something happens please reload the page!");
  }

  ["Binary", "Hexadecimal"].map((str) => {
    const optionEl = document.createElement("option");
    optionEl.value = str.toLowerCase();
    optionEl.innerText = str;
    toSelectEl.appendChild(optionEl);
  });

  ctaBtn.addEventListener("click", () => {
    const inputAmount = Number(inputEl.value);

    if (inputAmount && toSelectEl.value) {
      const outputAmount = {
        hexadecimal: (x) => x.toString(16),
        binary: (x) => x.toString(2),
      }[toSelectEl.value](inputAmount);

      outputEl.value = outputAmount;
    }
  });
}
