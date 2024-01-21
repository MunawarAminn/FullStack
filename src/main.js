import 'bootstrap/dist/css/bootstrap.min.css';
const apiKey = '4f8721792b31b0909de2a9a1ac11e6ca';

// Fungsi untuk mengambil data cuaca
async function fetchWeather(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Terjadi kesalahan:', error);
        return null;
    }
}

// Fungsi untuk menampilkan data cuaca
function displayWeather(data) {
    const weatherData = {
        cityName: data.name,
        temperature: `Temperature from: ${data.main.temp} °C`,
        windSpeed: `Wind Speed: ${data.wind.speed}`,
        clouds: `Clouds: ${data.clouds.all}%`,
        geoCoordinates: `Geo Coordinates: [${data.coord.lat}, ${data.coord.lon}]`,
        description: data.weather[0].description
    };

    for (const key in weatherData) {
        const element = document.getElementById(key);
        if (element) {
            element.textContent = weatherData[key];
        }
    }

    const weatherIcon = document.getElementById('weatherIcon');
    if (weatherIcon) {
        const iconCode = data.weather[0].icon;
        const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;
        weatherIcon.src = iconUrl;
    }
}


// Mendefinisikan custom element di luar dari event listener
class CuacaInfo extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <div>
                <h2 id="cityName">--</h2>
                <p id="temperature">-- °C</p>
                <p id="description">--</p>
                <img id="weatherIcon" src="" alt="Icon Cuaca">
            </div>
        `;
    }
}

customElements.define('cuaca-info', CuacaInfo);

// Event listener tetap di sini
document.getElementById('searchButton').addEventListener('click', async () => {
    const cityInput = document.getElementById('cityInput');
    const cityName = cityInput.value;

    if (cityName) {
        const weatherData = await fetchWeather(cityName);

        if (weatherData) {
            displayWeather(weatherData);
        } else {
            alert('Kota tidak ditemukan atau terjadi kesalahan.');
        }
    } else {
        alert('Masukkan nama kota terlebih dahulu.');
    }
});
