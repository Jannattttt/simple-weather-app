const apiKey = "xxx";

const searchInput = document.querySelector("#searchInput");
const searchButton = document.querySelector("#searchButton");
const cityValue = document.querySelector("#cityValue");
const weatherDegree = document.querySelector("#weatherDegree");
const humidity = document.querySelector("#humidity");
const windSpeed = document.querySelector("#windSpeed");
const weatherIcon = document.querySelector("#weatherIcon");
const errorMessage = document.querySelector("#errorMessage");

searchButton.addEventListener("click", (e) => {
    e.preventDefault();
    searchWeather();
});

searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        searchWeather();
    }
});

function searchWeather() {

    errorMessage.textContent = "";

    searchInput.value = searchInput.value.trim();

    const city = searchInput.value;

    if (searchInput.value === ""){
        return displayError("Please enter a city");
    }
    
    searchInput.value = "";

    getWeatherData(city);
}

async function getWeatherData(city){

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${encodeURIComponent(city)}`;

        try {
            const response = await fetch (apiUrl + `&appid=${apiKey}`);

            if (!response.ok) {
                throw new Error("City not found");
            }

            const data = await response.json();

            console.log (data);

            weatherDegree.textContent = Math.round(data.main.temp) + "°C";
            cityValue.textContent = data.name;
            humidity.textContent = data.main.humidity + "%";
            windSpeed.textContent = data.wind.speed + " m/s"; 

            if (data.weather[0].main == "Clouds"){
                weatherIcon.src = "images/clouds.png"
            } else if (data.weather[0].main == "Clear"){
                weatherIcon.src = "images/clear.png"
            } else if (data.weather[0].main == "Drizzle"){
                weatherIcon.src = "images/drizzle.png"
            } else if (data.weather[0].main == "Mist"){
                weatherIcon.src = "images/mist.png"
            } else if (data.weather[0].main == "Rain"){
                weatherIcon.src = "images/rain.png"
            } else if (data.weather[0].main == "Snow"){
                weatherIcon.src = "images/snow.png"
            } else {
                weatherIcon.src = "images/clouds.png";
            }
        }
        catch(error){
            displayError("Enter a valid city");
        }

    }

function displayError(message){
        errorMessage.textContent = message;
        errorMessage.classList.add("errorMessage");
    }

