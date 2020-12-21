function attachEvents() {
  const baseUrl = "https://blog-apps-c12bf.firebaseio.com/";

  function handleError(res) {
    if (!res.ok) throw new Error(res.statusText);
    return res;
  }

  function deserializeData(res) {
    return res.json();
  }

  async function fetchData(hError = handleError, dData = deserializeData, url) {
    return fetch(url)
      .then(hError)
      .then(dData)
      .catch((err) => console.log(err));
  }

  const mkUrl = (x) => `${baseUrl}${x}.json`;

  const getPosts = () => { return fetchData(undefined, undefined, mkUrl("/posts")); };
  const getCommments = () => { return fetchData(undefined, undefined, mkUrl("/comments")); };
  const getPost = (id) => { return fetchData(undefined, undefined, mkUrl(`/posts/${id}`)); };

  function displayPosts(posts) {
    html.select().innerHTML = "";
    let fragment = document.createDocumentFragment();
    Object.keys(posts).map((key) => {
      const optionEl = document.createElement("option");
      optionEl.value = key;
      optionEl.innerHTML = posts[key].title;
      fragment.appendChild(optionEl);
    });
    html.select().appendChild(fragment);
  }

  function displayPost(post, comments) {
    Object.keys(post).map((key) => {
      if (typeof html[key] === "function") {
        html[key]().innerHTML = post[key];
      }
    });
    displayComments(comments, post);
  }

  function displayComments(comments, post) {
    html.comments().innerHTML = "";
    let fragment = document.createDocumentFragment();
    Object.keys(comments).map((key) => {
      if (comments[key].postId === post.id) {
        const liEl = document.createElement("li");
        liEl.innerHTML = comments[key].text;
        fragment.appendChild(liEl);
      }
    });
    html.comments().appendChild(fragment);
  }

  actions = {
    btnLoadPosts: async () => {
      displayPosts(await getPosts());
    },
    btnViewPost: async () => {
      const post = await getPost(document.getElementById("posts").value);
      const comments = await getCommments();
      displayPost(post, comments);
    },
  };

  const html = {
    select: () => document.getElementById("posts"),
    title: () => document.getElementById("post-title"),
    body: () => document.getElementById("post-body"),
    comments: () => document.getElementById("post-comments"),
  };

  function eventHandler(e) {
    if (typeof actions[e.target.id] === "function") {
      actions[e.target.id]();
    }
  }

  document.addEventListener("click", eventHandler);
}

attachEvents();
