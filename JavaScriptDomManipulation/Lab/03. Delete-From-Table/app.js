function deleteRowByEmail(callback, output, rows, searchedText) {
  return output(callback(rows, searchedText));
}

function addInnerText(htmlEl, boolean) {
  htmlEl.innerHTML = boolean ? "Deleted." : "Not found.";
}

function findHTMLElementByInnerText(HTMLCollection, searchedText) {
  return [...HTMLCollection].find((row) => row.innerText.includes(searchedText));
}

function removeHTMLElementItself(htmlElement) {
  if (htmlElement) {
    htmlElement.remove();
    return true;
  }
  return false;
}

function main() {
  const inputEl = document.querySelector("input[name=email]");
  const resultEl = document.querySelector("#result");
  const ctaDelete = document.querySelector("#ctaDelete");
  const rows = document.getElementsByTagName("tr");

  if (inputEl === null || resultEl === null || ctaDelete === null) {
    throw new Error("Missing HTML elements. Please reload the page");
  }

  function deleteRowHandler() {
    if (inputEl.value) {
      addInnerText(
        resultEl,
        deleteRowByEmail(
          findHTMLElementByInnerText,
          removeHTMLElementItself,
          rows,
          inputEl.value
        )
      );
    }
  }

  ctaDelete.addEventListener("click", deleteRowHandler);
}

document.addEventListener("DOMContentLoaded", main);
