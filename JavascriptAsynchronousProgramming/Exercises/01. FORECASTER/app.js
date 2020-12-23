function attachEvents() {
  const baseUrl = "https://judgetests.firebaseio.com";

  function handleError(res) {
    if (!res.ok)
      throw new Error(
        JSON.stringify({
          commit: {
            author: { name: "Error" },
            message: `${res.status} (${res.statusText})`,
          },
        })
      );
    return res;
  }

  function deserializeData(res) {
    return res.json();
  }

  async function fetchData(hError = handleError, dData = deserializeData, url) {
    return fetch(url).then(hError).then(dData);
  }

  const mkUrl = (x) => `${baseUrl}/${x}`;

  const getLocations = async () => {
    return await fetchData(undefined, undefined, mkUrl("locations.json"));
  };

  const getWeather = async (time, location) => {
    return await fetchData(
      undefined,
      undefined,
      mkUrl(`forecast/${time}/${location}.json`)
    );
  };

  symbolsMapper = {
    Sunny: "&#x2600;",
    "Partly sunny": "&#x26C5;",
    Overcast: "&#x2601;",
    Rain: "&#x2614;",
    Degrees: "&#176;",
  };

  actions = {
    submit: async function () {
      const locationEl = document.getElementById("location");
      const forecatsEl = document.getElementById("forecast");
      const currentEl = document.getElementById("current");
      const upcomingEl = document.getElementById("upcoming");
      if (locationEl === null || forecatsEl === null || currentEl===null || upcomingEl === null) {
        throw new Error("Missing html element/s");
      }

      try {
        const locations = await getLocations();

        forecatsEl.style.display = "block";

        const { code: locationCode } = locations.find(
          (loc) => loc.name.toLowerCase() === locationEl.value.toLowerCase()
        ) || { code: null };

        if (!locationCode) {
          throw new Error()  
        }

        const [currentWeather, upcomingWeather] = await Promise.all([
          getWeather("today", locationCode),
          getWeather("upcoming", locationCode),
        ]);

        function createElements(arr) {
          const result = arr.map(([type, classes, innerHtml]) => {
            const newEl = document.createElement(type);
            newEl.setAttribute("class", classes);
            if (Array.isArray(innerHtml)) {
              innerHtml.map((elem) => {
                newEl.appendChild(elem);
              });
            } else {
              newEl.innerHTML = innerHtml;
            }
            return newEl;
          });
          return result;
        }

        const currentWeaterConditions = createElements([
          [
            "div",
            "forecasts",
            createElements([
              [
                "span",
                ["condition", "symbol"].join(" "),
                symbolsMapper[currentWeather.forecast.condition],
              ],
              [
                "span",
                "condition",
                createElements([
                  ["span", "forecast-data", currentWeather.name],
                  [
                    "span",
                    "forecast-data",
                    `${currentWeather.forecast.low}${symbolsMapper.Degrees}/${currentWeather.forecast.high}${symbolsMapper.Degrees}`,
                  ],
                  ["span", "forecast-data", currentWeather.forecast.condition],
                ]),
              ],
            ]),
          ],
        ])[0];

        const futureWeaterConditions = createElements([
          [
            "div",
            "forecasts-info",
            createElements(
              upcomingWeather.forecast.map((el) => {
                return [
                  "span",
                  "upcoming",
                  createElements([
                    ["span", "symbol", symbolsMapper[el.condition]],
                    [
                      "span",
                      "forecast-data",
                      `${el.low}${symbolsMapper.Degrees}/${el.high}${symbolsMapper.Degrees}`,
                    ],
                    ["span", "forecast-data", el.condition],
                  ]),
                ];
              })
            ),
          ],
        ])[0];

        currentEl.innerHTML = `<div class="label">Current conditions</div>`;
        upcomingEl.innerHTML = `<div class="label">Three-day forecast</div>`;
        currentEl.appendChild(currentWeaterConditions);
        upcomingEl.appendChild(futureWeaterConditions);
      } catch (err) {
        currentEl.innerHTML = `<div class="label">Current conditions</div>Error`;
        upcomingEl.innerHTML = `<div class="label">Three-day forecast</div>`;
      }
    },
  };

  function clickHandler(e) {
    if (typeof actions[e.target.id] === "function") {
      actions[e.target.id]();
    }
  }

  document.addEventListener("click", clickHandler);
}

attachEvents();
