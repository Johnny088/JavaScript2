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
const city = 'Kyiv';
const key = '58e68e25012fe2fb7cedfd77f7ff1196';
const getOneDay = async function () {
  try {
    const result = await fetch(url);
  } catch {}
};
