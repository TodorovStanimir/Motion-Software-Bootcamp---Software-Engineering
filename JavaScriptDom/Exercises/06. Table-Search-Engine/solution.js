function solve() {
  const tdElements = document.querySelectorAll("tbody > tr");

  const actions = {
    searchBtn: () => {
      const inputEl = document.querySelector("#searchField");

      if (inputEl === null) {
        throw new Error("Something happens please reload the page!");
      }
      
      const searchedText = inputEl.value;
      inputEl.value = "";

      for (let i = 0; i < tdElements.length; i++) {
        searchedText && tdElements[i].innerText.includes(searchedText)
          ? tdElements[i].classList.add("select")
          : tdElements[i].classList.remove("select");
      }
    },
  };

  document.addEventListener("click", (e) => {
    if (typeof actions[e.target.id] === "function") {
      actions[e.target.id]();
    }
  });
}
