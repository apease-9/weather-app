alert(
  "To see weather in other cities, simply click the menu icon to change to your desired city, or choose one of the popular cities provided. Thank you for using this app."
);

//////////////////////////Change Temperature///////////////////////////////////////
function showTemperature(response) {
  console.log(response);
  document.querySelector("#search").innerHTML = response.data.name;
  let temperature = document.querySelector(".tempNum");
  temperature.innerHTML = Math.round(response.data.main.temp);
  let realFeel = document.querySelector(".realFeel");
  realFeel.innerHTML = Math.round(response.data.main.feels_like);

  //coordinates
  let coordinates = document.getElementById("coordinates");
  coordinates.innerHTML = `Lat: ${response.data.coord.lat}, Lon: ${response.data.coord.lon}`;

  //Converting wind degrees to direction
  document.getElementById("wind").innerHTML = Math.round(
    response.data.wind.speed * 3.6
  );
  let degrees = response.data.wind.deg;
  let windDegree = document.querySelector(".windDe");
  if (degrees >= 348.75 || degrees <= 11.25) {
    windDegree.innerHTML = "N";
  } else if (degrees >= 11.25 && degrees <= 33.75) {
    windDegree.innerHTML = "NNE";
  } else if (degrees >= 33.75 && degrees <= 56.25) {
    windDegree.innerHTML = "NE";
  } else if (degrees >= 56.25 && degrees <= 78.75) {
    windDegree.innerHTML = "ENE";
  } else if (degrees >= 78.75 && degrees <= 101.25) {
    windDegree.innerHTML = "E";
  } else if (degrees >= 101.25 && degrees <= 123.75) {
    windDegree.innerHTML = "ESE";
  } else if (degrees >= 123.75 && degrees <= 146.25) {
    windDegree.innerHTML = "SE";
  } else if (degrees >= 146.25 && degrees <= 168.75) {
    windDegree.innerHTML = "SSE";
  } else if (degrees >= 168.75 && degrees <= 191.25) {
    windDegree.innerHTML = "S";
  } else if (degrees >= 191.25 && degrees <= 213.75) {
    windDegree.innerHTML = "SSW";
  } else if (degrees >= 213.75 && degrees <= 236.25) {
    windDegree.innerHTML = "SW";
  } else if (degrees >= 236.25 && degrees <= 258.75) {
    windDegree.innerHTML = "WSW";
  } else if (degrees >= 258.75 && degrees <= 281.25) {
    windDegree.innerHTML = "W";
  } else if (degrees >= 281.25 && degrees <= 303.75) {
    windDegree.innerHTML = "WNW";
  } else if (degrees >= 303.75 && degrees <= 326.25) {
    windDegree.innerHTML = "NW";
  } else if (degrees >= 326.25 && degrees <= 348.75) {
    windDegree.innerHTML = "NNW";
  }

  //humidity
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = Math.round(response.data.main.humidity);

  //forecast (goes to function showForecast)
  let forecastURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${response.data.coord.lat}&lon=${response.data.coord.lon}&units=metric&exclude=current,minutely,hourly,alerts&appid=${apiKey}`;
  axios.get(forecastURL).then(showForecast);
  //current weather
  document.getElementById("weatherDescription").innerHTML =
    response.data.weather[0].description;
  let num = response.data.weather[0].id;
  let main = document.querySelector(".main-img");
  let style = document.querySelector(".img-style");
  let ani = document.querySelector(".img-ani");
  let child = document.querySelectorAll(".img-ani-child");
  let child_bolt = document.querySelector(".img-ani-child");
  if (num > 200 && num < 300) {
    main.classList.add("thunder_storm");
    style.classList.add("cloud");
    style.classList.add("cloud_style_1");
    ani.classList.add("thunder");
    child_bolt.classList.add("bolt");
    main.classList.remove("rainy", "snowing", "foggy", "cloudy", "sunny");
    style.classList.remove("mist", "sun");
    style.classList.remove("mist_style_1", "cloud_style_2", "sun_style_1");
    ani.classList.remove("rain", "snow", "fog", "cloudy", "shine");
    for (let i = 0; i < child.length; i++) {
      child[i].classList.remove("drop", "fall", "misty", "cloud-y", "ray");
    }
  }
  if ((num > 300 && num < 400) || (num > 500 && num < 600)) {
    main.classList.add("rainy");
    style.classList.add("cloud");
    style.classList.add("cloud_style_1");
    ani.classList.add("rain");
    for (let i = 0; i < child.length; i++) {
      child[i].classList.add("drop");
    }
    main.classList.remove(
      "thunder_storm",
      "snowing",
      "foggy",
      "cloudy",
      "sunny"
    );
    style.classList.remove("mist", "sun");
    style.classList.remove("mist_style_1", "cloud_style_2", "sun_style_1");
    ani.classList.remove("thunder", "snow", "fog", "cloudy", "shine");
    for (let i = 0; i < child.length; i++) {
      child[i].classList.remove("bolt", "fall", "misty", "cloud-y", "ray");
    }
  }
  if (num > 600 && num < 700) {
    main.classList.add("snowing");
    style.classList.add("cloud");
    style.classList.add("cloud_style_1");
    ani.classList.add("snow");
    for (let i = 0; i < child.length; i++) {
      child[i].classList.add("fall");
    }
    main.classList.remove("rainy", "thunder_storm", "foggy", "cloudy", "sunny");
    style.classList.remove("mist", "sun");
    style.classList.remove("mist_style_1", "cloud_style_2", "sun_style_1");
    ani.classList.remove("rain", "thunder", "fog", "cloudy", "shine");
    for (let i = 0; i < child.length; i++) {
      child[i].classList.remove("drop", "bolt", "misty", "cloud-y", "ray");
    }
  }
  if (num > 700 && num < 800) {
    main.classList.add("foggy");
    style.classList.add("mist");
    style.classList.add("mist_style_1");
    ani.classList.add("fog");
    for (let i = 0; i < child.length; i++) {
      child[i].classList.add("misty");
    }
    main.classList.remove(
      "rainy",
      "thunder_storm",
      "snowing",
      "cloudy",
      "sunny"
    );
    style.classList.remove("cloud", "sun");
    style.classList.remove("cloud_style_1", "cloud_style_2", "sun_style_1");
    ani.classList.remove("rain", "thunder", "snow", "cloudy", "shine");
    for (let i = 0; i < child.length; i++) {
      child[i].classList.remove("drop", "bolt", "fall", "cloud-y", "ray");
    }
  }
  if (num > 800 && num < 900) {
    main.classList.add("cloudy");
    style.classList.add("cloud");
    style.classList.add("cloud_style_2");
    ani.classList.add("cloudy");
    for (let i = 0; i < child.length; i++) {
      child[i].classList.add("cloud-y");
    }
    main.classList.remove(
      "rainy",
      "thunder_storm",
      "snowing",
      "foggy",
      "sunny"
    );
    style.classList.remove("mist", "sun");
    style.classList.remove("cloud_style_1", "mist_style_1", "sun_style_1");
    ani.classList.remove("rain", "thunder", "snow", "fog", "shine");
    for (let i = 0; i < child.length; i++) {
      child[i].classList.remove("drop", "bolt", "fall", "misty", "ray");
    }
  }
  if (num === 800) {
    main.classList.add("sunny");
    style.classList.add("sun");
    style.classList.add("sun_style_1");
    ani.classList.add("shine");
    for (let i = 0; i < child.length; i++) {
      child[i].classList.add("ray");
    }
    main.classList.remove(
      "rainy",
      "thunder_storm",
      "snowing",
      "foggy",
      "cloudy"
    );
    style.classList.remove("mist", "cloud");
    style.classList.remove("cloud_style_1", "mist_style_1", "cloud_style_2");
    ani.classList.remove("rain", "thunder", "snow", "fog", "cloudy");
    for (let i = 0; i < child.length; i++) {
      child[i].classList.remove("drop", "bolt", "fall", "misty", "cloud-y");
    }
  } else {
    console.log("Error at change icon");
  }
}
////////////////////Five Day forecast, description, and max/min for the day////////////////////////
function showForecast(response) {
  console.log(response.data);
  //Max and Min for the day
  let maxTemp = document.querySelector(".temp-max");
  maxTemp.innerHTML = Math.round(response.data.daily[0].temp.max);
  let minTemp = document.querySelector(".temp-min");
  minTemp.innerHTML = Math.round(response.data.daily[0].temp.min);
  document.querySelector(".tempNum1").innerHTML = Math.round(
    response.data.daily[1].temp.max
  );

  //Mac and min forcast
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
  //Dew Point
  document.getElementById("dew").innerHTML = Math.round(
    response.data.daily[0].dew_point
  );

  //Weather Descriptions
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

  //Make an if statement to change weather icon based on what the main idea is (ie. rain, snow, sun, cloudy)
  let num1 = response.data.daily[1].weather[0].icon;
  console.log(num1);
  let img1 = document.querySelector(".img1");
  img1.src = `http://openweathermap.org/img/wn/${num1}@2x.png`;

  let num2 = response.data.daily[2].weather[0].icon;
  console.log(num2);
  let img2 = document.querySelector(".img2");
  img2.src = `http://openweathermap.org/img/wn/${num2}@2x.png`;

  let num3 = response.data.daily[3].weather[0].icon;
  console.log(num3);
  let img3 = document.querySelector(".img3");
  img3.src = `http://openweathermap.org/img/wn/${num3}@2x.png`;

  let num4 = response.data.daily[4].weather[0].icon;
  console.log(num4);
  let img4 = document.querySelector(".img4");
  img4.src = `http://openweathermap.org/img/wn/${num4}@2x.png`;

  let num5 = response.data.daily[5].weather[0].icon;
  console.log(num5);
  let img5 = document.querySelector(".img5");
  img5.src = `http://openweathermap.org/img/wn/${num5}@2x.png`;
}

