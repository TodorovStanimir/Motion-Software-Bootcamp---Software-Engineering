async function loadCommits() {
  const baseUrl = "https://api.github.com/repos";
  const userEl = document.getElementById("username");
  const repoEl = document.getElementById("repo");
  const commitsEl = document.getElementById("commits");

  if (userEl === null || repoEl === null || commitsEl === null) {
    throw new Error("Missing html element/s");
  }

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

  const mkUrl = (username, repo) => `${baseUrl}/${username}/${repo}/commits`;

  let commits = [];

  try {
    commits = await fetchData(
      undefined,
      undefined,
      mkUrl(userEl.value, repoEl.value)
    );
  } catch (err) {
    commits = commits.concat(JSON.parse(err.message));
  }

  const fragmentEl = document.createDocumentFragment();

  commits.map((el) => {
    const liEl = document.createElement("li");
    liEl.innerHTML = `${el.commit.author.name}: ${el.commit.message}`;
    fragmentEl.appendChild(liEl);
  });

  commitsEl.innerHTML = "";
  commitsEl.appendChild(fragmentEl);
}
