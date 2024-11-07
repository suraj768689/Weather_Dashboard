import React from 'react';
import './Style/WeatherDisplayComponent.css';

const WeatherDisplayComponent = ({ weatherData, forecastData }) => {
  if (!weatherData) return <div className="message">Search for a city to display weather.</div>;

  // Check if forecastData is available before trying to use it
  if (!forecastData || !forecastData.list) {
    return <div className="message">Loading forecast data...</div>;
  }

  // Function to format the time to show in a readable format (e.g., 3:00 PM)
  const formatTime = (time) => { 
    const date = new Date(time * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Group forecast data by date with a safe check
  const getForecastByDate = (forecastData) => {
    const forecastByDate = {};

    forecastData.list.forEach((item) => {
      const date = new Date(item.dt * 1000).toDateString();
      if (!forecastByDate[date]) {
        forecastByDate[date] = [];
      }
      forecastByDate[date].push(item);
    });

    return forecastByDate;
  };

  // Group the forecast data by date
  const forecastByDate = getForecastByDate(forecastData);

  // Function to map weather description codes to user-friendly names
  const mapWeatherDescription = (description) => {
    const descriptions = {
      clear: 'Clear',
      cloudy: 'Cloudy',
      "partly cloudy": 'Partly Cloudy',
      rain: 'Shower',
      snow: 'Snowy',
      thunderstorm: 'Thunderstorm',
      drizzle: 'Light Rain',
      mist: 'Misty',
      fog: 'Foggy',
    };

    return descriptions[description.toLowerCase()] || description;
  };

  return (
    <div className="weather-container">
      <div className="current-weather-card">
        <h2>Current Weather in {weatherData.name}</h2>
        <div className="weather-details">
          <p className="temp">{weatherData.main.temp}°C</p>
          <p className="condition">
            {mapWeatherDescription(weatherData.weather[0].description)}
          </p>
          <p className="humidity">Humidity: {weatherData.main.humidity}%</p>
          <p className="time">Time: {new Date(weatherData.dt * 1000).toLocaleTimeString()}</p>
          <p className="day-night">
            <span>{new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()} (Day)</span> |
            <span>{new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()} (Night)</span>
          </p>
        </div>
      </div>

      <div className="forecast-container">
        <h3>5-Day Forecast</h3>
        <div className="forecast-cards">
          {Object.keys(forecastByDate).length > 0 ? (
            Object.keys(forecastByDate).map((date, index) => (
              <div className="forecast-card" key={index}>
                <h4>{date}</h4>
                <div className="forecast-details">
                  {forecastByDate[date].map((item, index) => (
                    <div className="forecast-item" key={index}>
                      <p className="forecast-time">{formatTime(item.dt)}</p>
                      <p className="forecast-temp">Temp: {item.main.temp}°C</p>
                      <p className="forecast-humidity">Humidity: {item.main.humidity}%</p>
                      <p className="forecast-condition">
                        {mapWeatherDescription(item.weather[0].description)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className="message">No forecast data available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplayComponent;
