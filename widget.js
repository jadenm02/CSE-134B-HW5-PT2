document.addEventListener('DOMContentLoaded', function() {
    const apiUrl = 'https://api.weather.gov/points/32.8801,-117.2340';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const forecastUrl = data.properties.forecast;
            return fetch(forecastUrl);
        })
        .then(response => response.json())
        .then(data => {
            const currentWeather = data.properties.periods[0];
            document.getElementById('temperature').textContent = `Temperature: ${currentWeather.temperature} ${currentWeather.temperatureUnit}`;
            document.getElementById('conditions').textContent = `Conditions: ${currentWeather.shortForecast}`;
            document.getElementById('wind').textContent = `Wind Speed: ${currentWeather.windSpeed}`;
            document.getElementById('humidity').textContent = `Humidity: ${currentWeather.humidity}%`;
            // Set the weather icon src
            // document.getElementById('weather-icon').src = 'path/to/local/icon';
            // document.getElementById('weather-icon').style.display = 'block';
        })
        .catch(error => {
            document.getElementById('weather-content').innerHTML = '<p>Current Weather Conditions Unavailable</p>';
            console.error('Error fetching weather data:', error);
        });
});