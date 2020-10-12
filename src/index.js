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

let updateDateTime = document.querySelector(".dateTime");
updateDateTime.innerHTML = formatDate(now);

function formatDateSH(timestamp) {
  let date = new Date(timestamp);
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hour}:${minutes}`;
}
function showData(response) {
  let sunriseTime = document.querySelector("#sunrise");
  sunriseTime.innerHTML = formatDateSH(response.data.sys.sunrise * 1000);
  let sunsetTime = document.querySelector("#sunset");
  sunsetTime.innerHTML = formatDateSH(response.data.sys.sunset * 1000);
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
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@4x.png`
  );
}

function locationSearch(event) {
  event.preventDefault();
  let searchLocation = document.querySelector("h1");
  let inputLocation = document.querySelector("#input-city");
  searchLocation.innerHTML = `${inputLocation.value}`;
  let units = `&units=metric`;
  let city = inputLocation.value;
  let key = `&appid=87fd0529e40a37893f5aceb0fea3c12a`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}${key}${units}`;

  axios.get(apiUrl).then(showData);
}

let locationForm = document.querySelector("#location-form");
locationForm.addEventListener("submit", locationSearch);

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(latLocation);
}

function latLocation(position) {
  let apiKey = `&appid=87fd0529e40a37893f5aceb0fea3c12a`;
  let unit = `&units=metric`;
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}${apiKey}${unit}`;

  axios.get(apiUrl).then(showData);
}

let locationIcon = document.querySelector("#current-location");
locationIcon.addEventListener("click", currentLocation);

navigator.geolocation.getCurrentPosition(latLocation);

let farenheitLink = document.querySelector("#farenheit-link");
farenheitLink.addEventListener("click", displayImperial);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayMetric);

let celsiusTemp = null;
let highCelsiusTemp = null;
let lowCelsiusTemp = null;

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
