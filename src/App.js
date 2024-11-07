import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import SearchComponent from './components/SearchComponent';
import WeatherDisplayComponent from './components/WeatherDisplayComponent';
import FavoriteComponent from './components/FavoriteComponent';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);

  const fetchWeatherData = async (city) => {
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    try {
      const currentWeatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      setWeatherData(currentWeatherResponse.data);

      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
      );
      setForecastData(forecastResponse.data);

      // Save to favorites (optional)
      await axios.post('http://localhost:5000/favorites', { name: city });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <SearchComponent onSearch={fetchWeatherData} />
      <WeatherDisplayComponent weatherData={weatherData} forecastData={forecastData} />
      <FavoriteComponent onSelectFavorite={fetchWeatherData} />
    </div>
  );
};

export default App;
