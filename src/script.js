//Change Temperature
function showTemperature(response) {
  console.log(response);
  document.querySelector("#search").innerHTML = response.data.name;
  let temperature = document.querySelector(".tempNum");
  temperature.innerHTML = Math.round(response.data.main.temp);
  let realFeel = document.querySelector(".realFeel");
  realFeel.innerHTML = Math.round(response.data.main.feels_like);
  let coordinates = document.getElementById("coordinates");
  coordinates.innerHTML = `Lat: ${response.data.coord.lat}, Lon: ${response.data.coord.lon}`;
  document.getElementById("wind").innerHTML = Math.round(
    response.data.wind.speed * 3.6
  );
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = Math.round(response.data.main.humidity);
  let forecastURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${response.data.coord.lat}&lon=${response.data.coord.lon}&units=metric&exclude=current,minutely,hourly,alerts&appid=${apiKey}`;
  axios.get(forecastURL).then(showForecast);
}
//Five Day forecast, description, and max/min for the day
function showForecast(response) {
  console.log(response.data);
  let maxTemp = document.querySelector(".temp-max");
  maxTemp.innerHTML = Math.round(response.data.daily[0].temp.max);
  let minTemp = document.querySelector(".temp-min");
  minTemp.innerHTML = Math.round(response.data.daily[0].temp.min);
  document.querySelector(".tempNum1").innerHTML = Math.round(
    response.data.daily[1].temp.max
  );
  document.querySelector(".tempNum1-1").innerHTML = Math.round(
    response.data.daily[1].temp.min
  );
  document.querySelector(".tempNum2").innerHTML = Math.round(
    response.data.daily[2].temp.max
  );
  document.querySelector(".tempNum2-2").innerHTML = Math.round(
    response.data.daily[2].temp.min
  );
  document.querySelector(".tempNum3").innerHTML = Math.round(
    response.data.daily[3].temp.max
  );
  document.querySelector(".tempNum3-3").innerHTML = Math.round(
    response.data.daily[3].temp.min
  );
  document.querySelector(".tempNum4").innerHTML = Math.round(
    response.data.daily[4].temp.max
  );
  document.querySelector(".tempNum4-4").innerHTML = Math.round(
    response.data.daily[4].temp.min
  );
  document.querySelector(".tempNum5").innerHTML = Math.round(
    response.data.daily[5].temp.max
  );
  document.querySelector(".tempNum5-5").innerHTML = Math.round(
    response.data.daily[5].temp.min
  );
  document.getElementById("dew").innerHTML = Math.round(
    response.data.daily[0].dew_point
  );

  document.getElementById("weatherDescription").innerHTML =
    response.data.daily[0].weather[0].description;
  document.getElementById("weather-1").innerHTML =
    response.data.daily[1].weather[0].description;
  document.getElementById("weather-2").innerHTML =
    response.data.daily[2].weather[0].description;
  document.getElementById("weather-3").innerHTML =
    response.data.daily[3].weather[0].description;
  document.getElementById("weather-4").innerHTML =
    response.data.daily[4].weather[0].description;
  document.getElementById("weather-5").innerHTML =
    response.data.daily[5].weather[0].description;
  //can add in: wind degree (response.data.daily[0].wind_deg) --> comes back with number, find out how to translate to directions
  //Make an if statement to change weather icon based on what the main idea is (ie. rain, snow, sun, cloudy)
}

//Initial Loadup
let apiKey = "100f8a7c29c0b02275197751bc3ff692";
let city = "Raleigh";
let state = "NC";
let country = "US";
let units = "metric";
let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city},${state},${country}&units=${units}`;
axios.get(`${apiURL}&appid=${apiKey}`).then(showTemperature);

//Change city via button/ form submit
let cityChange = document.querySelector(".changeCity");
cityChange.addEventListener("submit", cityC);

function cityC(event) {
  event.preventDefault();
  let cityInput = document.querySelector(".cityInput").value.trim();
  let stateInput = document.querySelector(".stateInput").value.trim();
  let countryInput = document.querySelector(".countryInput").value.trim();
  let currentCity = document.querySelector("#search");
  if (cityInput.length > 0) {
    let city = `${cityInput},${stateInput},${countryInput}`;
    let apiKey = "100f8a7c29c0b02275197751bc3ff692";
    let units = "metric";
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
    console.log(fetch(apiURL));
    function cityExists(apiURL, callback) {
      fetch(apiURL, { method: "head" }).then(function (status) {
        callback(status.ok);
      });
    }
    cityExists(apiURL, function (exists) {
      if (exists) {
        axios.get(apiURL).then(showTemperature);
      } else {
        alert("😓 Error: could not find city. Please check spelling.");
      }
    });
  }
}
//Change location with current location
function showPosition(position) {
  navigator.geolocation.getCurrentPosition(function (position) {
    let lon = position.coords.longitude;
    let lat = position.coords.latitude;
    let apiKey = "100f8a7c29c0b02275197751bc3ff692";
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    axios.get(apiURL).then(showTemperature);
  });
}

let button = document.querySelector("#currentLocation");
button.addEventListener("click", showPosition);

//Change city via popular city nav
let tokyo = document.querySelector("#Tokyo");
let hk = document.querySelector("#Hong-Kong");
let paris = document.querySelector("#Paris");
let ny = document.querySelector("#NY");
let rome = document.querySelector("#Rome");
tokyo.addEventListener("click", changeTokyo);
hk.addEventListener("click", changeHK);
paris.addEventListener("click", changeParis);
ny.addEventListener("click", changeNY);
rome.addEventListener("click", changeRome);
function changeTokyo() {
  event.preventDefault();
  let tokyoWeather = `https://api.openweathermap.org/data/2.5/weather?q=Tokyo&units=${units}`;
  axios.get(`${tokyoWeather}&appid=${apiKey}`).then(showTemperature);
}
function changeHK() {
  event.preventDefault();
  let hkWeather = `https://api.openweathermap.org/data/2.5/weather?q=Hong Kong&units=${units}`;
  axios.get(`${hkWeather}&appid=${apiKey}`).then(showTemperature);
}
function changeParis() {
  event.preventDefault();
  let parisWeather = `https://api.openweathermap.org/data/2.5/weather?q=Paris&units=${units}`;
  axios.get(`${parisWeather}&appid=${apiKey}`).then(showTemperature);
}
function changeNY() {
  event.preventDefault();
  let nyWeather = `https://api.openweathermap.org/data/2.5/weather?q=New York City&units=${units}`;
  axios.get(`${nyWeather}&appid=${apiKey}`).then(showTemperature);
}
function changeRome() {
  event.preventDefault();
  let romeWeather = `https://api.openweathermap.org/data/2.5/weather?q=Rome&units=${units}`;
  axios.get(`${romeWeather}&appid=${apiKey}`).then(showTemperature);
}

//Change Date

function zeroAdd(m) {
  if (m < 10) {
    m = "0" + m;
  }
  return m;
}

let now = new Date();
let date = now.getDate();
let hour = zeroAdd(now.getHours());
let minutes = zeroAdd(now.getMinutes());
let year = now.getFullYear();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let months = [
  "January",
  "Febuary",
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
let month = months[now.getMonth()];
let todayDate = document.querySelector(".date");

todayDate.innerHTML = `${day} ${month} ${date}, ${year}, ${hour}:${minutes}`;
document.querySelector(".date1").innerHTML = `${days[now.getDay() + 1]}`;
document.querySelector(".date2").innerHTML = `${days[now.getDay() + 2]}`;
document.querySelector(".date3").innerHTML = `${days[now.getDay() + 3]}`;
document.querySelector(".date4").innerHTML = `${days[now.getDay() + 4]}`;
document.querySelector(".date5").innerHTML = `${days[now.getDay() + 5]}`;

//Change background based on time
let hourDay = new Date();
let hourColor = hourDay.getHours();

//early morning
if (hourColor >= 5 && hourColor < 8) {
  document.body.style.backgroundImage =
    "linear-gradient(200deg, #fbc2eb 0%, #a6c1ee 100%)";
  document.getElementById("citySubmit").style.background = "#ace0f9";
  document.getElementById("citySubmit").style.color = "#000000";
  document.getElementById("citySubmit").onmouseover = function () {
    this.style.backgroundColor = "#a6c1ee";
  };
  document.getElementById("citySubmit").onmouseout = function () {
    this.style.backgroundColor = "#ace0f9";
  };
  document.getElementById("currentLocation").style.background = "#fbc2eb";
  document.getElementById("currentLocation").onmouseover = function () {
    this.style.backgroundColor = "#a9c3f6";
  };
  document.getElementById("currentLocation").onmouseout = function () {
    this.style.backgroundColor = "#fbc2eb";
  };
  document.getElementById("currentLocation").style.color = "#000000";
}
//mid morning
if (hourColor >= 8 && hourColor < 12) {
  document.body.style.backgroundImage =
    "linear-gradient(315deg, #ffcfdf 0%, #b0f3f1 74%)";
  document.getElementById("citySubmit").style.background = "#ffcfdf";
  document.getElementById("citySubmit").style.color = "#000000";
  document.getElementById("citySubmit").onmouseover = function () {
    this.style.backgroundColor = "#b0f3f1";
  };
  document.getElementById("citySubmit").onmouseout = function () {
    this.style.backgroundColor = "#ffcfdf";
  };
  document.getElementById("currentLocation").style.background = "#b0f3f1";
  document.getElementById("currentLocation").onmouseover = function () {
    this.style.backgroundColor = "#ffcfdf";
  };
  document.getElementById("currentLocation").onmouseout = function () {
    this.style.backgroundColor = "#b0f8f1";
  };
  document.getElementById("currentLocation").style.color = "#000000";
}
//afternoon
if (hourColor >= 12 && hourColor < 17) {
  document.body.style.backgroundImage =
    "linear-gradient(319deg, #dbf26e 0%, #61fa74 37%, #1cfdd6 100%)";
  document.getElementById("citySubmit").style.background = "#61fa74";
  document.getElementById("citySubmit").style.color = "#000000";
  document.getElementById("citySubmit").onmouseover = function () {
    this.style.backgroundColor = "#1cfdd6";
  };
  document.getElementById("citySubmit").onmouseout = function () {
    this.style.backgroundColor = "#61fa74";
  };
  document.getElementById("currentLocation").style.background = "#1ce8d6";
  document.getElementById("currentLocation").onmouseover = function () {
    this.style.backgroundColor = "#61fa74";
  };
  document.getElementById("currentLocation").onmouseout = function () {
    this.style.backgroundColor = "#1ceed6";
  };
}
//early evening
if (hourColor >= 17 && hourColor < 21) {
  document.body.style.backgroundImage =
    "linear-gradient(320deg, #1a2a6c, #b21f1f, #fdbb2d)";
  document.getElementById("citySubmit").style.background = "#1a2a6c";
  document.getElementById("citySubmit").style.color = "#FFFFFF";
  document.getElementById("citySubmit").onmouseover = function () {
    this.style.backgroundColor = "#b21f1f";
  };
  document.getElementById("citySubmit").onmouseout = function () {
    this.style.backgroundColor = "#1a2a6c";
  };
  document.getElementById("currentLocation").style.background = "#fdbb2d";
  document.getElementById("currentLocation").onmouseover = function () {
    this.style.backgroundColor = "#b21f1f";
  };
  document.getElementById("currentLocation").onmouseout = function () {
    this.style.backgroundColor = "#fdbb2d";
  };
}
//late evening
if (hourColor >= 21 || hourColor < 5) {
  document.body.style.backgroundImage =
    "linear-gradient(320deg, #855988, #6B4984, #483475, #2B2F77, #141852, #070B34)";
  document.getElementById("citySubmit").style.background = "#483475";
  document.getElementById("citySubmit").onmouseover = function () {
    this.style.backgroundColor = "#070B34";
  };
  document.getElementById("citySubmit").onmouseout = function () {
    this.style.backgroundColor = "#483475";
  };
  document.getElementById("citySubmit").style.color = "rgb(219, 211, 230)";
  document.getElementById("currentLocation").style.background = "#483475";
  document.getElementById("currentLocation").onmouseover = function () {
    this.style.backgroundColor = "#070B34";
  };
  document.getElementById("currentLocation").onmouseout = function () {
    this.style.backgroundColor = "#483475";
  };
}

//Change units via switch
let unitSwitch = document.querySelector("input[name=switchUnits]");
unitSwitch.addEventListener("change", switchUnits);
function switchUnits() {
  let cF = Array.prototype.slice.call(document.querySelectorAll("span.unit"));
  let km = document.querySelector(".unit1");
  let kmNum = document.querySelector(".unit-1");
  let cFNum = Array.prototype.slice.call(document.querySelectorAll(".unit-0"));
  if (unitSwitch.checked) {
    km.innerHTML = "mph";
    kmNum.innerHTML = Math.round(kmNum.innerHTML * 0.621371);
    cF.forEach((element) => {
      element.innerHTML = "°F";
    });
    cFNum.forEach((element) => {
      element.innerHTML = Math.round(element.innerHTML * (9 / 5) + 32);
    });
  } else {
    km.innerHTML = "km/h";
    kmNum.innerHTML = Math.round(kmNum.innerHTML * 1.60934);
    cF.forEach((element) => {
      element.innerHTML = "°C";
    });
    cFNum.forEach((element) => {
      element.innerHTML = Math.round((element.innerHTML - 32) * (5 / 9));
    });
  }
}

//burger transition