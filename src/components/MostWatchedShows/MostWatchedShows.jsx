import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/swiper.min.css';
import ImageWithFallback from '../ImageWithFallback/ImageWithFallback';
import './MostWatchedShows.css';

function MostWatchedShows({ title = 'Most-Watched Shows', shows = [] }) {
  const swiperRef = useRef(null);
  const swiperContainerRef = useRef(null);
  const navigate = useNavigate();

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
        swiperRef.current = new window.Swiper(swiperContainerRef.current, {
          direction: 'horizontal',
          slidesPerView: 5,
          spaceBetween: 10,
          loop: false,
          freeMode: false,
          allowTouchMove: true,
          breakpoints: {
            0: {
              slidesPerView: 2,
              spaceBetween: 8,
            },
            640: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 10,
            },
          },
        });
      }
    };

    initSwiper();

    return () => {
      if (swiperRef.current) {
        swiperRef.current.destroy(true, true);
      }
    };
  }, []);

  const showsToDisplay = shows.length > 0 ? shows : [];

  return (
    <section className="most-watched-shows-section">
      <div className="section-header">
        <h2 className="section-title">{title}</h2>
      </div>
      
      <div className="most-watched-container">
        <div className="swiper most-watched-swiper" ref={swiperContainerRef}>
          <div className="swiper-wrapper">
            {showsToDisplay.map((show) => (
              <div className="swiper-slide" key={show.id}>
                <a
                  href={show.link}
                  className="most-watched-item"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(show.link);
                  }}
                >
                  <div className="rank-number">{show.rank}</div>
                  <div className="show-poster">
                    <ImageWithFallback src={show.image} alt={show.title} loading="lazy" />
                  </div>
                  <div className="show-title-overlay">
                    <h3>{show.title}</h3>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default MostWatchedShows;
