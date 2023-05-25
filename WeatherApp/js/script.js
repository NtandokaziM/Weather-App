let dateTime = document.querySelector("#datetime");
let searchForm = document.querySelector("#search-form");
let searchInput = document.querySelector("#search");
let cityNameElement = document.querySelector("#city-name");
let datetimeElement = document.querySelector("#datetime");
let weatherDescriptionElement = document.querySelector("#weather-description");
let temperatureElement = document.querySelector("#temperature");
let currentLocationButton = document.querySelector("#current-location-btn");

currentLocationButton.addEventListener("click", getCurrentLocationWeather);
searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let cityName = searchInput.value;
  getWeather(cityName);
  searchInput.value = "";
});

function getCurrentLocationWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;
      getWeatherByCoordinates(latitude, longitude);
    });
  } else {
    alert("Geolocation is not supported by your browser.");
  }
}

function getWeatherByCoordinates(latitude, longitude) {
  let apiKey = "ecd88a9ef417c44c764d26c69ef13642";
  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios
    .get(weatherUrl)
    .then(function (response) {
      let weatherData = response.data;
      let city = weatherData.name;
      let temperature = Math.round(weatherData.main.temp);
      let weatherDescription = weatherData.weather[0].description;

      updateWeatherInfo(city, temperature, weatherDescription);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function getWeather(cityName) {
  let apiKey = "ecd88a9ef417c44c764d26c69ef13642";
  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

  axios
    .get(weatherUrl)
    .then(function (response) {
      let weatherData = response.data;
      let city = weatherData.name;
      let temperature = Math.round(weatherData.main.temp);
      let weatherDescription = weatherData.weather[0].description;

      updateWeatherInfo(city, temperature, weatherDescription);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function updateWeatherInfo(city, temperature, weatherDescription) {
  cityNameElement.textContent = city;
  datetimeElement.textContent = getCurrentDateTime();
  weatherDescriptionElement.textContent = weatherDescription;
  temperatureElement.textContent = `${temperature}°C`;
}

function getCurrentDateTime() {
  let now = new Date();
  let options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return now.toLocaleDateString("en-US", options);
}

function updateTime() {
  let now = new Date();
  let daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let dayOfWeek = daysOfWeek[now.getDay()];
  let hours = now.getHours();
  let minutes = now.getMinutes().toString().padStart(2, "0");
  let time = `${dayOfWeek} ${hours}:${minutes}`;
  dateTime.textContent = time;
}

updateTime();
setInterval(updateTime, 1000);
