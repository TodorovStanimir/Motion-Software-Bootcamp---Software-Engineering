function deleteByEmail() {
  const inputEl = document.querySelector("input[name=email]");
  const resultEl = document.querySelector("#result");

  if (inputEl === null || resultEl === null) {
    throw new Error("Missing HTML elements. Please reload the page");
  }

  const roows = document.querySelectorAll("tr");
  const searchedText = inputEl.value;
  let notDeletedRow = true;

  if (searchedText) {
    [...roows].map((row) => {
      if (row.innerText.match(searchedText)) {
        row.remove();
        notDeletedRow = false;
      }
    });
  }

  resultEl.innerHTML = notDeletedRow ? "Not found." : "Deleted.";
}
