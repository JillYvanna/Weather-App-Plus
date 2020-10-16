let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let shortMonths = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

function formatDate(date) {
  let currentDay = days[date.getDay()];
  let currentMonth = months[date.getMonth()];
  let currentDate = date.getDate();
  let currentHour = date.getHours();
  let currentMinute = date.getMinutes();

  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }

  if (currentMinute < 10) {
    currentMinute = `0${currentMinute}`;
  }

  return `${currentDay}, ${currentDate}th ${currentMonth} ${currentHour}:${currentMinute}`;
}

function formatDateHM(timestamp) {
  let date = new Date(timestamp);
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hour - 1}:${minutes}`;
}

function formatForecastDate(timestamp) {
  let formatdate = new Date(timestamp);
  let date = formatdate.getDate();
  let month = shortMonths[formatdate.getMonth()];
  if (month < 10) {
    month = `0${month}`;
  }
  if (date < 10) {
    date = `0${date}`;
  }
  return `${date} ${month}`;
}

function formatForecastDay(timestamp) {
  let formatdate = new Date(timestamp);
  let day = days[formatdate.getDay()];
  return `${day}`;
}
function displayImperial(event) {
  event.preventDefault();
  let temperatureDisplayed = document.querySelector("#current-temp");
  let highTemp = document.querySelector("#high-temp");
  let lowTemp = document.querySelector("#low-temp");
  celsiusLink.classList.remove("active");
  farenheitLink.classList.add("active");
  let farenheitTemp = (celsiusTemp * 9) / 5 + 32;
  let highFarenTemp = (highCelsiusTemp * 9) / 5 + 32;
  let lowFarenTemp = (lowCelsiusTemp * 9) / 5 + 32;
  temperatureDisplayed.innerHTML = Math.round(farenheitTemp) + `°`;
  highTemp.innerHTML = Math.round(highFarenTemp) + `°`;
  lowTemp.innerHTML = Math.round(lowFarenTemp) + `°`;
}
function displayMetric(event) {
  event.preventDefault();
  let temperatureDisplayed = document.querySelector("#current-temp");
  let highTemp = document.querySelector("#high-temp");
  let lowTemp = document.querySelector("#low-temp");
  celsiusLink.classList.add("active");
  farenheitLink.classList.remove("active");
  temperatureDisplayed.innerHTML = Math.round(celsiusTemp) + `°`;
  highTemp.innerHTML = Math.round(highCelsiusTemp) + `°`;
  lowTemp.innerHTML = Math.round(lowCelsiusTemp) + `°`;
}
function showData(response) {
  let sunriseTime = document.querySelector("#sunrise");
  sunriseTime.innerHTML = formatDateHM(
    (response.data.sys.sunrise + response.data.timezone) * 1000
  );
  let sunsetTime = document.querySelector("#sunset");
  sunsetTime.innerHTML = formatDateHM(
    (response.data.sys.sunset + response.data.timezone) * 1000
  );
  celsiusTemp = response.data.main.temp;
  highCelsiusTemp = response.data.main.temp_max;
  lowCelsiusTemp = response.data.main.temp_min;
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = Math.round(celsiusTemp) + `°`;
  let highTemp = document.querySelector("#low-temp");
  highTemp.innerHTML = Math.round(lowCelsiusTemp) + `°`;
  let lowTemp = document.querySelector("#high-temp");
  lowTemp.innerHTML = Math.round(highCelsiusTemp) + `°`;
  let precipitation = document.querySelector("#precipitation");
  precipitation.innerHTML = Math.round(response.data.clouds.all) + `%`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = Math.round(response.data.main.humidity) + `%`;
  let visibility = document.querySelector("#visibility");
  visibility.innerHTML = Math.round(response.data.visibility) + `m`;
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed) + `mph`;
  let searchLocation = document.querySelector("h1");
  searchLocation.innerHTML = `${response.data.name} , ${response.data.sys.country}`;
  let weatherDetail = document.querySelector("#today-description");
  weatherDetail.innerHTML = response.data.weather[0].description;
  iconElement = document.querySelector("#today-icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@4x.png`
  );
  formatDate(now);
}

function locationSearch(event) {
  event.preventDefault();
  let searchLocation = document.querySelector("h1");
  let inputLocation = document.querySelector("#input-city");
  let units = `&units=metric`;
  let city = inputLocation.value;
  let key = `&appid=87fd0529e40a37893f5aceb0fea3c12a`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}${key}${units}`;
  axios.get(apiUrl).then(showData);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}${key}${units}`;
  axios.get(apiUrl).then(displayForecast);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(latLocation);
}

function latLocation(position) {
  let apiKey = `&appid=87fd0529e40a37893f5aceb0fea3c12a`;
  let unit = `&units=metric`;
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}${apiKey}${unit}`;
  axios.get(apiUrl).then(showData);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}${apiKey}${unit}`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastDays = document.querySelector("#forecast-days");
  forecastDays.innerHTML = null;
  let forecast = null;
  for (let index = 0; index < 40; index += 8) {
    forecast = response.data.list[index];
    forecastDays.innerHTML += ` 
    
  <div class="card-body cardDay" id="forecast-card">
     <div class="row row1" >
      <span class="col-2 date">${formatForecastDate(forecast.dt * 1000)}</span>
      <span class="col-5 day">${formatForecastDay(forecast.dt * 1000)}</span>
      <span class="col-3 weather" >
      <img id="forecast-icon" src="https://openweathermap.org/img/wn/${
        forecast.weather[0].icon
      }@4x.png"/>
        </span>
      <span class="col-2 highLow">
        <strong>  ${Math.round(
          forecast.main.temp_max
        )}°</strong> <br />${Math.round(forecast.main.temp_min)}°</span
      >
    </div>
</div>`;
  }
}
let locationForm = document.querySelector("#location-form");
locationForm.addEventListener("submit", locationSearch);

let locationIcon = document.querySelector("#current-location");
locationIcon.addEventListener("click", currentLocation);

let farenheitLink = document.querySelector("#farenheit-link");
farenheitLink.addEventListener("click", displayImperial);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayMetric);

let celsiusTemp = null;
let highCelsiusTemp = null;
let lowCelsiusTemp = null;

let updateDateTime = document.querySelector(".dateTime");
updateDateTime.innerHTML = formatDate(now);

navigator.geolocation.getCurrentPosition(latLocation);
