function createArticle() {
  const titleEl = document.getElementById("createTitle");
  const contentEl = document.getElementById("createContent");
  const articlesEl = document.getElementById("articles");

  if (titleEl === null || contentEl === null || articlesEl === null) {
    throw new Error("Something happened, please reload the page");
  }

  const titleArticle = titleEl.value;
  const contentArticle = contentEl.value;

  if (titleArticle && contentArticle) {
		const articleEl = document.createElement('article');
		const hEl = document.createElement('h3');
		const pEl = document.createElement('p');

		hEl.innerText = titleArticle;
		pEl.innerHTML = contentArticle;

		articleEl.appendChild(hEl);
		articleEl.appendChild(pEl);
		articlesEl.appendChild(articleEl);

    titleEl.value = "";
		contentEl.value = "";
  }
}