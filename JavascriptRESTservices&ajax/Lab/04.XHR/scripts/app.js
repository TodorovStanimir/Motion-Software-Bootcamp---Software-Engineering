function loadRepos() {
  const url = "https://api.github.com/users/testnakov/repos";
  const httpRequest = new XMLHttpRequest();
  const resultEl = document.querySelector("#res");

  if (resultEl === null) {
    throw new Error("Missing a result element");
  }
  httpRequest.open("GET", url);
  httpRequest.send();

  httpRequest.addEventListener("readystatechange", function () {
    if (httpRequest.readyState == 4 && httpRequest.status == 200) {
      document.querySelector("#res").textContent = httpRequest.responseText;
    }
  });
}
