import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import ImageWithFallback from '../ImageWithFallback/ImageWithFallback';
import '../../styles/swiper.min.css';
import './RecommendedSeries.css';

function RecommendedSeries({ recommended = [] }) {
  const swiperRef = useRef(null);
  const swiperContainerRef = useRef(null);

  // Transform API data to component format
  const recommendedSeries = (recommended || []).map(item => ({
    id: item.id,
    title: item.title,
    image: item.image,
    year: item.year || '',
    url: item.type === 'series' ? `/series/${item.id}/` : `/movies/${item.id}/`,
  }));

  useEffect(() => {
    const initSwiper = async () => {
      if (typeof window !== 'undefined' && !window.Swiper) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/swiper/swiper-bundle.min.js';
        script.onload = () => {
          setTimeout(initializeSwiper, 100);
        };
        document.head.appendChild(script);
      } else if (window.Swiper) {
        setTimeout(initializeSwiper, 100);
      }
    };

    const initializeSwiper = () => {
      if (swiperContainerRef.current && window.Swiper) {
        // Destroy existing Swiper instance if it exists
        if (swiperRef.current) {
          swiperRef.current.destroy(true, true);
          swiperRef.current = null;
        }

        swiperRef.current = new window.Swiper(swiperContainerRef.current, {
          direction: 'horizontal',
          slidesPerView: 'auto',
          spaceBetween: 7,
          loop: false,
          freeMode: true,
          freeModeSticky: false,
          freeModeMomentum: true,
          freeModeMomentumRatio: 0.5,
          freeModeMomentumBounce: true,
          freeModeMomentumBounceRatio: 1,
          allowTouchMove: true,
          touchEventsTarget: 'container',
          resistance: true,
          resistanceRatio: 0.85,
          watchSlidesProgress: false,
          grabCursor: true,
          speed: 300,
          preventInteractionOnTransition: true,
          breakpoints: {
            0: {
              slidesPerView: 'auto',
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 'auto',
              spaceBetween: 12,
            },
            768: {
              slidesPerView: 'auto',
              spaceBetween: 7,
            },
            1024: {
              slidesPerView: 'auto',
              spaceBetween: 7,
            },
          },
        });
      }
    };

    initSwiper();

    return () => {
      if (swiperRef.current) {
        swiperRef.current.destroy(true, true);
        swiperRef.current = null;
      }
    };
  }, [recommendedSeries]);

  return (
    <section id="widget_list_episodes-6" className="wdgt-home widget section recommended-series">
      <header className="section-header">
        <div className="rw alg-cr jst-sb">
          <h3 className="section-title">Recommended Series</h3>
        </div>
      </header>
      <div className="swiper-container latest-ep-swiper-container" ref={swiperContainerRef}>
        <div className="swiper-wrapper">
          {recommendedSeries.length > 0 ? recommendedSeries.map((series) => (
            <div key={series.id} className="swiper-slide latest-ep-swiper-slide">
              <li>
                <article className="post dfx fcl movies">
                  <div className="post-thumbnail">
                    <figure>
                      <ImageWithFallback loading="lazy" src={series.image} alt={`Image ${series.title}`} />
                    </figure>
                    <span className="post-ql" style={{ backgroundColor: 'rgba(0, 0, 0, .7)', fontSize: '.65rem', padding: '0 .5rem', borderRadius: '.2rem' }}>
                    </span>
                    <span className="year">{series.year}</span>
                    <span className="play fa-play"></span>
                  </div>
                  <header className="entry-header">
                    <h2
                      className="entry-title"
                      style={{
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 1,
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {series.title}
                    </h2>
                  </header>
                  <Link to={series.url} className="lnk-blk"></Link>
                </article>
              </li>
            </div>
          )) : (
            <div className="swiper-slide" style={{ textAlign: 'center', padding: '2rem' }}>
              <p>No recommended series available</p>
            </div>
          )}
        </div>
        <div className="swiper-pagination"></div>
        <span className="swiper-notification" aria-live="assertive" aria-atomic="true"></span>
      </div>
    </section>
  );
}

export default RecommendedSeries;
