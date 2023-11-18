// Search.js
import React, { useState } from 'react';
import './Search.css';

const Search = ({ onSearch }) => {
  const [location, setLocation] = useState('');

  const handleSearch = () => {
    // Call the onSearch prop with the entered location
    onSearch(location);
  };

  return (
    <div className="util-search-container">
      <input
        type="text"
        className="util-search-input"
        placeholder="Enter location..."
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button className="util-search-button" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default Search;
