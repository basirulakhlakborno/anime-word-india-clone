import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import api from '../../utils/api';
import CategoryHeader from '../../components/CategoryHeader/CategoryHeader';
import Footer from '../../components/Footer/Footer';
import BottomNav from '../../components/BottomNav/BottomNav';
import EpisodeList from '../../components/EpisodeList/EpisodeList';
import RecommendedSeries from '../../components/RecommendedSeries/RecommendedSeries';
import Skeleton from '../../components/Skeleton/Skeleton';
import './Episode.css';

function Episode() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [embedData, setEmbedData] = useState(null);
  const [seriesData, setSeriesData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingSeries, setIsLoadingSeries] = useState(false);
  const [selectedServer, setSelectedServer] = useState(0);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmbedData = async () => {
      if (!id) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await api.getEmbed(id);
        
        if (response.success && response.data) {
          setEmbedData(response.data);
          // Set first server as default
          if (response.data.servers && response.data.servers.length > 0) {
            setSelectedServer(0);
          }
        } else if (response.servers) {
          // Handle direct response format
          setEmbedData(response);
          if (response.servers && response.servers.length > 0) {
            setSelectedServer(0);
          }
        } else {
          setError('No video servers found');
        }
      } catch (err) {
        console.error('Error fetching embed data:', err);
        setError('Failed to load video. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmbedData();
  }, [id]);

  // Extract series ID from episode ID (e.g., "spy-x-family-3x1" -> "spy-x-family")
  const getSeriesId = (episodeId) => {
    if (!episodeId) return '';
    const match = episodeId.match(/^(.+?)(?:-\d+x\d+)$/);
    return match ? match[1] : episodeId;
  };

  const seriesId = getSeriesId(id);
  const currentServer = embedData?.servers?.[selectedServer];

  // Fetch series data for episode list and recommendations
  useEffect(() => {
    const fetchSeriesData = async () => {
      if (!seriesId || !embedData) return;
      
      setIsLoadingSeries(true);
      try {
        const response = await api.getInfo(seriesId);
        
        if (response.success && response.data) {
          const data = response.data;
          
          // Transform to match EpisodeList expected format
          const transformedData = {
            id: data.id,
            postId: data.postId,
            type: data.type,
            title: data.title,
            image: data.image,
            seasons: data.type === 'movie' ? [] : (data.seasonsList || []).map((seasonNum, index) => ({
              id: index + 1,
              number: seasonNum,
              episodes: [], // Will be loaded when season is selected
            })),
            seasonsCount: data.seasonsCount || 0,
            episodesCount: data.episodesCount || 0,
            recommended: data.recommended || [],
          };
          
          setSeriesData(transformedData);
          
          // Set initial selected season (first season)
          if (transformedData.seasons && transformedData.seasons.length > 0) {
            setSelectedSeason(transformedData.seasons[0]);
          }
        } else if (response.id) {
          // Handle direct response format
          const data = response;
          const transformedData = {
            id: data.id,
            postId: data.postId,
            type: data.type,
            title: data.title,
            image: data.image,
            seasons: data.type === 'movie' ? [] : (data.seasonsList || []).map((seasonNum, index) => ({
              id: index + 1,
              number: seasonNum,
              episodes: [],
            })),
            seasonsCount: data.seasonsCount || 0,
            episodesCount: data.episodesCount || 0,
            recommended: data.recommended || [],
          };
          
          setSeriesData(transformedData);
          
          if (transformedData.seasons && transformedData.seasons.length > 0) {
            setSelectedSeason(transformedData.seasons[0]);
          }
        }
      } catch (err) {
        console.error('Error fetching series data:', err);
        // Don't show error, just don't display episode list/recommendations
      } finally {
        setIsLoadingSeries(false);
      }
    };

    fetchSeriesData();
  }, [seriesId, embedData]);

  if (isLoading) {
    return (
      <>
        <Helmet>
          <title>Loading Episode... - Anime World India</title>
        </Helmet>
        <div className="home blog wp-custom-logo wp-theme-torofilm side-none">
          <div id="aa-wp" className="cont">
            <CategoryHeader />
            <div className="bd">
              <div className="dfxc">
                <main className="main-site">
                  <div className="episode-skeleton">
                    <Skeleton type="image" className="skeleton-video-player" count={1} style={{ width: '100%', height: '500px', borderRadius: '8px' }} />
                    <div className="skeleton-servers">
                      <Skeleton type="text" className="skeleton-text" count={3} style={{ width: '120px', height: '40px', marginRight: '1rem' }} />
                    </div>
                  </div>
                </main>
              </div>
            </div>
          </div>
          <Footer />
          <BottomNav />
        </div>
      </>
    );
  }

  if (error || !embedData || !embedData.servers || embedData.servers.length === 0) {
    return (
      <>
        <Helmet>
          <title>Episode Not Found - Anime World India</title>
        </Helmet>
        <div className="home blog wp-custom-logo wp-theme-torofilm side-none">
          <div id="aa-wp" className="cont">
            <CategoryHeader />
            <div className="bd">
              <div className="dfxc">
                <main className="main-site">
                  <div className="error-page">
                    <div className="error-content">
                      <h1 className="error-code">404</h1>
                      <h2 className="error-title">Episode Not Found</h2>
                      <p className="error-message">
                        {error || 'The episode you are looking for could not be found.'}
                      </p>
                      <div className="error-actions">
                        {seriesId && (
                          <Link to={`/series/${seriesId}`} className="btn btn-primary">
                            Go to Series
                          </Link>
                        )}
                        <Link to="/" className="btn btn-secondary">
                          Go to Homepage
                        </Link>
                      </div>
                    </div>
                  </div>
                </main>
              </div>
            </div>
          </div>
          <Footer />
          <BottomNav />
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Watch Episode - {id} - Anime World India</title>
        <meta name="description" content={`Watch ${id} on Anime World India`} />
      </Helmet>

      <div className="home blog wp-custom-logo wp-theme-torofilm side-none">
        <div id="aa-wp" className="cont">
          <CategoryHeader />
          
          <div className="bd">
            <div className="dfxc">
              <main className="main-site">
                <section className="episode-section">
                  <div className="episode-layout">
                    {/* Main Video Area */}
                    <div className="episode-main">
                      {/* Episode Title */}
                      <div className="episode-title-bar">
                        <h1 className="episode-title">
                          {seriesData?.title || 'Episode'} - {id}
                        </h1>
                      </div>

                      {/* Video Player with Sidebar */}
                      <div className="video-layout">
                        <div className="video-container">
                          <div className="video-player-wrapper">
                            {currentServer && currentServer.url ? (
                              <iframe
                                src={currentServer.url}
                                title={`Video Player - ${currentServer.name}`}
                                className="video-player"
                                allowFullScreen
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                frameBorder="0"
                              />
                            ) : (
                              <div className="video-placeholder">
                                <p>No video available</p>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Options Sidebar - Next to Video */}
                        <aside className="episode-sidebar">
                          <div className="sidebar-content">
                            <h2 className="sidebar-title">OPTIONS</h2>
                            <p className="sidebar-subtitle">Select Server</p>
                            <div className="server-list">
                              {embedData.servers && embedData.servers.map((server, index) => (
                                <div
                                  key={server.server}
                                  className={`server-item ${selectedServer === index ? 'active' : ''}`}
                                  onClick={() => setSelectedServer(index)}
                                >
                                  <div className="server-indicator">
                                    {selectedServer === index && <span className="server-dot"></span>}
                                  </div>
                                  <div className="server-info">
                                    <div className="server-name">SERVER {index + 1}</div>
                                    <div className="server-label">{server.name || 'PLAY'}</div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </aside>
                      </div>

                      {/* Episode List - Full Width */}
                      {seriesData && seriesData.type !== 'movie' && (
                        <EpisodeList 
                          seriesData={seriesData} 
                          onSeasonChange={setSelectedSeason}
                          selectedSeason={selectedSeason}
                        />
                      )}

                      {/* Recommended Series */}
                      {seriesData && seriesData.recommended && seriesData.recommended.length > 0 && (
                        <RecommendedSeries recommended={seriesData.recommended} />
                      )}
                    </div>
                  </div>
                </section>
              </main>
            </div>
          </div>
        </div>
        <Footer />
        <BottomNav />
      </div>
    </>
  );
}

export default Episode;
