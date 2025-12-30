const time = document.getElementById('time');
setInterval(() => {
  const currentTime = new Date();
  time.value = currentTime.toLocaleTimeString();
}, 1000);

// ------------------ task 2 ------------------------
const setTimer = function () {
  const minutes = document.getElementById('minutes');
  const seconds = document.getElementById('seconds');
  const timeout = document.getElementById('timeout');
  const stopBtn = document.getElementById('stopBtn');

  let m = Number(minutes.value);
  let s = Number(seconds.value);

  const interval = setInterval(() => {
    s -= 1;
    seconds.value = s;
    if (m == 0 && s == 0) {
      minutes.value = 0;
      seconds.value = 0;
      clearInterval(interval);
      timeout.textContent = 'Time is over';
    } else if (s == -1) {
      m -= 1;
      minutes.value = m;
      s = 59;
      seconds.value = s;
    }
  }, 1000);
  stopBtn.addEventListener('click', () => clearInterval(interval));
};

// ------------------------------------------- task3 ------------------------------------------------------
const startStopwatch = function () {
  const minutes = document.getElementById('min');
  const seconds = document.getElementById('sec');
  const msec = document.getElementById('ms');
  const stopBtn = document.getElementById('stopBtnWatch');
  const record = document.getElementById('record');
  const clearStopwatch = document.getElementById('clearBtnWatch');
  let flag = true;
  let m = Number(minutes.value);
  let s = Number(seconds.value);
  let ms = Number(seconds.value);
  const interval = setInterval(() => {
    ms += 1;
    msec.value = ms;
    if (ms === 100) {
      ms = 0;
      msec.value = ms;
      s += 1;
      seconds.value = s;
    }
    if (s === 60) {
      s = 0;
      seconds.value = s;
      m += 1;
      minutes.value = m;
    }
  }, 10);
  stopBtn.addEventListener('click', () => {
    clearInterval(interval);
    if (flag === false) {
      record.innerHTML = '';
      flag = true;
    }
    record.innerHTML += `<li>Result <input class="tImput ms-2 mt-3" value="${m}"/> <input class="tImput" value="${s}"/> <input class="tImput" value="${ms}"/></li>`;
  });
  clearStopwatch.addEventListener('click', () => {
    clearInterval(interval);
    record.innerHTML = '';
    msec.value = ms = 0;
    seconds.value = s = 0;
    minutes.value = m = 0;
    flag = false;
  });
};
