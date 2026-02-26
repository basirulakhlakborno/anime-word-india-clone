import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import BottomNav from '../../components/BottomNav/BottomNav';
import FranchiseLogoSlider from '../../components/FranchiseLogoSlider/FranchiseLogoSlider';
import NewestDrops from '../../components/NewestDrops/NewestDrops';
import NetworkLogoSlider from '../../components/NetworkLogoSlider/NetworkLogoSlider';
import LanguageLogoSlider from '../../components/LanguageLogoSlider/LanguageLogoSlider';
import FreshCartoonFilms from '../../components/FreshCartoonFilms/FreshCartoonFilms';
import LatestAnimeMovies from '../../components/LatestAnimeMovies/LatestAnimeMovies';
import NewAnimeArrivals from '../../components/NewAnimeArrivals/NewAnimeArrivals';
import JustInCartoonSeries from '../../components/JustInCartoonSeries/JustInCartoonSeries';
import MostWatchedShows from '../../components/MostWatchedShows/MostWatchedShows';
import MostWatchedFilms from '../../components/MostWatchedFilms/MostWatchedFilms';
import Skeleton from '../../components/Skeleton/Skeleton';

import '../../styles/torofilm-public.css';
import '../../styles/tippy.css';
import '../../styles/home-widgets.css';

function Home() {
  const navigate = useNavigate();
  const [homeData, setHomeData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setIsLoading(true);
        const response = await api.getHome();
        
        // Handle both response formats:
        // 1. Wrapped: { success: true, data: {...} }
        // 2. Direct: { newestDrops: [...], newAnimeArrivals: [...], ... }
        let data = null;
        if (response.success && response.data) {
          // Wrapped format
          data = response.data;
        } else if (response.newestDrops || response.newAnimeArrivals) {
          // Direct format (data is the response itself)
          data = response;
        }
        
        if (data) {
          setHomeData(data);
        } else {
          console.warn('[Home] Unexpected API response structure:', response);
        }
      } catch (error) {
        console.error('[Home] Error fetching home data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  // Transform API data to component format
  // newestDrops includes season and episodes fields
  const transformNewestDrop = (item) => ({
    id: item.id,
    title: item.title,
    image: item.image,
    link: item.type === 'series' ? `/series/${item.id}/` : `/movies/${item.id}/`,
    season: item.season || '',
    episodes: item.episodes || '',
  });

  // Other items don't have season/episodes
  const transformItem = (item) => ({
    id: item.id,
    title: item.title,
    image: item.image,
    link: item.type === 'series' ? `/series/${item.id}/` : `/movies/${item.id}/`,
  });

  // Use API data directly - newestDrops has season/episodes, others don't
  const newestDropsEpisodes = homeData?.newestDrops?.map(transformNewestDrop) || [];
  const newAnimeArrivals = homeData?.newAnimeArrivals?.map(transformItem) || [];
  const cartoonSeries = homeData?.cartoonSeries?.map(transformItem) || [];
  const animeMovies = homeData?.animeMovies?.map(transformItem) || [];
  const cartoonFilms = homeData?.cartoonFilms?.map(transformItem) || [];
  
  // Most watched shows/films - check if they exist in API response
  const mostWatchedShows = homeData?.mostWatchedShows?.map((item, index) => ({
    ...transformItem(item),
    rank: index + 1,
  })) || [];
  const mostWatchedFilms = homeData?.mostWatchedFilms?.map((item, index) => ({
    ...transformItem(item),
    rank: index + 1,
  })) || [];

  return (
    <>
      <Helmet>
        <title>Anime World India - Best Source For Hindi, Tamil, Telugu Anime &amp; Cartoons</title>
        <meta name="description" content="Anime World , AnimeWorld , Anime World India , Anime World APK , Best Source of Best Source For Hindi, Tamil, Telugu Anime &amp; Cartoons" />
        <meta name="robots" content="follow, index" />
        <link rel="canonical" href="https://watchanimeworld.in/" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Anime World India - Best Source For Hindi, Tamil, Telugu Anime &amp; Cartoons" />
        <meta property="og:description" content="Anime World , AnimeWorld , Anime World India , Anime World APK , Best Source of Best Source For Hindi, Tamil, Telugu Anime &amp; Cartoons" />
        <meta property="og:url" content="https://watchanimeworld.in/" />
        <meta property="og:site_name" content="Anime World India" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Anime World India - Best Source For Hindi, Tamil, Telugu Anime &amp; Cartoons" />
        <meta name="twitter:description" content="Anime World , AnimeWorld , Anime World India , Anime World APK , Best Source of Best Source For Hindi, Tamil, Telugu Anime &amp; Cartoons" />
      </Helmet>

      <div className="home blog wp-custom-logo wp-theme-torofilm side-none">
        <div id="aa-wp" className="cont">
          <Header />
          
          <div className="dfxc">
            <main className="main-site">
              <FranchiseLogoSlider />
              {isLoading ? (
                <>
                  <div style={{ marginBottom: '2rem', padding: '0 1rem' }}>
                    <Skeleton type="text" count={1} className="skeleton-title" style={{ width: '200px', height: '28px', marginBottom: '1.5rem' }} />
                    <div style={{ display: 'flex', gap: '0.5rem', overflow: 'hidden' }}>
                      {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} style={{ minWidth: '150px', width: '150px', flexShrink: 0 }}>
                          <Skeleton type="card" count={1} className="skeleton-card" style={{ paddingBottom: '225px' }} />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{ marginBottom: '2rem', padding: '0 1rem' }}>
                    <Skeleton type="text" count={1} className="skeleton-title" style={{ width: '200px', height: '28px', marginBottom: '1.5rem' }} />
                    <div style={{ display: 'flex', gap: '0.5rem', overflow: 'hidden' }}>
                      {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} style={{ minWidth: '150px', width: '150px', flexShrink: 0 }}>
                          <Skeleton type="card" count={1} className="skeleton-card" style={{ paddingBottom: '225px' }} />
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <NewestDrops title="Newest Drops" episodes={newestDropsEpisodes} />
                  <NetworkLogoSlider />
                  <LanguageLogoSlider />
              
                  <MostWatchedShows title="Most-Watched Shows" shows={mostWatchedShows} />
                  <MostWatchedFilms title="Most-Watched Films" films={mostWatchedFilms} />
                  
                  <NewAnimeArrivals title="New Anime Arrivals" series={newAnimeArrivals} />
                  <JustInCartoonSeries title="Just In: Cartoon Series" series={cartoonSeries} />

                  <LatestAnimeMovies title="Latest Anime Movies" movies={animeMovies} />
                  <FreshCartoonFilms title="Fresh Cartoon Films" movies={cartoonFilms} />
                </>
              )}
            </main>
          </div>
        </div>
        <Footer />
        <BottomNav />
      </div>
    </>
  );
}

export default Home;
