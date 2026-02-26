import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import './Header.css';

function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const searchInputRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Search function using API
  const performSearch = async (query) => {
    if (!query || query.trim().length < 2) {
      setSearchResults([]);
      setShowSuggestions(false);
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await api.searchSuggestions(query.trim());
      if (response.success && response.data && response.data.items) {
        const results = response.data.items.map(item => ({
          id: item.id,
          title: item.title,
          type: item.type,
          url: item.type === 'series' ? `/series/${item.id}/` : `/movies/${item.id}/`,
        }));
        setSearchResults(results);
        setShowSuggestions(results.length > 0);
      } else {
        setSearchResults([]);
        setShowSuggestions(false);
      }
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
      setShowSuggestions(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      performSearch(searchQuery);
    }, 300); // Debounce search

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleInputFocus = () => {
    if (searchResults.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  const handleResultClick = (url) => {
    navigate(url);
    setShowSuggestions(false);
  };

  const handleMoreResults = () => {
    if (!searchQuery.trim()) return;
    navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    setShowSuggestions(false);
  };

  // Position dropdown dynamically
  useEffect(() => {
    if (showSuggestions && suggestionsRef.current && searchInputRef.current) {
      const inputRect = searchInputRef.current.getBoundingClientRect();
      const dropdown = suggestionsRef.current;
      
      // Use absolute positioning relative to the form
      dropdown.style.top = `${inputRect.height + 8}px`;
      dropdown.style.left = '0';
      dropdown.style.width = `${inputRect.width}px`;
      dropdown.classList.add('positioned');
    }
  }, [showSuggestions, searchResults]);

  return (
    <>
      <div className="bd header-search-wrapper">
        <div className="home-search shwc">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', position: 'relative' }}>
            <div style={{ flexGrow: 1, textAlign: 'center' }}>
              <figure className="logo tac" style={{ display: 'inline-block' }}>
                <img src="/images/AWI-SiteTitle-1.png" alt="Anime World India" />
              </figure>
            </div>
          </div>
          <div className="search-container">
            <form
              id="form-shs"
              className="search full"
              onSubmit={handleSubmit}
            >
              <div className="search-input-wrapper">
                <input
                  ref={searchInputRef}
                  id="tr_live_search"
                  name="s"
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                />
                <button type="submit" className="btn npd lnk search-btn">
                  <i id="sl-home" className="fa fa-search"></i>
                </button>
              </div>
              {showSuggestions || isLoading ? (
                <ul
                  ref={suggestionsRef}
                  id="res-sj"
                  className="search-dropdown"
                >
                  {isLoading ? (
                    <li className="loading">Loading...</li>
                  ) : (
                    <>
                      {searchResults.length > 0 && (
                        <>
                          <li className="dropdown-title">Results</li>
                          {searchResults.slice(0, 5).map((result) => (
                            <li key={result.id} className="dropdown-item">
                              <a
                                href={result.url}
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleResultClick(result.url);
                                }}
                              >
                                <span className={`type-${result.type}`}>{result.type}</span>
                                {result.title}
                              </a>
                            </li>
                          ))}
                          {searchResults.length > 5 && (
                            <li className="dropdown-more">
                              <a
                                id="more-shm"
                                href={`/search?q=${encodeURIComponent(searchQuery)}`}
                                className="btn sm rnd"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleMoreResults();
                                }}
                              >
                                More results
                              </a>
                            </li>
                          )}
                        </>
                      )}
                    </>
                  )}
                </ul>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
