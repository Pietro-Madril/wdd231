const highTemp = document.querySelector('#highTemp');
const lowTemp = document.querySelector('#lowTemp');
const humidity = document.querySelector('#humidity');
const sunrise = document.querySelector('#sunrise');
const sunset = document.querySelector('#sunset');
const forecastList = document.querySelector('#forecastList');
const lat = -30.82;
const lon = -55.35;
const apiKey = "dc39d1c1178c8cce5c5377f1cad74046" ;
const units = "metric" ;

const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;

function formatTime(timestamp) {
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
function formatDateLabel(timestamp) {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString(undefined, { weekday: 'short' });
}

async function fetchCurrentWeather() {
  try {
    const response = await fetch(currentUrl);
    if (!response.ok) throw Error(await response.text());

    const data = await response.json();

    highTemp.textContent = `${data.main.temp_max.toFixed(1)}°C`;
    lowTemp.textContent = `${data.main.temp_min.toFixed(1)}°C`;
    humidity.textContent = `${data.main.humidity}%`;
    sunrise.textContent = formatTime(data.sys.sunrise);
    sunset.textContent = formatTime(data.sys.sunset);

  } catch (error) {
    console.error('Error on loading weather:', error);
  }
}

async function fetchForecast() {
  try {
    const response = await fetch(forecastUrl);
    if (!response.ok) throw Error(await response.text());
    const data = await response.json();
    const dailyForecasts = data.list.filter(item => item.dt_txt.includes('12:00:00')).slice(0, 3);
    forecastList.innerHTML = '';

    dailyForecasts.forEach(item => {
      const li = document.createElement('li');
      const day = formatDateLabel(item.dt);
      const temp = item.main.temp.toFixed(1);
      const desc = item.weather[0].description;
      li.innerHTML = `<strong>${day}</strong>: ${temp}°C - ${desc}`;
      forecastList.appendChild(li);
    });

  } catch (error) {
    console.error('Error on loading forecast:', error);
  }
}

fetchCurrentWeather();
fetchForecast();
