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
            document.getElementById('temperature').textContent = `${currentWeather.temperature} ${currentWeather.temperatureUnit}`;
            document.getElementById('conditions').textContent = currentWeather.shortForecast;
            document.getElementById('weather-icon').src = currentWeather.icon;
            document.getElementById('weather-icon').style.display = 'inline';
        })
        .catch(error => {
            document.getElementById('weather-content').innerHTML = '<p>Current Weather Conditions Unavailable</p>';
            console.error('Error fetching weather data:', error);
        });
});