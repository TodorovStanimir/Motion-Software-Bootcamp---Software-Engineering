function lockedProfile() {
  function showAndHideProfile(message, displayProp, el) {
    if (!checkIsLocked(el)) {
      changeTextContent(
        message,
        el,
        toggleStyleDisplay(displayProp, findPreviouseSibling(el))
      );
    }
  }
  function findPreviouseSibling(el) { return el.previousElementSibling; }

  function toggleStyleDisplay(string, el) { el.style.display = string; }

  function changeTextContent(content, el) { el.textContent = content; }

  function findParrentEl(el) { return el.parentElement; }

  function checkIsLocked(el) { return findParrentEl(el).querySelector("input[value=lock]").checked; }

  const actions = {
    "Show more": function (el) {
      showAndHideProfile("Hide it", "block", el);
    },
    "Hide it": function (el) {
      showAndHideProfile("Show more", "none", el);
    },
  };

  document.addEventListener("click", function (e) {
    if (typeof actions[e.target.textContent] === "function") {
      actions[e.target.textContent](e.target);
    }
  });
}
