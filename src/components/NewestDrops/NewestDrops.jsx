import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ImageWithFallback from '../ImageWithFallback/ImageWithFallback';
import '../../styles/swiper.min.css';
import './NewestDrops.css';

function NewestDrops({ title = 'Newest Drops', episodes = [] }) {
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
          spaceBetween: 7,
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
  }, [episodes]);

  const episodesToDisplay = episodes || [];

  return (
    <section id="widget_list_episodes-5" className="wdgt-home widget section widget_list_episodes">
      <header className="section-header">
        <div className="rw alg-cr jst-sb">
          <h3 className="section-title">{title}</h3>
        </div>
      </header>
      <div className="swiper-container latest-ep-swiper-container" ref={swiperContainerRef}>
        <div className="swiper-wrapper">
          {episodesToDisplay.map((episode) => (
            <div key={episode.id} className="swiper-slide latest-ep-swiper-slide">
              <li>
                <article className="post dfx fcl movies">
                  <div className="post-thumbnail">
                    <figure>
                      <ImageWithFallback loading="lazy" src={episode.image} alt={`Image ${episode.title}`} />
                    </figure>
                    <span className="post-ql" style={{ backgroundColor: 'rgba(0, 0, 0, .7)', fontSize: '.65rem', padding: '0 .5rem', borderRadius: '.2rem' }}>
                      {episode.season}
                    </span>
                    <span className="year">{episode.episodes}</span>
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
                      {episode.title}
                    </h2>
                  </header>
                  <a
                    href={episode.link}
                    className="lnk-blk"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(episode.link);
                    }}
                  ></a>
                </article>
              </li>
            </div>
          ))}
        </div>
        <div className="swiper-pagination"></div>
        <span className="swiper-notification" aria-live="assertive" aria-atomic="true"></span>
      </div>
    </section>
  );
}

export default NewestDrops;
