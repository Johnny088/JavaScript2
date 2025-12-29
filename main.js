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
      console.log('Time is over');
    } else if (s == -1) {
      m -= 1;
      minutes.value = m;
      s = 59;
      seconds.value = s;
    }
  }, 1000);
};
