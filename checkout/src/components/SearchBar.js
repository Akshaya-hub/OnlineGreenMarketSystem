import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SearchBar = () => {
  const [data, setData] = useState([]);  // Store fetched product data
  const [query, setQuery] = useState('');  // Store the user's search query
  const [results, setResults] = useState([]);  // Store search results
  const [showResults, setShowResults] = useState(false);  // Control visibility of results

  // Fetch product data on component mount
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/products');
        setData(response.data);  // Ensure we set the entire product array
      } catch (err) {
        console.error(err);
      }
    };
    fetchItems();
  }, []);

  // Handle search based on user input
  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() !== '') {
      // Filter data based on the query and match with product names
      const filteredResults = data.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setResults(filteredResults);  // Update search results
      setShowResults(true);  // Show results if there is a query
    } else {
      setResults([]);  
      setShowResults(false);  
    }
  };

  // Hides results after blur without clearing the input field
  const handleBlur = () => {
    setTimeout(() => {
      setShowResults(false);
    }, 100);  // Slight delay to ensure any click in the results is registered
  };

  // Show results on focus if there are results
  const handleFocus = () => {
    if (results.length > 0) {
      setShowResults(true);
    }
  };

  // Handle click on a suggestion to set the clicked item's name in the input field
  const handleSuggestionClick = (name) => {
    setQuery(name);  // Update the input field with the selected name
    setShowResults(false);  // Hide the results after clicking
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={query}
        onChange={handleSearch} 
        placeholder="Search products..."
        onFocus={handleFocus}  
        onBlur={handleBlur}  
      />
      {showResults && results.length > 0 && (
        <ul className="search-results">
          {results.map((item) => (
            <li 
              className="list" 
              key={item._id}
              onMouseDown={() => handleSuggestionClick(item.name)}  // Add click handler here
            >
              <Link to={`/product/${item._id}`} className="list-product">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
