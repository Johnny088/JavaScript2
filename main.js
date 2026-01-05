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
  const city = document.getElementById('city');
  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      const item = data[0];
      const { local_names } = item;
      const { en } = local_names;
      console.log(en);
      city.innerHTML = en;
    })
    .catch(err => console.log(err));
  getWeather(latitude, longitude);
};

// -------------------------------------------- get Forecats -----------------------------------------
const getWeather = function (lat, lon) {
  const hourlyURL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}`;
  const weatherBox = document.getElementById('weather__hourly');
  weatherBox.innerHTML = `<li class="item">
              <p>Today</p>
              <div class="icon"></div>
              <p>Forecast</p>
              <p>Temp C</p>
              <p>RealFeel</p>
              <p>Wind</p>
            </li>`;
  let flag = true;
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
        oneDay(weatherBox, time, temp, feel, state, icon, wind);
        if (flag === true) {
          currentWeather(icon, state, temp, feel, lat, lon);
          flag = false;
        }
      });
    })
    .catch(() => console.log('smth went wrong'));
};

// ----------------------------- push Forecast to HTML -------------------------------
const oneDay = function (weatherBox, time, temp, feel, state, icon, wind) {
  const li = document.createElement('li');
  li.className = 'item';
  li.innerHTML = `<p>${time}</p> 
              <img src="https://openweathermap.org/img/wn/${icon}@2x.png" class="icon" alt="icon">
              <p>${state}</p>
              <p>${temp}</p>
              <p>${feel}</p>
              <p>${wind}</p>`;
  weatherBox.appendChild(li);
};

// ------------------------------------- current weather -------------------------------
const currentWeather = function (icon, state, temp, feel, lat, lon) {
  const currentIcon = document.getElementById('current_icon');
  const currentState = document.getElementById('state');
  const currentTemp = document.getElementById('degree');
  const currentFeel = document.getElementById('degree__like');
  const sunrise = document.getElementById('sunrise');
  const sunset = document.getElementById('sunset');
  const duration = document.getElementById('duration');
  const data = document.getElementById('data');
  currentIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}@2x.png" class="Current__icon" alt="icon">`;
  currentState.innerHTML = state;
  currentTemp.innerHTML = `${temp}\u00b0C`;
  currentFeel.innerHTML = `real feel: ${feel}`;
  data.innerHTML = new Date().toDateString();
  currentData(sunrise, sunset, duration, lat, lon);
};

const currentData = function (sunrise, sunset, duration, lat, lon) {
  const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      sunrise.innerHTML = `Sunrise: ${new Date(
        data.sys.sunrise * 1000
      ).toLocaleTimeString('uk-UK', { hour: '2-digit', minute: '2-digit' })}`;

      sunset.innerHTML = `Sunset: ${new Date(
        data.sys.sunset * 1000
      ).toLocaleTimeString('uk-UK', { hour: '2-digit', minute: '2-digit' })}`;
      const durTemp = data.sys.sunset - data.sys.sunrise;
      duration.innerHTML = `Duration: ${Math.floor(
        durTemp / 3600
      )}h:${Math.floor((durTemp % 3600) / 60)}m`;
    })
    .catch(() => console.error('Current data something went wrong'));
};

