import { useEffect, useRef } from 'react';
import '../../styles/swiper.min.css';
import '../FranchiseLogoSlider/FranchiseLogoSlider.css';
import './LanguageLogoSlider.css';

function LanguageLogoSlider() {
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
              slidesPerView: 3,
              spaceBetween: 5,
            },
            480: {
              slidesPerView: 3,
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

  const languages = [
    {
      name: 'Korean',
      image: '/images/Pos_Kor-209x300.png',
      link: '/category/language/korean/',
    },
    {
      name: 'Japanese',
      image: '/images/Pos_Jap-209x300.png',
      link: '/category/language/japanese/',
    },
    {
      name: 'English',
      image: '/images/Pos_Eng-209x300.png',
      link: '/category/language/english/',
    },
    {
      name: 'Kannada',
      image: '/images/Pos_Kan-209x300.png',
      link: '/category/language/kannada/',
    },
    {
      name: 'Malayalam',
      image: '/images/Pos_Mal-209x300.png',
      link: '/category/language/malayalam/',
    },
    {
      name: 'Bengali',
      image: '/images/Pos_Ben-209x300.png',
      link: '/category/language/bengali/',
    },
    {
      name: 'Telugu',
      image: '/images/Pos_Tel-209x300.png',
      link: '/category/language/telugu/',
    },
    {
      name: 'Tamil',
      image: '/images/Pos_Tam-209x300.png',
      link: '/category/language/tamil/',
    },
    {
      name: 'Hindi',
      image: '/images/Pos_Hin-209x300.png',
      link: '/category/language/hindi/',
    },
  ];

  return (
    <section id="block-32" className="wdgt-home widget section widget_block">
      <header className="section-header">
        <div className="rw alg-cr jst-sb">
          <h3 className="section-title">Stream in Your Language</h3>
        </div>
      </header>
      <p></p>
      <div
        id="gs_logo_area_4"
        data-shortcode-id="4"
        className="gs_logo_area gs_logo_area_4 slider1"
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
              {languages.map((language, index) => (
                <div
                  key={index}
                  className="gs_logo_single--wrapper swiper-slide"
                >
                  <div className="gs_logo_single gs_logo-single--flex-center">
                    <div className="gs_logo_single--inner">
                      <a
                        href={language.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          decoding="async"
                          width="209"
                          height="300"
                          src={language.image}
                          className="tt-placement-top tt-bgcolor-one-%23ff5f6d tt-bgcolor-two-%23ffc371 tt-textcolor-%23fff gs-logo--img wp-post-image"
                          alt={`Lang-${language.name}`}
                          title={`Lang-${language.name}`}
                        />
                      </a>
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

export default LanguageLogoSlider;
