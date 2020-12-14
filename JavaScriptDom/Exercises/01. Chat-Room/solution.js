function solve() {
  const inputEl = document.querySelector("#chat_input");
  const chatMessageEl = document.querySelector("#chat_messages");
  const ctaEl = document.querySelector("#send");

  if (inputEl === null || chatMessageEl === null || ctaEl === null) {
    throw new Error("Something happens please reload the page!");
  }

  ctaEl.addEventListener("click", (e) => {
    const message = inputEl.value;
    const newDivEl = document.createElement("div");
    newDivEl.classList.add("message", "my-message");
    newDivEl.innerText = message;
    chatMessageEl.appendChild(newDivEl);
    inputEl.value = "";
  });
}
