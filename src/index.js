//function #1 date
function formatDate(date) {
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }

  let minute = date.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[date.getDay()];
  return `${day} ${hour}:${minute}`;
}
//function #2 city
function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city");
  let cityInput = document.querySelector("#input-city");
  searchInput.innerHTML = cityInput.value;

  let apiKey = "146a2d6b6ac247d05289f4e367d16448";
  let city = cityInput.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
//function #3
function showTemperature(response) {
  let displayTemperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = displayTemperature;

  let weatherDescription = response.data.weather[0].description;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = weatherDescription;

  let displayHumidity = response.data.main.humidity;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = displayHumidity;

  let displayWind = response.data.wind.speed;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = displayWind;
}
//function #4
function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "146a2d6b6ac247d05289f4e367d16448";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}
//function #5
function convertFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}
//function #6
function convertCelcius(event) {
  event.preventDefault();
  let celciusElement = document.querySelector("#temperature");
  let fahrenheitTemperature = celciusElement.innerHTML;
  celciusElement.innerHTML = Math.round((fahrenheitTemperature - 30) / 2);
}
//function #7
function searchNavigator() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
//#1
let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

//#2
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);
form.addEventListener("click", search);

let fahrenheit = document.querySelector("#temp-f");
fahrenheit.addEventListener("click", convertFahrenheit);

let celcius = document.querySelector("#temp-c");
celcius.addEventListener("click", convertCelcius);

let currentPosition = document.querySelector("#current-button");
currentPosition.addEventListener("click", searchNavigator);
