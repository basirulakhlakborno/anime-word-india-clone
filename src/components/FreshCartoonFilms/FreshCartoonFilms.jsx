import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ImageWithFallback from '../ImageWithFallback/ImageWithFallback';
import '../../styles/swiper.min.css';
import '../../pages/Home/1spidercat.css';
import './FreshCartoonFilms.css';

function FreshCartoonFilms({ title = 'Fresh Cartoon Films', movies = [] }) {
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
        // Destroy existing Swiper instance if it exists
        if (swiperRef.current) {
          swiperRef.current.destroy(true, true);
          swiperRef.current = null;
        }

        swiperRef.current = new window.Swiper(swiperContainerRef.current, {
          direction: 'horizontal',
          slidesPerView: 'auto',
          spaceBetween: 15,
          loop: false,
          freeMode: true,
          freeModeSticky: false,
          allowTouchMove: true,
          touchEventsTarget: 'container',
          resistance: true,
          resistanceRatio: 0.85,
          watchSlidesProgress: true,
          grabCursor: true,
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
              spaceBetween: 12,
            },
            1024: {
              slidesPerView: 'auto',
              spaceBetween: 15,
            },
          },
        });

        // Set spidercat container height
        setTimeout(() => {
          const images = document.querySelectorAll('.latest-movies-series-swiper-slide img');
          const spidercatContainers = document.querySelectorAll('.spidercat-container-sp25');
          spidercatContainers.forEach((el, i) => {
            if (images[i]?.clientHeight) {
              el.style.height = `${images[i].clientHeight}px`;
            }
          });
        }, 100);
      }
    };

    initSwiper();

    return () => {
      if (swiperRef.current) {
        swiperRef.current.destroy(true, true);
        swiperRef.current = null;
      }
    };
  }, [movies]);

  const moviesToDisplay = movies || [];

  return (
    <section id="widget_list_movies_series-11" className="wdgt-home widget section widget_list_movies_series movies">
      <header className="section-header">
        <div className="rw alg-cr jst-sb">
          <h3 className="section-title">{title}</h3>
        </div>
      </header>
      <div>
        <div
          ref={swiperContainerRef}
          className="swiper-container latest-movies-series-swiper-container"
        >
          <div className="swiper-wrapper">
            {moviesToDisplay.map((movie) => (
              <div
                key={movie.id}
                className="swiper-slide latest-movies-series-swiper-slide"
              >
                <li id={`post-${movie.id}`} className={`post-${movie.id} movies`}>
                  <article className="post dfx fcl movies">
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
                        {movie.title}
                      </h2>
                    </header>
                    <div className="post-thumbnail or-1">
                      <figure>
                        <ImageWithFallback
                          loading="lazy"
                          src={movie.image}
                          alt={`Image ${movie.title}`}
                        />
                      </figure>
                      <span className="post-ql"></span>
                      <span className="watch btn sm">View Movie</span>
                      <span className="play fa-play"></span>
                    </div>
                    <a
                      href={movie.link}
                      className="lnk-blk"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(movie.link);
                      }}
                    ></a>
                  </article>
                </li>
              </div>
            ))}
            {/* Spidercat View More */}
            <div className="swiper-slide">
              <div className="spidercat-container-sp25">
                <div id="spidercat-sp25">
                  <div className="head-sp25">
                    <div className="eye-left-sp25"></div>
                    <div className="eye-right-sp25"></div>
                    <div className="ear-left-sp25"></div>
                    <div className="ear-right-sp25"></div>
                  </div>
                  <div className="body-sp25">
                    <div className="spider-sp25"></div>
                    <div className="arm-left-sp25"></div>
                    <div className="arm-right-sp25"></div>
                  </div>
                  <div className="legs-sp25">
                    <div className="boot-left-sp25"></div>
                    <div className="boot-right-sp25"></div>
                  </div>
                </div>
                <a
                  href="/category/type/cartoon/?type=movies"
                  className="view-more-btn-sp25"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/category/type/cartoon/?type=movies');
                  }}
                >
                  View More
                </a>
              </div>
            </div>
          </div>
          <div className="swiper-pagination"></div>
          <span
            className="swiper-notification"
            aria-live="assertive"
            aria-atomic="true"
          ></span>
        </div>
      </div>
    </section>
  );
}

export default FreshCartoonFilms;
