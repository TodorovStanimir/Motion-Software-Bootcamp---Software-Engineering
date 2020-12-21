function getInfo() {
  const stopIdEl = document.querySelector("#stopId");
  const busesEl = document.querySelector("#buses");
  const stopNameEl = document.querySelector("#stopName");
  if (stopIdEl === null || busesEl === null || stopNameEl === null) {
    throw new Error("Missing HTML element/s");
  }

  const stopId = stopIdEl.value;
  const url = `https://judgetests.firebaseio.com/businfo/${stopId}.json`;
  busesEl.innerText = "";
  fetch(url, { method: "GET" })
    .then((res) => {
      if (!res.ok || res.status >= 500) {
        throw new Error(`${res.status} | ${res.statusText}`);
      }
      return res.json();
    })
    .then((x) => {
      if (x.documentation_url) {
        throw new Error(`${x.message} <-> ${x.documentation_url}`);
      }
      return x;
    })
    .then((stopId) => {
      stopNameEl.textContent = stopId.name;
      Object.entries(stopId.buses).map(([busId, time]) => {
        const liEl = document.createElement("li");
        liEl.innerText = `Bus ${busId} arrives in ${time}`;
        busesEl.appendChild(liEl);
      });
    })
    .catch((err) => (stopNameEl.textContent = "Error"));
}
