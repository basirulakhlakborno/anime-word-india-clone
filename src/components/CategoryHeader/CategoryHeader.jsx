import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import './CategoryHeader.css';

function CategoryHeader() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const searchInputRef = useRef(null);
  const suggestionsRef = useRef(null);
  const navigate = useNavigate();

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
    <header className="hd dfx alg-cr pfx pfxa headroom--top">
      <figure className="logo fg1 cl0c">
        <Link to="/" className="custom-logo-link" rel="home">
          <img
            width="2000"
            height="600"
            src="/images/AWI-SiteTitle-1.png"
            className="custom-logo"
            alt="Anime World India"
            decoding="async"
          />
        </Link>
      </figure>
      <nav id="menu" className={`hdd dfxc fg1 jst-sb alg-cr ${isMenuOpen ? 'on' : ''}`}>
        <ul className="rw dv">
          <li className="cl1 cl0c or-1c shw">
            <form
              id="search"
              className="search full"
              onSubmit={handleSubmit}
            >
              <div className="search-input-wrapper">
                <input
                  ref={searchInputRef}
                  id="tr_live_search_h"
                  type="text"
                  name="s"
                  placeholder="Search"
                  autoComplete="off"
                  value={searchQuery}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                />
                <button type="submit" className="btn npd lnk search-btn">
                  <i id="sl_home_h" className="fa-search"></i>
                </button>
              </div>
              {showSuggestions || isLoading ? (
                <ul
                  ref={suggestionsRef}
                  id="res-sj_h"
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
                                  navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
                                  setShowSuggestions(false);
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
          </li>
        </ul>
      </nav>
      <button 
        type="button" 
        className="btn menu-btn npd lnk aa-tgl hddc" 
        data-tgl="aa-wp"
        onClick={(e) => {
          e.preventDefault();
          setIsMenuOpen(!isMenuOpen);
        }}
      >
        <i className="fa-bars"></i>
      </button>
    </header>
  );
}

export default CategoryHeader;
