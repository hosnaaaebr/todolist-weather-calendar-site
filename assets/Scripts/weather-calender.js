const urlWeather =
  "https://api.dastyar.io/express/weather?lat=35.67194277&lng=51.42434403&lang=fa&theme=light";
const urlCalender = "https://api.dastyar.io/express/clock/current";
const timeUrl = `https://kaaryar0506reactblog.liara.run/current/time`;
const weatherData = document.querySelector("#weather-data");
const currentWeather = document.querySelector(".current-weather");
const temperature = document.querySelector(".temperature-box");
const minTem = document.querySelector(".min-tem");
const maxTem = document.querySelector(".max-tem");
const iconWeather = document.querySelector(".icon-box");
const humorousText = document.querySelector(".humorous-text");
const imgBaseUrl = "../project1/assets/Images/";
const img = document.querySelector(".icon-weather");
img.src = "../project1/assets/Images/clouds.png";
const weatherImages = {
  Clear: "clear.png",
  Haze: "haze.png",
  Clouds: "clouds.png",
  Snow: "snow.png",
  Rain: "rainfall.png",
};
const currentClock = document.querySelector(".current-time");
console.log(currentClock);
const currentDayOfIran = document.querySelector(".current-day");
// ********
const gregorianCalendar = document.querySelector(".Gregorian-calendar");
const islamicCalendar = document.querySelector(".Islamic-calendar");
// get current weather from api and pic
const getWeatherInfo = async function () {
  const res = await fetch(urlWeather);
  const weather = await res.json();
  const weatherCondition = weather[0].weather.main;
  const imgPath = `${imgBaseUrl}${
    weatherImages[weatherCondition] || "clear.png"
  }`;
  console.log(imgPath);
  img.src = imgPath;
  humorousText.innerHTML = `<p>${weather[0].customDescription.text}</p> <p>${weather[0].customDescription.emoji}</p>`;
  minTem.innerHTML = " حداقل " + `<span>${weather[0].min}</span>`;
  maxTem.innerHTML = " حداکثر " + `<span>${weather[0].max}</span>`;
  const temperatureNum = Number(weather[0].current).toLocaleString("fa");
  const temperatureContent = `<p>${temperatureNum}°</p>`;
  temperature.innerHTML = temperatureContent;
};

const time = function (num) {
  const date = new Date(num);
  const tehranTime = new Intl.DateTimeFormat("fa-IR", {
    hour: "numeric",
    minute: "numeric",
  }).format(date);

  return tehranTime;
};
// get current times

const getCalender = async function () {
  const res = await fetch(timeUrl);
  const currentTime = await res.json();
  const formattedTime = time(currentTime.current);
  currentClock.innerHTML = `<span class='tiiimmme'>${formattedTime}</span>`;
  return currentClock.innerHTML;
};

getCalender();

setInterval(async function () {
  return await getCalender();
}, 1000);

// get current day
const day = async function () {
  const today = new Date().toLocaleDateString("fa", {
    day: "numeric",
    month: "long",
  });
  currentDayOfIran.innerHTML = `${today}`;
};

const gregorian = async function () {
  const res = await fetch(timeUrl);
  const currentTime = await res.json();
  const gregorianYear = currentTime.miladi.year;
  const year = Number(gregorianYear).toLocaleString("fa");
  const gregorianDay = currentTime.miladi.dayInMonth;
  const day = Number(gregorianDay).toLocaleString("fa");
  gregorianCalendar.innerHTML = `${day}/${currentTime.miladi.month.slice(
    0,
    3
  )}/${year}`;
  console.log(year);
};

const islamic = async function () {
  const res = await fetch(timeUrl);
  const currentTime = await res.json();
  const islamicYear = currentTime.islamicHijri.year.slice(0, 4);
  const year = Number(islamicYear).toLocaleString("fa");
  const yearOf = year.replace(/\,/g, "");
  console.log(yearOf);
  const islamicDay = currentTime.islamicHijri.dayInMonth;
  const day = Number(islamicDay).toLocaleString("fa");

  islamicCalendar.innerHTML = `${day}/${currentTime.islamicHijri.month}/${yearOf}`;
};

getWeatherInfo();
getCalender();
day();
gregorian();
islamic();
