import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Style/FavoriteComponent.css';

const FavoriteComponent = ({ onSelectFavorite, searchedCity }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchFavorites();
  }, []);

  useEffect(() => {
    if (searchedCity) {
      addCityToFavorites(searchedCity);
    }
  }, [searchedCity]);

  const fetchFavorites = async () => {
    try {
      const response = await axios.get('http://localhost:5000/favorites');
      setFavorites(response.data);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  const addCityToFavorites = async (cityName) => {
    if (!favorites.find((city) => city.name.toLowerCase() === cityName.toLowerCase())) {
      try {
        await axios.post('http://localhost:5000/favorites', { name: cityName });
        fetchFavorites();
      } catch (error) {
        console.error('Error adding city to favorites:', error);
      }
    }
  };

  const removeFavorite = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/favorites/${id}`);
      fetchFavorites();
    } catch (error) {
      console.error('Error removing city:', error);
    }
  };

  return (
    <div className="favorites-container">
      <h3>Favorite Cities</h3>
      <ul className="favorites-list">
        {favorites.map((city) => (
          <li key={city.id} className="favorite-item">
            <span className="city-name">{city.name}</span>
            <div className="button-group">
              <button className="show-button" onClick={() => onSelectFavorite(city.name)}>Show Weather</button>
              <button className="remove-button" onClick={() => removeFavorite(city.id)}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoriteComponent;
