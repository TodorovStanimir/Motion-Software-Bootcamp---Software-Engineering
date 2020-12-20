function loadRepos() {
  const inputEl = document.querySelector("#username");
  const reposEl = document.querySelector("#repos");

  if (inputEl === null || reposEl === null) {
    throw new Error("Missing html elements");
  }

  const user = inputEl.value;

  fetch(`https://api.github.com/users/${user}/repos`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      reposEl.innerHTML = "";
      renderRepos(data);
    })
    .catch((err) => console.log(err));

  function addToHTML(parent, child) {
    parent.appendChild(child);
    return parent;
  }

  function addAttribute(attribute, value, el) {
    el.setAttribute(attribute, value);
    return el;
  }

  function createElement(type, content) {
    let e = document.createElement(type);

    if (typeof content === "string") {
      e.innerHTML = content;
    }

    if (typeof content === "object") {
      e.appendChild(content);
    }

    return e;
  }

  function renderRepos(data) {
    data.map((repo) => {
      const liEl = addToHTML(
        createElement("li"),
        addAttribute("href", repo.html_url, createElement("a", repo.full_name))
      );
      addToHTML(reposEl, liEl);
    });
  }
}
