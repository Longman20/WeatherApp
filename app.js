let searchTerm = "";

async function getWeather() {
  try {
    const searchTerm = searchBox.value.trim();
    if (!searchTerm) {
      alert("Please enter a search term.");
      return;
    }
    document.getElementById("loading").style.display = "block";
    document.getElementById("weatherDisplay").style.display = "none";
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${searchTerm}?key=SZNZ9QLRBVF9T6BK5FJXUQHAP`,
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const report = await response.json();
    const weatherData = processWeatherData(report);
    displayWeather(weatherData);
    document.getElementById("loading").style.display = "none";
    document.getElementById("weatherDisplay").style.display = "grid";
  } catch (error) {
    console.error("Error fetching weather data:", error);
    document.getElementById("loading").style.display = "none";
  }
}
function processWeatherData(report) {
  return {
    city: report.address,
    time: new Date().toLocaleTimeString(),
    low: report.days[0].tempmin,
    high: report.days[0].tempmax,
    conditions: report.days[0].conditions,
    humidity: report.days[0].humidity,
  };
}
function displayWeather(weatherData) {
  document.getElementById("city-name").textContent =
    weatherData.city.toUpperCase();
  // document.getElementById("weather-time").textContent = weatherData.time;
  document.getElementById("weather-high").innerHTML =
    `<span class="label">High:</span> ${weatherData.high}°F`;
  document.getElementById("weather-low").innerHTML =
    `<span class="label">Low:</span> ${weatherData.low}°F`;
  document.getElementById("weather-conditions").innerHTML =
    `<span class="label">Conditions:</span> ${weatherData.conditions}`;
  document.getElementById("weather-humidity").innerHTML =
    `<span class="label">Humidity:</span> ${weatherData.humidity}`;
  startClock();
}
const searchBtn = document.getElementById("search");
const searchBox = document.getElementById("input");
searchBtn.addEventListener("click", getWeather);
searchBox.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    displayWeather(getWeather());
  }
});
function startClock() {
  setInterval(() => {
    document.getElementById("weather-time").textContent =
      new Date().toLocaleTimeString();
  }, 1000);
}
