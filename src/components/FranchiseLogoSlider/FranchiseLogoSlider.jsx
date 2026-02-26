import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/swiper.min.css';
import './FranchiseLogoSlider.css';

function FranchiseLogoSlider() {
  const swiperRef = useRef(null);
  const containerRef = useRef(null);
  const swiperContainerRef = useRef(null);

  useEffect(() => {
    // Load Swiper dynamically
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
        // Show the container
        containerRef.current.style.opacity = '1';
        containerRef.current.style.visibility = 'visible';
        containerRef.current.classList.add('gs_logo__loaded');

        // Initialize Swiper
        swiperRef.current = new window.Swiper(swiperContainerRef.current, {
          direction: 'horizontal',
          slidesPerView: 3,
          spaceBetween: 10,
          loop: false,
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

  const franchises = [
    {
      name: 'Doraemon',
      image: '/images/Doraemon-182x300.png',
      link: '/category/franchise/doraemon/',
    },
    {
      name: 'Beyblade',
      image: '/images/Beyblade-182x300.png',
      link: '/category/franchise/beyblade/',
    },
    {
      name: 'Transformers',
      image: '/images/Transformers-182x300.png',
      link: '/category/franchise/transformers/',
    },
    {
      name: 'Shinchan',
      image: '/images/Shinchan-182x300.png',
      link: '/category/franchise/shinchan/',
    },
    {
      name: 'Dragon Ball',
      image: '/images/Dragonball-182x300.png',
      link: '/category/franchise/dragon-ball/',
    },
    {
      name: 'Pokemon',
      image: '/images/Pokemon-182x300.png',
      link: '/category/franchise/pokemon/',
    },
    {
      name: 'Ben 10',
      image: '/images/Ben-10-182x300.png',
      link: '/category/franchise/ben-10/',
    },
    {
      name: 'Naruto',
      image: '/images/Naruto-2-182x300.png',
      link: '/category/franchise/naruto/',
    },
  ];

  return (
    <section id="block-10" className="wdgt-home widget section widget_block">
      <p></p>
      <div
        id="gs_logo_area_2"
        data-shortcode-id="2"
        className="gs_logo_area gs_logo_area_2 slider1"
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
              {franchises.map((franchise, index) => (
                <div
                  key={index}
                  className="gs_logo_single--wrapper swiper-slide"
                >
                  <div className="gs_logo_single gs_logo-single--flex-center">
                    <div className="gs_logo_single--inner">
                      <Link to={franchise.link}>
                        <img
                          decoding="async"
                          width="182"
                          height="300"
                          src={franchise.image}
                          className="tt-placement-top tt-bgcolor-one-%23ff5f6d tt-bgcolor-two-%23ffc371 tt-textcolor-%23fff gs-logo--img wp-post-image"
                          alt={franchise.name}
                          title={franchise.name}
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

export default FranchiseLogoSlider;
