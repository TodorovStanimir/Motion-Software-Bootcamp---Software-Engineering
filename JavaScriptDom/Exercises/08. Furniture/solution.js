function solve() {
  const [inputEl, outputEl] = document.querySelectorAll("textarea");
  const tableEl = document.querySelector(".table tbody");

  const actions = {
    Generate: () => {
      const checkEl = document.querySelector("input[type=checkbox]");
      if (inputEl === null || checkEl === null || tableEl === null) {
        throw new Error("Something happens please reload the page!");
      }

      checkEl.disabled = false;

      const newFurniture = (inputEl.value && JSON.parse(inputEl.value)) || [];

      newFurniture.map((el) => {
        const newRowEl = document.createElement("tr");
        newRowEl.innerHTML = `<td><img src="${el.img}"></td>
          <td><p>${el.name}</p></td>
          <td><p>${el.price}</p></td>
          <td><p>${el.decFactor}</p></td>
          <td><input type="checkbox" /></td>`;
        tableEl.appendChild(newRowEl);
      });
    },
    Buy: () => {
      const boughtFurniture = [];
      const averageFactor = [];
      let totalPrice = 0;

      if (tableEl === null || outputEl === null) {
        throw new Error("Something happens please reload the page!");
      }
      const rowElements = tableEl.querySelectorAll("tr");
      for (let row of rowElements) {
        const [nameEl, priceEl, factorEl] = row.querySelectorAll("td > p");

        const checkEl = row.querySelector("input[type=checkbox]");

        if (
          nameEl !== null &&
          priceEl !== null &&
          factorEl !== null &&
          checkEl &&
          checkEl.checked
        ) {
          boughtFurniture.push(nameEl.textContent);
          averageFactor.push(Number(factorEl.textContent));
          totalPrice += Number(priceEl.textContent);
        }
      }

      outputEl.textContent = `Bought furniture: ${boughtFurniture.join(
        ", "
      )}\nTotal price: ${totalPrice.toFixed(
        2
      )}\nAverage decoration factor: ${(
        averageFactor.reduce((acc, el) => {
          return (acc += el);
        }, 0) / averageFactor.length
      ) || 0}`;
    },
  };

  document.addEventListener("click", function (e) {
    if (typeof actions[e.target.textContent] === "function") {
      actions[e.target.textContent]();
    }
  });
}
