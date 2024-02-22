const apiKey = "45937d564a1647d3e0bfca2168f50877";

const weatherDataElement = document.getElementById("weather-data");

const cityInputElement = document.getElementById("city-input");

const formEl = document.querySelector("form");

formEl.addEventListener(
    "submit", (event) => {
        event.preventDefault();
        const cityValue = cityInputElement.value; 
        getWheatherData(cityValue);
    }  
);

async function getWheatherData(cityValue) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`)

        if (!response.ok) {
            throw new Error("Network response was not ok")
        }

        const data = await response.json();

        console.log(data);

        const temperature = Math.round(data.main.temp);
        
        const description = data.weather[0].description;

        const icon = data.weather[0].icon;

        const details = [
            `Feels like: ${Math.round(data.main.feels_like)}°C`,
            `Humidity: ${data.main.humidity}%`,
            `Wind speed: ${data.wind.speed} m/s`
        ];

        weatherDataElement.querySelector(
            ".icon"
            ).innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather icon">`;

        weatherDataElement.querySelector(
            ".temprature"
            ).textContent = `${temperature}°C`;

        weatherDataElement.querySelector(
            ".description"
            ).textContent = description;

        weatherDataElement.querySelector(".details").innerHTML = details.map((detail)=>
        `<div>${detail}</div>`
        ).join("");

    } catch (error){
        weatherDataElement.querySelector(
            ".icon"
            ).innerHTML = "";

        weatherDataElement.querySelector(
            ".temprature"
            ).textContent = "";

        weatherDataElement.querySelector(
            ".description"
            ).textContent = "An error has occured, either you are dumb as fuck and dont know city's, or fix your network.";

        weatherDataElement.querySelector(".details").innerHTML = "";
    }
}
















































