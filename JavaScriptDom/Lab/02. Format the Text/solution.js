function solve() {
  const inputEl = document.getElementById("input");
  const outputEl = document.getElementById("output");

  if (inputEl === null || outputEl === null) {
    throw new Error("Something happened, please reload the page");
  }

  const inputText = inputEl.innerText;

  inputText
    .split(".")
    .filter((sentence) => sentence)
    .reduce(
      (acum, sentence) => {
        acum[acum.length - 1].length !== 3
          ? acum[acum.length - 1].push(sentence + ".")
          : acum.push([sentence + "."]);

        return acum;
      },
      [[]]
    )
    .map((arr) => {
      const newPEl = document.createElement("p");
      newPEl.innerText = arr.join("");
      outputEl.appendChild(newPEl);
    });
}
