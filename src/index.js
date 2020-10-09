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
  let updateDateTime = document.querySelector(".dateTime");
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }

  if (currentMinute < 10) {
    currentMinute = `0${currentMinute}`;
  }

  updateDateTime.innerHTML = `${currentDay}, ${currentDate}th ${currentMonth} ${currentHour}:${currentMinute}`;
}
formatDate(now);
debugger;
function showTemp(response) {
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = Math.round(response.data.main.temp) + `°`;
  let highTemp = document.querySelector("#low-temp");
  highTemp.innerHTML = Math.round(response.data.main.temp_min) + `°C`;
  let lowTemp = document.querySelector("#high-temp");
  lowTemp.innerHTML = Math.round(response.data.main.temp_max) + `°C`;
  let precipitation = document.querySelector("#precipitation");
  precipitation.innerHTML = Math.round(response.data.clouds.all) + `%`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = Math.round(response.data.main.humidity) + `%`;
  let visibility = document.querySelector("#visibility");
  visibility.innerHTML = Math.round(response.data.visibility) + `m`;
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed) + `mph`;
  let searchLocation = document.querySelector("h1");
  let inputLocation = document.querySelector("#input-city");
  searchLocation.innerHTML = `${response.data.name} , ${response.data.sys.country}`;

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
  axios.get(apiUrl).then(showTemp);
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

  axios.get(apiUrl).then(showTemp);
}

let locationIcon = document.querySelector("#current-location");
locationIcon.addEventListener("click", currentLocation);

navigator.geolocation.getCurrentPosition(latLocation);