////////////////////////////////////Initial Loadup/////////////////////////////////////////////
let apiKey = "100f8a7c29c0b02275197751bc3ff692";
let city = "Raleigh";
let state = "NC";
let country = "US";
let units = "metric";
let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city},${state},${country}&units=${units}`;
axios.get(`${apiURL}&appid=${apiKey}`).then(showTemperature);

////////////////////////Change city via button/ form submit////////////////////////////
let cityChange = document.querySelector(".changeCity");
cityChange.addEventListener("submit", cityC);

function cityC(event) {
  event.preventDefault();
  let cityInput = document.querySelector(".cityInput").value.trim();
  let stateInput = document.querySelector(".stateInput").value.trim();
  let countryInput = document.querySelector(".countryInput").value.trim();

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
///////////////////////Change location with current location/////////////////////////
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

////////////////////Change city via popular city nav////////////////////////
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
  let parisWeather = `https://api.openweathermap.org/data/2.5/weather?q=Paris,,FR&units=${units}`;
  axios.get(`${parisWeather}&appid=${apiKey}`).then(showTemperature);
}
function changeNY() {
  event.preventDefault();
  let nyWeather = `https://api.openweathermap.org/data/2.5/weather?q=New York City&units=${units}`;
  axios.get(`${nyWeather}&appid=${apiKey}`).then(showTemperature);
}
function changeRome() {
  event.preventDefault();
  let romeWeather = `https://api.openweathermap.org/data/2.5/weather?q=rome,,italy&units=${units}`;
  axios.get(`${romeWeather}&appid=${apiKey}`).then(showTemperature);
}

