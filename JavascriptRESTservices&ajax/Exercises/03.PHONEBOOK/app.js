function attachEvents() {
  const baseUrl = "https://phonebook-nakov.firebaseio.com/phonebook";
  const phonebook = document.querySelector("#phonebook");
  const [btnLoad, btnCreate] = document.querySelectorAll("button");
  const [personEl, phoneEl] = document.querySelectorAll("input");

  if (
    phonebook === null ||
    btnLoad === null ||
    btnCreate === null ||
    personEl === null ||
    phoneEl === null
  ) {
    throw new Error("Missing HTML element/s!!!");
  }

  const actions = {
    btnLoad: function () {
      loadContactsHandler();
    },
    btnCreate: function () {
      cteateContactHandler(personEl.value, phoneEl.value);
    },
    btnDelete: function (e) {
      deleteContactHandler(e);
    },
  };

  function handleError(res) {
    if (!res.ok) {
      throw new Error("Error");
    }
    return res.json();
  }

  function createContactElement(person, phone, key) {
    const liEl = document.createElement("li");
    liEl.innerHTML = `${person}:${phone}<button data-id="${key}" data-btn="btnDelete">DELETE</button>`;
    return liEl;
  }

  function addToHTML(parent, child) {
    parent.appendChild(child);
  }

  function clearAttributeValue(element, attribute) {
    element[attribute] = "";
  }

  function loadContactsHandler() {
    fetch(`${baseUrl}.json`)
      .then(handleError)
      .then((data) => {
        phonebook.innerHTML = "";
        Object.entries(data).map(([key, { person, phone }]) => {
          const newContactEl = createContactElement(person, phone, key);
          addToHTML(phonebook, newContactEl);
        });
      })
      .catch((err) => console.log(err));
  }

  function cteateContactHandler(person, phone) {
    if (!person || !phone) {
      return;
    }

    fetch(`${baseUrl}.json`, {
      method: "POST",
      body: JSON.stringify({ person, phone }),
    })
      .then(handleError)
      .then(({ name: key }) => {
        const newContactEl = createContactElement(person, phone, key);
        addToHTML(phonebook, newContactEl);
        clearAttributeValue(personEl, "value");
        clearAttributeValue(phoneEl, "value");
      })
      .catch((err) => console.log(err));
  }

  function deleteContactHandler(e) {
    const key = e.target.dataset.id;

    fetch(`${baseUrl}/${key}.json`, { method: "DELETE" })
      .then(handleError)
      .then(() => {
        const contact = [...phonebook.querySelectorAll("li")].find((contact) =>
          contact.innerHTML.includes(key)
        );
        phonebook.removeChild(contact);
      })
      .catch((err) => console.log(err));
  }

  document.addEventListener("click", function (e) {
    if (typeof actions[e.target.id] === "function") {
      actions[e.target.id]();
    }
    if (typeof actions[e.target.dataset.btn] === "function") {
      actions[e.target.dataset.btn](e);
    }
  });
}

attachEvents();
