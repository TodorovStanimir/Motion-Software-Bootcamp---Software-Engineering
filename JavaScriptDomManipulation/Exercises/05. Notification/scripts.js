function main() {
  const notificationEl = document.querySelector("#notification");
  const ctaShowNotification = document.querySelector("button");

  if (notificationEl === null || ctaShowNotification === null) {
    throw new Error("Missing notofication Element");
  }

  function notify(message) {
    notificationEl.textContent = message;
    notificationEl.style.display = "block";

    setTimeout(() => {
      notificationEl.style.display = "none";
    }, 2000);
  }

  const boundNotify = notify.bind(undefined, "Something happened!")

  ctaShowNotification.addEventListener("click", boundNotify);
}

document.addEventListener("DOMContentLoaded", main);
