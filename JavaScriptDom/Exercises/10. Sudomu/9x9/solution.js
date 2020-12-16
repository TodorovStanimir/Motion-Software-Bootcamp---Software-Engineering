function solve() {
  const tableEl = document.querySelector("#exercise table");
  const checkEl = document.querySelector('#check');
  const actions = {
    "Quick Check": function (e) {
      const inputElements = [...tableEl.querySelectorAll("tbody td input")]
        .map((el) => +el.value);
      const lengthRowAndColumn = Math.sqrt(inputElements.length);
      let isSolved = true;
      let sudokuNumber = 0;
      let leftDiag = 0;
      let rightDiag = 0;

      for (let i = 1; i <= lengthRowAndColumn; i++) { sudokuNumber += i; }
      
      for (let row = 0; row < lengthRowAndColumn; row++) {
        let rowAmount = 0;
        let columnAmount = 0;
        for (let column = 0; column < lengthRowAndColumn; column++) {
          rowAmount += inputElements[lengthRowAndColumn * row + column];
          columnAmount += inputElements[lengthRowAndColumn * column + row];
        }
        if (isSolved && (rowAmount !== sudokuNumber || columnAmount !== sudokuNumber))
        isSolved = false;
        
        leftDiag += inputElements[lengthRowAndColumn * row + lengthRowAndColumn - 1 - row];
        rightDiag += inputElements[row * lengthRowAndColumn + row ];
      }

      if ( isSolved &&(
          (leftDiag === sudokuNumber && 
            rightDiag !== lengthRowAndColumn && rightDiag !== Math.pow(lengthRowAndColumn, 2)) 
          || (rightDiag === sudokuNumber && 
            leftDiag !== lengthRowAndColumn && leftDiag !== Math.pow(lengthRowAndColumn, 2)))) {
            isSolved = false;
      }

      if (isSolved) {
        this.changeStyle(tableEl, "border", "2px solid green");
        this.changeStyle(checkEl, "color", "green");
        this.changeContent(checkEl, "textContent", "You solve it! Congratulations!");
      } else {
        this.changeStyle(tableEl, "border", "2px solid red");
        this.changeStyle(checkEl, "color", "red");
        this.changeContent(checkEl, "textContent", "NOP! You are not done yet…");
      };
    },
    Clear: function (e) {
        const inputElements = [...tableEl.querySelectorAll("tbody td input")].map((el) => el.value="");
        this.changeStyle(tableEl,"border", "none");
        checkEl.textContent = ("");
    },
    changeStyle: (el, styleProp, value) => { el.style[`${styleProp}`] = value; },
    changeContent: (el, contentProp, value) => { el[`${contentProp}`] = value; },
  };

  document.addEventListener("click", function (e) {
    if (typeof actions[e.target.textContent] === "function") {
      actions[e.target.textContent](e);
    }
  });
}