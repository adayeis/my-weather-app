/*****************************************ONLOAD****************************************/
// Onload data get function
function defaultCityWeather() {
  let city = "istanbul";
  let apiKey = "de2c40e370d58e257faf07ba4ea95840";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(writeCityData);
}

defaultCityWeather();
/*****************************************SEARCH BUTTON****************************************/
// Search City get function
function searcingCity(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#search-city");
  let city = searchCity.value;
  if (searchCity.value.length > 0) {
    let apiKey = "de2c40e370d58e257faf07ba4ea95840";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(writeCityData);
  }
}

// City Weather Result write function....
function writeCityData(response) {
  // City name
  let cityName = response.data.name;
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = cityName;
  // City temp
  let cityTemp = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = cityTemp;
  // Weather description
  let cityDes = response.data.weather[0].main;
  let currentDes = document.querySelector("#current-des");
  currentDes.innerHTML = cityDes;
  // Weather EMOJİ
  if (cityDes === "Clouds") {
    let currentEmoji = document.querySelector("#current-weather-emoji");
    currentEmoji.innerHTML = "🌥";
  } else if (cityDes === "Rain") {
    let currentEmoji = document.querySelector("#current-weather-emoji");
    currentEmoji.innerHTML = "🌧";
  } else {
    let currentEmoji = document.querySelector("#current-weather-emoji");
    currentEmoji.innerHTML = "☀️";
    // emojilerin devamı gelecek.
  }
  // humidity
  let cityHum = response.data.main.humidity;
  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = cityHum;
  //Wind
  let cityWind = Math.round(response.data.wind.speed);
  let currentWind = document.querySelector("#wind");
  currentWind.innerHTML = cityWind;
}

// Search City Button Event
let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", searcingCity);

// Searc Button Enter
function searcingCityEnter(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    let searchButton = document.querySelector("#search-button");
    searchButton.click();
  }
}

// Search Button Enter Event Add
let searchCity = document.querySelector("#search-city");
searchCity.addEventListener("keypress", searcingCityEnter); // search button ends

/*****************************************CURRENT BUTTON****************************************/
// Current City button get function
function currentCoordsWeather(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "de2c40e370d58e257faf07ba4ea95840";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(writeCityData);
}

// Current buttn event func
function getCurrentCoords(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentCoordsWeather);
}

// Currnet City Button Event
let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentCoords); // current button ends

/*****************************************DATE AND TIME************************************/
function getDateName(date) {
  let days = [
    "Sunday",
    "Monday",
    "Thursday",
    "Wednesday",
    "Tuesday",
    "Friday",
    "Saturday",
  ];
  let day = date.getDay();
  day = days[day];
  return day;
}

let now = new Date();
let currentDay = document.querySelector("#current-day");
currentDay.innerHTML = getDateName(now);

function getCurrentDate(date) {
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
  let day = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear();
  return `${day}/${month + 1}/${year}`;
}

let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = getCurrentDate(now);

function getCurrentTime(date) {
  let hour = date.getHours();
  let min = date.getMinutes();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  if (min < 10) {
    min = `0${min}`;
  }
  return `${hour}:${min}`;
}

let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = getCurrentTime(now); // time and date ends
