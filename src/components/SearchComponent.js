import React, { useState } from 'react';
import './Style/SearchComponent.css';

const SearchComponent = ({ onSearch }) => {
  const [city, setCity] = useState('');

  const handleSearch = () => {
    if (city) {
      onSearch(city);
      setCity('');
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
      />
      <button className="search-button" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default SearchComponent;
