const time = document.getElementById('time');
const currentTime = new Date();
time.addEventListener('change', () => {
  time.textContent = currentTime;
});
