const key = '58e68e25012fe2fb7cedfd77f7ff1196';
// ----------------------------------------------------------------getting the geolocation -----------------------
document.addEventListener('DOMContentLoaded', () => {
  navigator.geolocation.getCurrentPosition(successPosition, errorPosition);
});

const successPosition = function (position) {
  const { latitude, longitude } = position.coords;
  setUserCity(latitude, longitude);
};

const errorPosition = function (error) {
  const url = 'http://ip-api.com/json';
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const { lat, lon } = data;
      setUserCity(lat, lon);
    })
    .catch(error => console.error(error));
};

const setUserCity = function (latitude, longitude) {
  const url = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&appid=${key}`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      const item = data[0];
      const { local_names } = item;
      const { uk } = local_names;
      console.log(uk);
    })
    .catch(err => console.log(err));
};

// -------------------------------------------- Forecats -----------------------------------------
const getOneDay = async function (lat, lon) {
  const hourlyURL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}`;

  fetch(hourlyURL)
    .then(response => response.json())
    .then(data => {
      const hourly = data.list.slice(0, 6);
      hourly.forEach(item => {
        const time = item.dt_txt.split(' ')[1].slice(0, 5);
        const temp = Math.round(item.main.temp - 273);
        const feel = Math.round(item.main.feels_like - 273);
        const state = item.weather[0].main;
        const icon = item.weather[0].icon;
        const wind = item.wind.speed;
        console.log(time, temp, feel, state, icon, wind);
      });
    })
    .catch(() => console.log('smth went wrong'));
};
getOneDay(48.4680221, 35.0417711);
