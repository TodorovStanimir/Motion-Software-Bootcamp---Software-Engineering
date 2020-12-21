function solve() {
  const infoEl = document.querySelector("#info");
  const depCTA = document.querySelector("#depart");
  const arrCTA = document.querySelector("#arrive");

  if (infoEl === null || depCTA === null || arrCTA === null) {
    throw new Error("Missing html element/s");
  }

  let state = {
    name: "",
    next: "depot",
  };

  function toggleDisabled(el) {
    Array.isArray(el)
      ? el.map((el) => (el.disabled = !el.disabled))
      : (el.disabled = !el.disabled);
  }

  function setTextContent(el, content) {
    el.textContent = content;
  }

  function handleError(res) {
    if (!res.ok) {
      throw new Error("Error");
    }
    return res.json();
  }

  function depart() {
    const url = `https://judgetests.firebaseio.com/schedule/${state.next}.json`;

    fetch(url)
      .then(handleError)
      .then((data) => {
        state = { ...state, ...data };
        setTextContent(infoEl, `Next stop ${state.name}`);
        toggleDisabled([depCTA, arrCTA]);
      })
      .catch((err) => (infoEl.textContent = err.message));
  }

  function arrive() {
    setTextContent(infoEl, `Arriving at ${state.name}`);
    toggleDisabled([depCTA, arrCTA]);
  }

  return {
    depart,
    arrive,
  };
}

let result = solve();
