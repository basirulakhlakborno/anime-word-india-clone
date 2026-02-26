import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/swiper.min.css';
import '../FranchiseLogoSlider/FranchiseLogoSlider.css';
import './NetworkLogoSlider.css';

function NetworkLogoSlider() {
  const swiperRef = useRef(null);
  const containerRef = useRef(null);
  const swiperContainerRef = useRef(null);

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
      if (swiperContainerRef.current && window.Swiper && containerRef.current) {
        containerRef.current.style.opacity = '1';
        containerRef.current.style.visibility = 'visible';
        containerRef.current.classList.add('gs_logo__loaded');

        swiperRef.current = new window.Swiper(swiperContainerRef.current, {
          direction: 'horizontal',
          slidesPerView: 5,
          spaceBetween: 10,
          loop: true,
          freeMode: true,
          freeModeSticky: false,
          allowTouchMove: true,
          touchEventsTarget: 'container',
          resistance: true,
          resistanceRatio: 0,
          watchSlidesProgress: true,
          breakpoints: {
            0: {
              slidesPerView: 4,
              spaceBetween: 5,
            },
            480: {
              slidesPerView: 4,
              spaceBetween: 8,
            },
            640: {
              slidesPerView: 4,
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

  const networks = [
    {
      name: 'Disney Channel',
      image: '/images/disney-300x300.png',
      link: '/category/network/disney-channel/',
    },
    {
      name: 'Hungama TV',
      image: '/images/hungama-300x300.png',
      link: '/category/network/hungama-tv/',
    },
    {
      name: 'Sony Yay',
      image: '/images/sonyay-300x300.png',
      link: '/category/network/sony-yay/',
    },
    {
      name: 'Cartoon Network',
      image: '/images/cartoonnetwork-300x300.png',
      link: '/category/network/cartoon-network/',
    },
    {
      name: 'Prime Video',
      image: '/images/primevideo-300x300.png',
      link: '/category/network/prime-video/',
    },
    {
      name: 'Netflix',
      image: '/images/netflix-300x300.png',
      link: '/category/network/netflix/',
    },
    {
      name: 'Disney+ Hotstar',
      image: '/images/hotstar-300x300.png',
      link: '/category/network/disney/',
    },
    {
      name: 'Crunchyroll',
      image: '/images/crunchyroll-300x300.png',
      link: '/category/network/crunchyroll/',
    },
  ];

  return (
    <section id="block-21" className="wdgt-home widget section widget_block">
      <header className="section-header">
        <div className="rw alg-cr jst-sb">
          <h3 className="section-title">Networks</h3>
        </div>
      </header>
      <p></p>
      <div
        id="gs_logo_area_3"
        data-shortcode-id="3"
        className="gs_logo_area gs_logo_area_3 slider1"
        data-options='{"logo_per_page":"6"}'
        style={{ opacity: 0, visibility: 'hidden' }}
        ref={containerRef}
      >
        <div className="gs_logo_area--inner gs_logo_overflow--hidden">
          <div
            ref={swiperContainerRef}
            className="gs_logo_container gs_carousel_swiper gs_logo_fix_height_and_center swiper-container"
          >
            <div className="swiper-wrapper">
              {networks.map((network, index) => (
                <div
                  key={index}
                  className="gs_logo_single--wrapper swiper-slide"
                >
                  <div className="gs_logo_single gs_logo-single--flex-center">
                    <div className="gs_logo_single--inner">
                      <Link to={network.link}>
                        <img
                          decoding="async"
                          width="300"
                          height="300"
                          src={network.image}
                          className="tt-placement-top tt-bgcolor-one-%23ff5f6d tt-bgcolor-two-%23ffc371 tt-textcolor-%23fff gs-logo--img wp-post-image"
                          alt={network.name}
                          title={network.name}
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <span
              className="swiper-notification"
              aria-live="assertive"
              aria-atomic="true"
            ></span>
          </div>
        </div>
      </div>
      <p></p>
    </section>
  );
}

export default NetworkLogoSlider;
