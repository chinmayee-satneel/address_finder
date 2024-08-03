import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddressAutocomplete.css';

const AddressAutocomplete = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (query.length > 2) {
      const fetchSuggestions = async () => {
        try {
          const response = await axios.get(
            `https://api.addressfinder.io/api/au/address/autocomplete/`, {
              params: {
                key: 'YDTPC6MVRLQ9EUX8FN3J',
                q: query,
                format: 'json',
                source: 'gnaf,paf'
              },
            }
          );
          setSuggestions(response.data.completions);
          console.log(response.data.completions);
        } catch (error) {
          console.error('Error fetching autocomplete suggestions:', error);
        }
      };

      fetchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.full_address);
    setSuggestions([]);
  };

  const handleReset = () => {
    setQuery('');
    setSuggestions([]);
  };

  return (
    <div className="autocomplete-container">
      <h2>Address Finder</h2>
      <div className="input-group" style={{display:"flex", gap:"5px"}}>
        <input
          type="text"
          className="autocomplete-input"
          placeholder="Type an address..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button 
          className="reset-button"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
      {suggestions.length > 0 && (
        <ul className="autocomplete-suggestions">
          {suggestions.map((suggestion) => (
            <li 
              key={suggestion.a} 
              className="suggestion-item"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion.full_address}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AddressAutocomplete;
