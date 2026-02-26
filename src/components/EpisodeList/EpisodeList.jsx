import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import ImageWithFallback from '../ImageWithFallback/ImageWithFallback';

function EpisodeList({ seriesData, onSeasonChange }) {
  // Ensure seasons is an array and has at least one season
  const availableSeasons = Array.isArray(seriesData?.seasons) && seriesData.seasons.length > 0 
    ? seriesData.seasons 
    : [];
  const [selectedSeason, setSelectedSeason] = useState(availableSeasons.length > 0 ? availableSeasons[0] : null);
  
  // Notify parent component when season changes
  useEffect(() => {
    if (onSeasonChange && selectedSeason) {
      onSeasonChange(selectedSeason);
    }
  }, [selectedSeason, onSeasonChange]);
  const [episodes, setEpisodes] = useState([]);
  const [isLoadingEpisodes, setIsLoadingEpisodes] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Fetch episodes when season changes
  useEffect(() => {
    const fetchEpisodes = async () => {
      if (!selectedSeason || !seriesData.id || !seriesData.postId) return;
      
      setIsLoadingEpisodes(true);
      try {
        const response = await api.getEpisodes(seriesData.id, selectedSeason.number);
        // Handle response format: { success: true, data: { id, postId, season, episodes: [...] } }
        const episodesData = response.success && response.data 
          ? (response.data.episodes || response.data.items || [])
          : [];
        
        if (episodesData.length > 0) {
          const transformedEpisodes = episodesData.map((item, index) => ({
            id: item.id,
            number: item.episode,
            season: item.season,
            title: item.title,
            thumbnail: item.image,
            url: `/episode/${item.id}/`,
          }));
          setEpisodes(transformedEpisodes);
          
          // Update selected season with episodes
          const updatedSeason = {
            ...selectedSeason,
            episodes: transformedEpisodes,
          };
          setSelectedSeason(updatedSeason);
          
          // Notify parent component of the updated season with episodes
          if (onSeasonChange) {
            onSeasonChange(updatedSeason);
          }
        } else {
          setEpisodes([]);
        }
      } catch (error) {
        console.error('Error fetching episodes:', error);
        setEpisodes([]);
      } finally {
        setIsLoadingEpisodes(false);
      }
    };

    fetchEpisodes();
  }, [selectedSeason?.number, seriesData.id, seriesData.postId]);

  const handleSeasonChange = (season) => {
    setSelectedSeason(season);
    setIsDropdownOpen(false);
    // Notify parent component when season changes
    if (onSeasonChange) {
      onSeasonChange(season);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Don't render if no seasons available
  if (availableSeasons.length === 0 || !selectedSeason) {
    return null;
  }

  return (
    <section className="section episodes">
      <header className="section-header">
        <div className="aa-drp choose-season" ref={dropdownRef}>
          <button
            className="btn lnk npd aa-lnk"
            onClick={(e) => {
              e.preventDefault();
              setIsDropdownOpen(!isDropdownOpen);
            }}
          >
            <span className="choose-label">choose season</span>
            <span className="season-row">
              <span className="season-label">Season</span>
              <span className="season-number">{selectedSeason?.number || ''}</span>
            </span>
          </button>
          <ul className={`aa-cnt sub-menu ${isDropdownOpen ? 'on' : ''}`}>
            {availableSeasons.map((season) => (
              <li key={season.id} className={selectedSeason && season.id === selectedSeason.id ? 'sel-temp' : ''}>
                <button
                  type="button"
                  data-post={seriesData.id}
                  data-season={season.number}
                  onClick={(e) => {
                    e.preventDefault();
                    handleSeasonChange(season);
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'inherit',
                    cursor: 'pointer',
                    width: '100%',
                    textAlign: 'left',
                    padding: '0.5rem 1rem',
                    font: 'inherit',
                  }}
                >
                  Season {season.number}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </header>
      <ul id="episode_by_temp" className="post-lst rw sm rcl2 rcl3a rcl4b rcl3c rcl4d rcl8e eqcl">
        {isLoadingEpisodes ? (
          <li style={{ textAlign: 'center', padding: '2rem' }}>Loading episodes...</li>
        ) : episodes.length === 0 ? (
          <li style={{ textAlign: 'center', padding: '2rem' }}>No episodes available</li>
        ) : (
          episodes.map((episode) => (
          <li key={episode.id}>
            <article className="post dfx fcl episodes fa-play-circle lg">
              <div className="post-thumbnail">
                <figure>
                  <ImageWithFallback loading="lazy" src={episode.thumbnail} alt={`Image ${episode.title}`} />
                </figure>
                <span className="play fa-play"></span>
              </div>
              <header className="entry-header">
                <span className="num-epi">
                  {episode.season}x{episode.number}
                </span>
                <h2 className="entry-title">{episode.title}</h2>
                <span className="view">View</span>
              </header>
              <Link 
                to={episode.url} 
                className="lnk-blk"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  zIndex: 10,
                  pointerEvents: 'auto',
                  touchAction: 'manipulation',
                }}
              ></Link>
            </article>
          </li>
          ))
        )}
      </ul>
    </section>
  );
}

export default EpisodeList;
