function encodeAndDecodeMessages() {
  const [senderTextEl, receiverTextEl] = document.getElementsByTagName(
    "textarea"
  );

  actions = {
    "Decode and read it": function () {
      receiverTextEl.value = receiverTextEl.value
        .split("")
        .map((el) => String.fromCharCode(el.charCodeAt() - 1))
        .join("");
    },
    "Encode and send it": function () {
      receiverTextEl.value = senderTextEl.value
        .split("")
        .map((el) => String.fromCharCode(el.charCodeAt() + 1))
        .join("");
      senderTextEl.value = "";
    },
  };

  document.addEventListener("click", function (e) {
    if (typeof actions[e.target.textContent] === "function") {
      actions[e.target.textContent]();
    }
  });
}
