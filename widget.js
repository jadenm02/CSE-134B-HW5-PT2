document.addEventListener('DOMContentLoaded', function() {
    const apiUrl = 'https://api.weather.gov/points/32.8801,-117.2340';

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const forecastUrl = data.properties.forecast;
            return fetch(forecastUrl);
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const currentWeather = data.properties.periods[0];
            document.getElementById('temperature').textContent = `Temperature: ${currentWeather.temperature} ${currentWeather.temperatureUnit}`;
            document.getElementById('conditions').textContent = `Conditions: ${currentWeather.shortForecast}`;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            document.getElementById('temperature').textContent = 'Error loading weather data.';
        });
});