function stopwatch() {
  const startCTA = document.querySelector("#startBtn");
  const stopCTA = document.querySelector("#stopBtn");
  const timeElement = document.querySelector("#time");
  let timer = undefined;
  let curTime = {
    min: 0,
    sec: 0,
  };

  if (startCTA === null || stopCTA === null || timeElement === null) {
    throw new Error("Missing HTML elements.");
  }

  function showTime({ min, sec }, timeEl) {
    timeEl.textContent = `${min > 9 ? min : "0" + min}:${
      sec > 9 ? sec : "0" + sec
    }`;
    return { min, sec };
  }

  function toggleDisabled(htmlElement, boolean) {
    htmlElement.disabled = boolean;
  }

  function increaseTime({ min, sec }) {
    sec++;
    if (sec === 60) {
      min++;
      sec = 0;
    }
    return { min, sec };
  }

  function time() {
    curTime = showTime(increaseTime(curTime), timeElement);
    timer = setTimeout(time, 1000);
  }

  function startTime() {
    showTime(curTime, timeElement);
    setTimeout(time, 1000);
    toggleDisabled(stopCTA, false);
    toggleDisabled(startCTA, true);
  }

  function stopTime() {
    clearTimeout(timer);
    curTime = {
      min: 0,
      sec: 0,
    };
    toggleDisabled(stopCTA, true);
    toggleDisabled(startCTA, false);
  }

  startCTA.addEventListener("click", startTime);
  stopCTA.addEventListener("click", stopTime);
}
