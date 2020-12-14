function solve() {
  let rightAnswers = 0;
  let numberCurrentQuestion = 1;

  const checkAnswer = (answer) => {
    return answer === "onclick" ||
      answer === "JSON.stringify()" ||
      answer === "A programming API for HTML and XML documents"
      ? "correct"
      : answer === "onmouseclick" ||
        answer === "JSON.toString()" ||
        answer === "The DOM is your source HTML"
      ? "wrong"
      : "not answer";
  };

  const sectionElements = Array.from(document.querySelectorAll("section"));
  const resultElement = document.querySelector("#results");

  if (resultElement === null || sectionElements.length !== 3) {
    throw new Error("Something happens please reload the page!");
  }

  document.addEventListener("click", (e) => {
    const answer = e.target.innerText;

    if (checkAnswer(answer) === "correct") {
      sectionElements[numberCurrentQuestion - 1].style.display = "none";
      rightAnswers++;
      numberCurrentQuestion++;
    }

    if (checkAnswer(answer) === "wrong") {
      sectionElements[numberCurrentQuestion - 1].style.display = "none";
      numberCurrentQuestion++;
    }

    if (
      (checkAnswer(answer) === "correct" || checkAnswer(answer) === "wrong") &&
      numberCurrentQuestion <= 3
    ) {
      sectionElements[numberCurrentQuestion - 1].style.display = "block";
    }

    if (numberCurrentQuestion > 3) {
      resultElement.style.display = "block";
      const outputEl = resultElement.querySelector("h1");

      if (outputEl === null) {
        throw new Error("Something happens please reload the page!");
      }

      resultElement.querySelector("h1").textContent =
        rightAnswers === 3
          ? "You are recognized as top JavaScript fan!"
          : `You have ${rightAnswers} right answers`;
    }
  });
}
