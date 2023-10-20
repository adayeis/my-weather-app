/*****************************************SEARCH BUTTON API****************************************/
function getCity(city) {
  let apiKey = "67ct2f0dc4c74e3fcab1f74do85ff4a4";
  let weatherApiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric `;
  let forecastApiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}
`;
  axios.get(weatherApiUrl).then(writeCityData);
  axios.get(forecastApiUrl).then(writeCityForecastData);
}

// Search City get function
function searcingCity(event) {
  event.preventDefault();
  let searchCityElement = document.querySelector("#search-city");
  let city = searchCityElement.value;
  getCity(city);
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
let searchCityElement = document.querySelector("#search-city");
searchCityElement.addEventListener("keypress", searcingCityEnter); // search button ends

// Onload data get function
getCity("Istanbul");

/*****************************************DISPLAY CITY WEATHER************************************/
function writeCityData(response) {
  // City name
  let cityName = response.data.city;
  if (cityName != null) {
    let currentCity = document.querySelector("#current-city");
    currentCity.innerHTML = cityName;
    // City temp
    let cityTemp = Math.round(response.data.temperature.current);
    let currentTemp = document.querySelector("#current-temp");
    currentTemp.innerHTML = cityTemp;
    // Weather description
    let cityDes = response.data.condition.description;
    let currentDes = document.querySelector("#current-des");
    currentDes.innerHTML = cityDes;
    // Weather EMOJİ
    let cityWeatherIcon = response.data.condition.icon;
    let currentWeatherIcon = document.querySelector("#current-weather-icon");
    currentWeatherIcon.setAttribute(
      "src",
      `https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${cityWeatherIcon}.png`
    );
    currentWeatherIcon.setAttribute("alt", response.data.condition.description);
    // humidity
    let cityHum = response.data.temperature.humidity;
    let currentHumidity = document.querySelector("#humidity");
    currentHumidity.innerHTML = cityHum;
    //Wind
    let cityWind = Math.round(response.data.wind.speed);
    let currentWind = document.querySelector("#wind");
    currentWind.innerHTML = cityWind;

    /*****************************************BG COLORS************************************/
    let container = document.querySelector("main");
    let currentWeatherContainer = document.querySelector(
      "#current-weather-container"
    );
    if (cityTemp > 20) {
      container.classList.remove("bg-bluesky");
      container.classList.add("bg-yellowsky");
      let currentWeatherContainer = document.querySelector(
        "#current-weather-container"
      );
      currentWeatherContainer.classList.remove("bg-bluesky-dark");
      currentWeatherContainer.classList.add("bg-yellowsky-dark");
    } else {
      container.classList.remove("bg-yellowsky");
      container.classList.add("bg-bluesky");
      currentWeatherContainer.classList.remove("bg-yellowsky-dark");
      currentWeatherContainer.classList.add("bg-bluesky-dark");
    }
  }
}

/*****************************************DISPLAY CITY FORECAST************************************/
function formatDay(timestamp) {
  let time = new Date(timestamp * 1000);
  day = time.getDay();
  let days = ["Sun", "Mon", "Thu", "Wed", "Tue", "Fri", "Sat"];
  day = days[day];

  return day;
}

function writeCityForecastData(response) {
  let forecastData = response.data.daily;
  console.log(forecastData);

  let weatherForecast = document.querySelector("#weather-forecast");

  let forecastHTML = ``;
  forecastData.forEach(function (day, index) {
    if (0 < index && index <= 6) {
      console.log(index);
      forecastHTML += `    
       <div class="col-6 col-sm-4 shadow-sm justify-content-center rounded-3 align-items-center forecast-days">
          <ul>
            <li class="days">${formatDay(day.time)}</li>
                        <li>${day.condition.description}</li>
          </ul>
          <img
            src="https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
              day.condition.icon
            }.png"
            alt=""
            class="forecast-weather-emoji"
          />
          <ul>
            <li class="forecast-temprature-max">${Math.round(
              day.temperature.maximum
            )}°C </li>
            <li class="forecast-temprature-min">${Math.round(
              day.temperature.minimum
            )}°C </li>
          </ul>
        </div>
      `;
    }
  });
  weatherForecast.innerHTML = forecastHTML;
} // display forecast ends

/*****************************************CURRENT BUTTON****************************************/
// Current City button get function
function currentCoordsWeather(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "67ct2f0dc4c74e3fcab1f74do85ff4a4";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}`;
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