// ------------------------------ get weather by query ------------------------
const subBtn = document.getElementById('subBtn');
const input = document.querySelector('.form__input input');
subBtn.addEventListener('click', () => {
  const city = input.value.trim();
  getWeatherByCity(city);
  input.value = '';
});
input.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    e.preventDefault();
    const city = input.value.trim();
    getWeatherByCity(city);
    input.value = '';
  }
});
const getWeatherByCity = function (city) {
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${key}`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (!data[0]) {
        mistake();
        return;
      }
      const { lat, lon } = data[0];
      setUserCity(lat, lon);
    })
    .catch(() => {
      mistake();
    });
};

// ------------------------------------------------------------ wrong city (Error case)---------------------------------

const mistake = function () {
  const weatherBox = document.getElementById('weather__hourly');
  const city = document.getElementById('city');
  city.innerHTML = 404;
  const errorCase = document.getElementById('errorCase');
  errorCase.innerHTML = '';
  weatherBox.innerHTML = `<div class="contain" id="animate">
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 320.9 277.3" style="enable-background:new 0 0 320.9 277.3;" xml:space="preserve">
<style type="text/css">
	.st0{fill:#F9CF68;}
</style>
<g>
	<path d="M95.5,66.6v5.2h-4.4v-5.2H80.5v-2.4l10.3-14.5h4.7v13.4h2.7v3.5H95.5z M91.1,54.8c-0.5,0.8-1,1.6-1.5,2.3l-4.3,6h5.8V54.8z
		"/>
	<path d="M117.9,60.8c0,6.9-2.3,11.5-8.6,11.5c-6.3,0-8.6-4.6-8.6-11.5c0-7,2.3-11.5,8.6-11.5C115.6,49.3,117.9,53.8,117.9,60.8z
		 M113.3,60.8c0-5.6-1.2-8.2-3.9-8.2c-2.7,0-3.9,2.6-3.9,8.2c0,5.6,1.2,8.2,3.9,8.2C112,69,113.3,66.4,113.3,60.8z"/>
	<path d="M135.5,66.6v5.2h-4.4v-5.2h-10.6v-2.4l10.3-14.5h4.7v13.4h2.7v3.5H135.5z M131.1,54.8c-0.5,0.8-1,1.6-1.5,2.3l-4.3,6h5.8
		V54.8z"/>
	<path d="M92.8,172.9h6.3v2.2h-6.3v5.8h-2.8V167h9.8v2.2h-7V172.9z"/>
	<path d="M101.9,180.9V167h2.8v13.8H101.9z"/>
	<path d="M117.7,180.9h-10V167h2.8v11.5h7.2V180.9z"/>
	<path d="M129.8,180.9h-10V167h9.8v2.2h-7v3.6h6.5v2.2h-6.5v3.6h7.2V180.9z"/>
	<path d="M98.3,204.9l-5.7-10.5c0.1,1.5,0.1,3.1,0.1,4.2v6.2H90V191h3.7l5.8,10.7c-0.1-1.5-0.1-3.2-0.1-4.3V191h2.7l0,13.8H98.3z"/>
	<path d="M118,198c0,4.3-2.6,7.2-6.8,7.2c-4.3,0-6.8-2.9-6.8-7.2c0-4.3,2.6-7.2,6.8-7.2C115.5,190.8,118,193.6,118,198z M115.1,198
		c0-3.2-1.5-5.1-3.9-5.1c-2.5,0-3.9,1.9-3.9,5.1c0,3.2,1.5,5.1,3.9,5.1C113.7,203.1,115.1,201.2,115.1,198z"/>
	<path d="M125.9,193.2v11.6h-2.8v-11.6h-4.7V191h12.1v2.2H125.9z"/>
	<path d="M78.4,220.9h6.3v2.2h-6.3v5.8h-2.8V215h9.8v2.2h-7V220.9z"/>
	<path d="M100.3,222c0,4.3-2.6,7.2-6.8,7.2c-4.3,0-6.8-2.9-6.8-7.2c0-4.3,2.6-7.2,6.8-7.2C97.8,214.8,100.3,217.6,100.3,222z
		 M97.4,222c0-3.2-1.5-5.1-3.9-5.1c-2.5,0-3.9,1.9-3.9,5.1c0,3.2,1.5,5.1,3.9,5.1C96,227.1,97.4,225.2,97.4,222z"/>
	<path d="M114,223.2c0,0.6,0,1,0,1.6c-0.2,2.3-1.8,4.3-5.6,4.3c-3.9,0-5.5-2-5.7-4.3c0-0.6,0-1,0-1.6V215h2.7v8.5c0,0.4,0,0.7,0,1
		c0.1,1.6,1.1,2.6,2.9,2.6c1.8,0,2.8-1,2.9-2.6c0-0.3,0-0.6,0-1V215h2.7V223.2z"/>
	<path d="M125.1,228.9l-5.7-10.5c0.1,1.5,0.1,3.1,0.1,4.2v6.2h-2.8V215h3.7l5.8,10.7c-0.1-1.5-0.1-3.2-0.1-4.3V215h2.7l0,13.8H125.1
		z"/>
	<path d="M144.2,221.8c0,4.2-2.5,6.6-5.7,7c-0.7,0.1-1,0.1-1.8,0.1H132V215h4.8c0.7,0,1.1,0,1.8,0.1
		C141.7,215.5,144.2,217.5,144.2,221.8z M141.3,221.8c0-2.7-1.3-4.3-3.4-4.5c-0.5-0.1-0.9-0.1-1.5-0.1h-1.7v9.5h1.6
		c0.6,0,1,0,1.5-0.1C139.9,226.4,141.3,224.6,141.3,221.8z"/>
</g>
<path class="beer" d="M61.2,15.8c-3.7,47.1,15.3,67.4,18.3,108s-19.7,104-17,114c2.7,10,97.3,11,95.3-2.3s-17.7-72.3-14.7-115.3
	s17.4-46,14.7-104.3L61.2,15.8L61.2,15.8z"/>
<g>
	<path d="M2.4,244.5c17.9,0,35.8,0,53.7,0c2.2,0,3.2-2.7,1.8-4.3c-2.9-3.1,0.6-11.9,1.4-15.6c1.6-6.8,3.2-13.5,4.7-20.3
		c3.8-17,7.2-34.1,9.2-51.5c2.1-18.5,2-36-2.6-54.1C65.5,78.6,58,59.4,56,38.7c-1.3-11.5-1.7-24.3,0-35.5c-0.8,0.6-1.6,1.2-2.4,1.8
		c32,0,64.1,0,96.1,0c4.6,0,9.2,0,13.8,0c-0.8-0.6-1.6-1.2-2.4-1.8c4.9,26.4,0.3,55.1-6.5,80.6c-2.5,9.3-4.9,18.6-6.1,28.2
		c-1.3,10.5-0.7,21.3-0.1,31.8c1,18.8,3.3,37.5,6.4,56.1c1.3,7.7,2.8,15.4,4.4,23.1c0.8,4,4.6,14.2,1.8,17.4
		c-1.4,1.6-0.5,4.3,1.8,4.3c45.5,0,91,0,136.4,0c6.4,0,12.9,0,19.3,0c3.2,0,3.2-5,0-5c-45.5,0-91,0-136.4,0c-6.4,0-12.9,0-19.3,0
		c0.6,1.4,1.2,2.8,1.8,4.3c3.5-3.9,2.3-9,1.3-13.7c-1.2-6-2.5-12-3.7-18c-3.5-18.1-6.2-36.4-7.8-54.7c-0.9-10.9-1.5-21.8-1.5-32.7
		c0-11.2,2-22.1,4.8-32.9c4.9-19.3,9.1-38.3,9.8-58.4c0.4-10.4,0.3-21.2-1.6-31.5c-0.2-1.1-1.4-1.8-2.4-1.8c-32,0-64.1,0-96.1,0
		c-4.6,0-9.2,0-13.8,0c-1,0-2.2,0.8-2.4,1.8c-1.5,9.6-1.5,19.5-1,29.1c1.2,21,7.2,40.3,13,60.3c2.9,10,5.6,20.2,6.3,30.7
		c0.7,9.7-0.2,19.7-1.3,29.3c-2,18.4-5.7,36.5-9.8,54.5c-1.7,7.5-3.5,14.9-5.2,22.4c-1.1,5.1-3.1,11.2,1,15.5
		c0.6-1.4,1.2-2.8,1.8-4.3c-17.9,0-35.8,0-53.7,0C-0.8,239.5-0.8,244.5,2.4,244.5L2.4,244.5z"/>
</g>
<path d="M69,249c0.7,0.6,1.5,0.9,2.4,1.1c0.9,0.2,1.7,0.4,2.6,0.5c1.8,0.3,3.5,0.5,5.3,0.6c3.5,0.3,7.1,0.4,10.6,0.6
	c3.6,0.1,7.1,0.2,10.7,0.2c3.6,0,7.1,0.1,10.7,0c3.6,0,7.1,0,10.7-0.1c3.6,0,7.1-0.2,10.6-0.4c3.5-0.2,7.1-0.4,10.6-0.8
	c3.5-0.3,7.1-0.8,10.5-1.7c-3.2,1.8-6.7,2.8-10.2,3.7c-3.5,0.8-7.1,1.5-10.7,1.9c-3.6,0.5-7.2,0.8-10.8,1c-3.6,0.2-7.2,0.3-10.8,0.4
	c-3.6,0-7.2-0.1-10.8-0.3c-3.6-0.2-7.2-0.4-10.8-0.9c-3.6-0.4-7.2-1-10.7-1.7c-1.8-0.4-3.5-0.8-5.3-1.4c-0.9-0.3-1.7-0.6-2.5-1
	C70.4,250.2,69.5,249.8,69,249z"/>
</svg>


</div>`;
};
