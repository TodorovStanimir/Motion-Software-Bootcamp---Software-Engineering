function solve() {
  let totalAmount = 0;
  const bouthProducts = [];
  const actions = {
    "add-product": (e) => {
      const parentEl = e.target.parentNode.parentNode;
      const resultEl = document.querySelector("textarea");
      if (parentEl === null || resultEl === null) {
        throw new Error("Something happens please reload the page!");
      }
      const priceEl = parentEl.querySelector(".product-line-price");
      const nameEl = parentEl.querySelector(".product-title");

      if (priceEl === null || nameEl === null) {
        throw new Error("Something happens please reload the page!");
      }
      const price = +priceEl.innerText.match(/(\d*\.?\d+)/gi)[0];
      const name = nameEl.innerText;
      !bouthProducts.includes(name) ? bouthProducts.push(name) : null;
      totalAmount += price;

      resultEl.value += `Added ${name} for ${price.toFixed(2)} to the cart.\n`;
    },
    checkout: (e) => {
      const resultEl = document.querySelector("textarea");
      if (resultEl === null) {
        throw new Error("Something happens please reload the page!");
      }
      resultEl.value += `You bought ${bouthProducts.join(
        ", "
      )} for ${totalAmount.toFixed(2)}.`;

      Array.from(document.querySelectorAll("button")).map(
        (btn) => (btn.disabled = true)
      );
    },
  };

  document.addEventListener("click", function (e) {
    if (typeof actions[e.target.getAttribute("class")] === "function") {
      actions[e.target.getAttribute("class")](e);
    }
  });
}
