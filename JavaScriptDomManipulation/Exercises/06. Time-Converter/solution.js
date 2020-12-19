function attachEventsListeners() {
  const daysEl = document.querySelector("#days");
  const hoursEl = document.querySelector("#hours");
  const minutesEl = document.querySelector("#minutes");
  const secondsEl = document.querySelector("#seconds");

  if (daysEl === null || hoursEl === null || minutesEl === null || secondsEl === null) {
    throw new Error("Missing Input Elements");
  }

  function findValue(el) {
    return (
      (el.previousElementSibling && Number(el.previousElementSibling.value)) ||
      0
    );
  }
  const actions = {
    daysBtn: function (value) {
      return value * 86400;
    },
    hoursBtn: function (value) {
      return value * 3600;
    },
    minutesBtn: function (value) {
      return value * 60;
    },
    secondsBtn: function (value) {
      return value;
    },
    converter: function (value) {
      return [value / 86400, value / 3600, value / 60, value];
    },
  };

  function convertHandler(e) {
    if (typeof actions[e.target.id] === "function") {
        [
          daysEl.value,
          hoursEl.value,
          minutesEl.value,
          secondsEl.value,
        ] = actions.converter(actions[e.target.id](findValue(e.target)));
    }
  }

  document.addEventListener("click", convertHandler);
}
