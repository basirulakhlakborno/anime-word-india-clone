import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/swiper.min.css';
import ImageWithFallback from '../ImageWithFallback/ImageWithFallback';
import './MostWatchedFilms.css';

function MostWatchedFilms({ title = 'Most-Watched Films', films = [] }) {
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

  const filmsToDisplay = films.length > 0 ? films : [];

  return (
    <section className="most-watched-films-section">
      <div className="section-header">
        <h2 className="section-title">{title}</h2>
      </div>
      
      <div className="most-watched-container">
        <div className="swiper most-watched-swiper" ref={swiperContainerRef}>
          <div className="swiper-wrapper">
            {filmsToDisplay.map((film) => (
              <div className="swiper-slide" key={film.id}>
                <a
                  href={film.link}
                  className="most-watched-item"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(film.link);
                  }}
                >
                  <div className="rank-number">{film.rank}</div>
                  <div className="film-poster">
                    <ImageWithFallback src={film.image} alt={film.title} loading="lazy" />
                  </div>
                  <div className="film-title-overlay">
                    <h3>{film.title}</h3>
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

export default MostWatchedFilms;
