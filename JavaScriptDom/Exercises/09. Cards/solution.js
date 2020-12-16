function solve() {
  const resultEl = document.querySelector("#result");
  const [pl1El, __, pl2El] = resultEl && resultEl.querySelectorAll("span");

  const actions = {
    currentCardPl1: null,
    currentCardPl2: null,
    historyEl: document.querySelector("#history"),
    player1Div: function (e) {
      this.currentCardPl1 = e.target;
      this.currentCardPl1.setAttribute("src", "./images/whiteCard.jpg");
      pl1El.textContent = e.target.getAttribute("name");
      if (this.currentCardPl1 !== null && this.currentCardPl2 !== null)
        this.compareCards();
    },
    player2Div: function (e) {
      this.currentCardPl2 = e.target;
      this.currentCardPl2.setAttribute("src", "./images/whiteCard.jpg");
      pl2El.textContent = e.target.getAttribute("name");
      if (this.currentCardPl1 !== null && this.currentCardPl2 !== null)
        this.compareCards();
    },
    winner: function (card) {
      card.style.border = "1px solid green";
    },
    looser: function (card) {
      card.style.border = "1px solid red";
    },
    normalizer: function () {
      this.currentCardPl1 = null;
      this.currentCardPl2 = null;
      this.historyEl.innerHTML += `[${resultEl.innerText}] `;
      pl1El.textContent = "";
      pl2El.textContent = "";
    },
    compareCards: function () {
      if (+pl1El.textContent > +pl2El.textContent) {
        this.winner(this.currentCardPl1);
        this.looser(this.currentCardPl2);
      } else {
        this.winner(this.currentCardPl2);
        this.looser(this.currentCardPl1);
      }
      this.normalizer();
    },
  };

  document.addEventListener("click", function (e) {
    if (typeof actions[e.target.parentNode.id] === "function") {
      actions[e.target.parentNode.id](e);
    }
  });
}