//////////////////////////////////Change Date/////////////////////////////////////

function GetTime() {
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

  let dateFormat = `${day} ${month} ${date}, ${year}, ${hour}:${minutes}`;
  todayDate.innerHTML = dateFormat;
  document.querySelector(".date1").innerHTML = `${days[now.getDay() + 1]}`;
  document.querySelector(".date2").innerHTML = `${days[now.getDay() + 2]}`;
  document.querySelector(".date3").innerHTML = `${days[now.getDay() + 3]}`;
  document.querySelector(".date4").innerHTML = `${days[now.getDay() + 4]}`;
  document.querySelector(".date5").innerHTML = `${days[now.getDay() + 5]}`;

  setTimeout(GetTime, 1000);
}
GetTime();

/////////////////////Change background based on time/////////////////////
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

///////////////////Change units via switch//////////////////////////////////
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

/////////////////////////popout the burger////////////////////////////////////////
function toggleBurger() {
  let list = document.querySelector(".header-stuff");
  if (burger.classList.contains("pop")) {
    burger.classList.remove("pop");
    burger.classList.add("shrink");
    list.animate(
      [
        //keyframes
        { transform: "translateX(0)" },
        { transform: "translateX(100%)" },
      ],
      {
        duration: 1000,
        easing: "cubic-bezier(0.42, 0, 0.58, 1)",
      }
    );
    list.style.transform = "translateX(100%)";
  } else {
    burger.classList.add("pop");
    burger.classList.remove("shrink");
    list.animate(
      [
        //keyframes
        { transform: "translateX(100%)" },
        { transform: "translateX(0)" },
      ],
      {
        duration: 1000,
        easing: "cubic-bezier(0.42, 0, 0.58, 1)",
      }
    );
    list.style.transform = "translateX(0)";
  }
}

let burger = document.querySelector(".burger");
burger.addEventListener("click", toggleBurger);
