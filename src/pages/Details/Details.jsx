import { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import api from '../../utils/api';
import CategoryHeader from '../../components/CategoryHeader/CategoryHeader';
import EpisodeList from '../../components/EpisodeList/EpisodeList';
import RecommendedSeries from '../../components/RecommendedSeries/RecommendedSeries';
import Footer from '../../components/Footer/Footer';
import BottomNav from '../../components/BottomNav/BottomNav';
import ImageWithFallback from '../../components/ImageWithFallback/ImageWithFallback';
import Skeleton from '../../components/Skeleton/Skeleton';
import '../../styles/torofilm-public.css';
import '../../styles/tippy.css';
import './Details.css';

function Details() {
  const { id } = useParams();
  const location = useLocation();
  const [seriesData, setSeriesData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showAllGenres, setShowAllGenres] = useState(false);
  const [showAllLanguages, setShowAllLanguages] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const fetchSeriesData = async () => {
      setIsLoading(true);
      
      try {
        const response = await api.getInfo(id);
        if (response.success && response.data) {
          const data = response.data;
          
          // Transform API data to component format
          const transformedData = {
            id: data.id,
            title: data.title,
            image: data.image,
            backgroundImage: data.background,
            description: data.description,
            episodeCount: data.type === 'movie' ? 1 : parseInt(data.episodes) || 0,
            seasonsCount: data.type === 'movie' ? 0 : (data.seasonsList || []).length,
            episodesCount: data.type === 'movie' ? 1 : parseInt(data.episodes) || 0,
            genres: (data.genres || []).map(genre => ({
              name: genre,
              url: `/category/genre/${genre.toLowerCase().replace(/\s+/g, '-')}/`,
            })),
            languages: (data.languages || []).map(lang => ({
              name: lang,
              url: `/category/language/${lang.toLowerCase().replace(/\s+/g, '-')}/`,
            })),
            duration: data.duration,
            year: data.year,
            network: data.network ? {
              name: data.network,
              image: `/images/${data.network.toLowerCase().replace(/\s+/g, '-')}-193x193.png`,
              url: `/category/network/${data.network.toLowerCase().replace(/\s+/g, '-')}/`,
            } : null,
            seasons: data.type === 'movie' ? [] : (data.seasonsList || []).map((seasonNum, index) => ({
              id: index + 1,
              number: seasonNum,
              episodes: [], // Will be loaded when season is selected
            })),
            type: data.type,
            postId: data.postId,
            recommended: (data.recommended || []).map(item => ({
              id: item.id,
              type: item.type,
              title: item.title,
              image: item.image,
              year: item.year,
            })),
          };

          setSeriesData(transformedData);
        }
      } catch (error) {
        console.error('Error fetching series data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchSeriesData();
    }
  }, [id]);

  // Handle scroll to add black overlay and show footer background
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // Calculate scroll percentage
      const scrollableHeight = documentHeight - windowHeight;
      const scrollPercentage = scrollableHeight > 0 ? (scrollTop / scrollableHeight) * 100 : 0;
      
      setScrollProgress(scrollPercentage);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [seriesData]);

  if (isLoading || !seriesData) {
    return (
      <>
        <Helmet>
          <title>Loading... - Anime World India</title>
        </Helmet>
        <div className="home blog wp-custom-logo wp-theme-torofilm side-none">
          <div id="aa-wp" className="cont">
            <CategoryHeader />
            <div className="bd">
              <div className="dfxc">
                <main className="main-site">
                  <article className="post single">
                    <div className="skeleton-details">
                      <Skeleton type="image" className="skeleton-details-poster" count={1} />
                      <div className="skeleton-details-content">
                        <Skeleton type="text" className="skeleton-title" count={1} />
                        <Skeleton type="text" className="skeleton-text" count={3} />
                        <Skeleton type="text" className="skeleton-text short" count={2} />
                      </div>
                    </div>
                  </article>
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

  // Use selectedSeason if available, otherwise use first season
  const currentSeason = selectedSeason || (seriesData.seasons && seriesData.seasons.length > 0 ? seriesData.seasons[0] : null);
  const firstEpisode = currentSeason && currentSeason.episodes && currentSeason.episodes.length > 0 ? currentSeason.episodes[0] : null;
  
  // Ensure firstEpisode has required properties
  const hasValidFirstEpisode = firstEpisode && firstEpisode.url && firstEpisode.number;

  if (isLoading || !seriesData) {
    return (
      <>
        <Helmet>
          <title>Loading... - Anime World India</title>
        </Helmet>
        <div className="home blog wp-custom-logo wp-theme-torofilm side-none">
          <div id="aa-wp" className="cont">
            <CategoryHeader />
            <div className="bd">
              <div className="dfxc">
                <main className="main-site">
                  <article className="post single">
                    <div className="dfxb alg-cr">
                      <div style={{ textAlign: 'center', width: '100%', maxWidth: '300px' }}>
                        <Skeleton type="image" className="skeleton-details-poster" count={1} style={{ height: '14rem', borderRadius: '5%' }} />
                        <Skeleton type="text" className="skeleton-title" count={1} style={{ width: '80%', margin: '10px auto 0', height: '20px' }} />
                      </div>
                      <div className="post-thumbnail alg-ss"></div>
                      <aside className="fg1 skeleton-details-content">
                        <Skeleton type="text" className="skeleton-overview-header" count={1} style={{ width: '30%', height: '20px', marginBottom: '1.25rem' }} />
                        <Skeleton type="text" className="skeleton-text" count={5} style={{ height: '16px', marginBottom: '1rem' }} />
                        <div className="skeleton-genres-languages">
                          <div>
                            <Skeleton type="text" className="skeleton-text short" count={1} style={{ width: '30%', marginBottom: '0.5rem', height: '14px' }} />
                            <Skeleton type="text" className="skeleton-text" count={1} style={{ width: '90%', height: '14px' }} />
                          </div>
                          <div>
                            <Skeleton type="text" className="skeleton-text short" count={1} style={{ width: '30%', marginBottom: '0.5rem', height: '14px' }} />
                            <Skeleton type="text" className="skeleton-text" count={1} style={{ width: '90%', height: '14px' }} />
                          </div>
                        </div>
                        <div className="skeleton-meta">
                          <Skeleton type="text" className="skeleton-meta-item" count={3} style={{ width: '60px', height: '20px' }} />
                        </div>
                      </aside>
                    </div>
                  </article>
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
        <title>{seriesData.title} - Watch Now in Hindi, English & Japanese - Anime World India</title>
        <meta name="description" content={`${seriesData.title} in Hindi, ${seriesData.title} Hindi Dubbed, ${seriesData.title} Episodes in Hindi, English & Japanese ${seriesData.title} Download/Watch Online 480p, 720p, 1080p`} />
      </Helmet>

      <div className="home blog wp-custom-logo wp-theme-torofilm side-none">
        <div id="aa-wp" className="cont">
          <CategoryHeader />
          
          <div className="bd">
            <div className="dfxc">
              <main className="main-site">
                {/* Series Header */}
                <article className="post single">
                  <div className="dfxb alg-cr">
                    <div style={{ textAlign: 'center' }}>
                      <ImageWithFallback
                        style={{ height: '14rem', borderRadius: '5%' }}
                        loading="lazy"
                        src={seriesData.image}
                        alt={`Image ${seriesData.title}`}
                      />
                      <h1
                        style={{
                          paddingTop: '10px',
                          fontWeight: 100,
                          marginBottom: '0rem',
                        }}
                        className="entry-title"
                      >
                        {seriesData.title}
                      </h1>
                      {seriesData.type !== 'movie' ? (
                        <>
                          [
                          {seriesData.seasonsCount > 0 && (
                            <span>{seriesData.seasonsCount} Season{seriesData.seasonsCount !== 1 ? 's' : ''} {seriesData.episodesCount > 0 ? '||' : ''} </span>
                          )}
                          {seriesData.episodesCount > 0 && (
                            <span>{seriesData.episodesCount} Episode{seriesData.episodesCount !== 1 ? 's' : ''}</span>
                          )}
                          ]
                          <br />
                          <div style={{ marginBottom: '0.75rem' }}></div>
                          {hasValidFirstEpisode && currentSeason && (
                            <a
                              href={firstEpisode.url}
                              style={{
                                padding: '.5rem 1.5rem',
                                backgroundColor: 'var(--light-2)',
                                borderRadius: '0.5rem',
                                borderBottomLeftRadius: 0,
                                borderBottomRightRadius: 0,
                              }}
                            >
                              <svg
                                style={{ width: '10px' }}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 448 512"
                                className="w-3 h-3"
                              >
                                <path
                                  fill="currentColor"
                                  d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"
                                />
                              </svg>
                              Play S:{currentSeason.number}-E:{firstEpisode.number}
                            </a>
                          )}
                        </>
                      ) : (
                        <>
                          <div style={{ marginBottom: '0.75rem' }}></div>
                          <Link
                            to={`/episode/${seriesData.id}/`}
                            style={{
                              padding: '.5rem 1.5rem',
                              backgroundColor: 'var(--light-2)',
                              borderRadius: '0.5rem',
                              borderBottomLeftRadius: 0,
                              borderBottomRightRadius: 0,
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.5rem',
                              textDecoration: 'none',
                              color: 'inherit',
                            }}
                          >
                            <svg
                              style={{ width: '10px' }}
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 448 512"
                              className="w-3 h-3"
                            >
                              <path
                                fill="currentColor"
                                d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"
                              />
                            </svg>
                            Play Movie
                          </Link>
                        </>
                      )}
                    </div>
                    <div className="post-thumbnail alg-ss"></div>
                    <aside className="fg1" style={{ backgroundColor: 'var(--light-1)', padding: '15px 15px 0 15px', borderRadius: '20px 20px 0 0' }}>
                      <header className="entry-header">
                        <span className="overviewCss" style={{ fontWeight: 900, fontSize: '20px' }}>
                          Overview:
                        </span>
                        <div className="entry-meta" style={{ paddingTop: '20px' }}>
                          <div className="description" style={{ overflowX: 'hidden' }}>
                            <p>{seriesData.description}</p>
                          </div>
                        </div>
                        <ul className="cast-lst dfx fwp">
                          <li>
                            <span>Genres</span>
                            <p className="genres" style={{ display: 'inline-block', width: '100%', whiteSpace: 'nowrap', overflowX: 'auto' }}>
                              {(showAllGenres ? seriesData.genres : seriesData.genres.slice(0, 3)).map((genre, index, arr) => (
                                <span key={genre.name}>
                                  <a href={genre.url}>{genre.name}</a>
                                  {index < arr.length - 1 && ' · '}
                                </span>
                              ))}
                              {seriesData.genres.length > 3 && !showAllGenres && (
                                <>
                                  {' · '}
                                  <a href="#" onClick={(e) => { e.preventDefault(); setShowAllGenres(true); }} style={{ color: 'var(--primary)', cursor: 'pointer' }}>
                                    See more
                                  </a>
                                </>
                              )}
                              {showAllGenres && seriesData.genres.length > 3 && (
                                <>
                                  {' · '}
                                  <a href="#" onClick={(e) => { e.preventDefault(); setShowAllGenres(false); }} style={{ color: 'var(--primary)', cursor: 'pointer' }}>
                                    See less
                                  </a>
                                </>
                              )}
                            </p>
                          </li>
                          <li>
                            <span>Languages</span>
                            <p className="loadactor" style={{ display: 'inline-block', width: '100%', whiteSpace: 'nowrap', overflowX: 'auto' }}>
                              {(showAllLanguages ? seriesData.languages : seriesData.languages.slice(0, 3)).map((lang, index, arr) => (
                                <span key={lang.name}>
                                  <a href={lang.url}>{lang.name}</a>
                                  {index < arr.length - 1 && ' · '}
                                </span>
                              ))}
                              {seriesData.languages.length > 3 && !showAllLanguages && (
                                <>
                                  {' · '}
                                  <a href="#" onClick={(e) => { e.preventDefault(); setShowAllLanguages(true); }} style={{ color: 'var(--primary)', cursor: 'pointer' }}>
                                    See more
                                  </a>
                                </>
                              )}
                              {showAllLanguages && seriesData.languages.length > 3 && (
                                <>
                                  {' · '}
                                  <a href="#" onClick={(e) => { e.preventDefault(); setShowAllLanguages(false); }} style={{ color: 'var(--primary)', cursor: 'pointer' }}>
                                    See less
                                  </a>
                                </>
                              )}
                            </p>
                          </li>
                        </ul>
                        <div className="entry-meta" style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                          <span className="duration fa-clock far" style={{ marginLeft: '10px' }}>
                            <span className="overviewCss" style={{ marginLeft: '-10px' }}>{seriesData.duration}</span>
                          </span>
                          <div className="overviewSeparator"></div>
                          <span className="year fa-calendar far">
                            <span className="overviewCss" style={{ marginLeft: '-10px' }}>{seriesData.year}</span>
                          </span>
                          <div className="overviewSeparator"></div>
                          {seriesData.network && (
                            <span className="network fa-broadcast-tower">
                              <span className="overviewCss">
                                <a href={seriesData.network.url}>
                                  <ImageWithFallback
                                    style={{ width: '25px' }}
                                    src={seriesData.network.image}
                                    alt={seriesData.network.name}
                                    className="cn-icon"
                                  />
                                </a>
                              </span>
                            </span>
                          )}
                        </div>
                      </header>
                      <footer className="dfxa jst-sb alg-cr">
                        <ul className="options rw rfg1 rcl0c"></ul>
                      </footer>
                    </aside>
                  </div>
                </article>

                {/* Episodes Section */}
                {seriesData.type !== 'movie' && (
                  <EpisodeList 
                    seriesData={seriesData} 
                    onSeasonChange={setSelectedSeason}
                  />
                )}

                {/* Recommended Series */}
                {seriesData.recommended && seriesData.recommended.length > 0 && (
                  <RecommendedSeries recommended={seriesData.recommended} />
                )}
              </main>
            </div>
          </div>
        </div>
        <Footer />
        <BottomNav />
      </div>
      
      {/* Background Images */}
      {seriesData.backgroundImage && (
        <>
          <div className="bghd">
            <img loading="lazy" className="TPostBg" src={seriesData.backgroundImage} alt="Background" />
            {/* Black overlay that becomes completely black at 20% scroll */}
            <div 
              className="bg-overlay" 
              style={{ 
                opacity: scrollProgress >= 20 ? 1 : Math.min(scrollProgress / 20, 1),
                backgroundColor: 'rgba(0, 0, 0, 1)'
              }}
            ></div>
          </div>
          <div 
            className="bgft"
            style={{
              opacity: scrollProgress >= 80 ? Math.min((scrollProgress - 80) / 20, 1) : 0,
              transition: 'opacity 0.3s ease'
            }}
          >
            <img loading="lazy" className="TPostBg" src={seriesData.backgroundImage} alt="Background" />
          </div>
        </>
      )}
    </>
  );
}

export default Details;
