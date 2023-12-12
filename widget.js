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
            // Optionally set the src of an img tag to show an icon
            // document.getElementById('weather-icon').src = currentWeather.icon;
            // document.getElementById('weather-icon').style.display = 'block';
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
});