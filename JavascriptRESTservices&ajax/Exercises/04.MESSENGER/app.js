function attachEvents() {
  const url = "https://rest-messanger.firebaseio.com/messanger";
  const [authorEl, contentEl] = document.querySelectorAll("input");
  const messages = document.querySelector("#messages");

  if (authorEl === null || contentEl === null || messages === null) {
    throw new Error("Missing html elements.");
  }

  function handleError(res) {
    if (!res.ok) {
      throw new Error("Error");
    }
    return res.json();
  }

  const actions = {
    Send: function () {
      const [author, content] = [authorEl.value, contentEl.value];

      if (!author || !content) {
        return;
      }

      fetch(`${url}.json`, {
        method: "POST",
        body: JSON.stringify({ author, content }),
      })
        .then(handleError)
        .then(() => {
          messages.value += `\n${author}: ${content}`;
          messages.scrollTop = messages.scrollHeight;
          authorEl.value = "";
          contentEl.value = "";
        })
        .catch((err) => console.log(err));
    },
    Refresh: function () {
      fetch(`${url}.json`)
        .then(handleError)
        .then((mes) => {
          Object.values(mes).map(({ author, content }) => {
            messages.value += `${author}: ${content}\n`;
          });
          messages.value = messages.value.trim()
          messages.scrollTop = messages.scrollHeight;
        })
        .catch((err) => console.log(err));
    },
  };

  document.addEventListener("click", function (e) {
    if (typeof actions[e.target.value] === "function") {
      actions[e.target.value]();
    }
  });
}

attachEvents();
