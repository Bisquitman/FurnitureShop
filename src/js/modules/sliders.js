import '../../libs/swiper/swiper-bundle.min.js';

const sliders = () => {
  // BuildSlider
  const sliders = document.querySelectorAll('._swiper');

  if (sliders) {
    for (let i = 0; i < sliders.length; i++) {
      const slider = sliders[i];

      if (!slider.classList.contains('swiper-bild')) {
        let slider_items = slider.children;

        if (slider_items) {
          for (let i = 0; i < slider_items.length; i++) {
            const el = slider_items[i];
            el.classList.add('swiper-slide');
          }
        }
        let slider_content = slider.innerHTML;
        let slider_wrapper = document.createElement('div');
        slider_wrapper.classList.add('swiper-wrapper');
        slider_wrapper.innerHTML = slider_content;
        slider.innerHTML = '';
        slider.appendChild(slider_wrapper);
        slider.classList.add('swiper-bild');

        if (slider.classList.contains('_swiper_scroll')) {
          let sliderScroll = document.createElement('div');
          sliderScroll.classList.add('swiper-scrollbar');
          slider.appendChild(sliderScroll);
        }
      }

      if (slider.classList.contains('_gallery')) {
        // slider.data('lightGallery').destroy.true;
      }
    }
    sliders_bild_callback();
  }

  function sliders_bild_callback(params) {}

  const sliderScrollItems = document.querySelectorAll('._swiper_scroll');
  if (sliderScrollItems.length > 0) {
    for (let i = 0; i < sliderScrollItems.length; i++) {
      const sliderScrollItem = sliderScrollItems[i];
      const sliderScrollBar =
        sliderScrollItem.querySelector('.swiper-scrollbar');
      const sliderScroll = new Swiper(sliderScrollItem, {
        observer: true,
        observeParents: true,
        direction: 'vertical',
        slidesPerView: 'auto',
        freeMode: true,
        scrollbar: {
          el: sliderScrollBar,
          draggable: true,
          snapOnRelease: false,
        },
        mousewheel: {
          releaseOnEdges: true,
        },
      });
      sliderScroll.scrollbar.updateSize();
    }
  }
  function sliders_bild_callback(params) {}

  
  if (document.querySelector('.slider-main__body')) {
    new Swiper('.slider-main__body', {
      observer: true,
      observeParents: true,
      slidesPerView: 1,
      spaceBetween: 32,
      watchOverflow: true,
      speed: 800,
      loop: true,
      loopAdditionalSlides: 5,
      preloadImages: false,
      parallax: true,
      // Dots
      pagination: {
        el: '.controls-slider-main__dots',
        clickable: true,
      },
      // Arrows
      navigation: {
        nextEl: '.slider-main .slider-arrow_next',
        prevEl: '.slider-main .slider-arrow_prev',
      },
    });
  }
  
  if (document.querySelector('.slider-rooms__body')) {
    new Swiper('.slider-rooms__body', {
      observer: true,
      observeParents: true,
      slidesPerView: 'auto',
      spaceBetween: 24,
      speed: 800,
      loop: true,
      watchOverflow: true,
      loopAdditionalSlides: 5,
      preloadImages: false,
      parallax: true,
      // Dots
      pagination: {
        el: '.slider-rooms__dots',
        clickable: true,
      },
      // Arrows
      navigation: {
        nextEl: '.slider-rooms .slider-arrow_next',
        prevEl: '.slider-rooms .slider-arrow_prev',
      },
    });
  }
  
  if (document.querySelector('.slider-tips__body')) {
    new Swiper('.slider-tips__body', {
      observer: true,
      observeParents: true,
      // slidesPerView: 3,
      // spaceBetween: 32,
      speed: 800,
      loop: true,
      watchOverflow: true,
      // Dots
      pagination: {
        el: '.slider-tips__dots',
        clickable: true,
      },
      // Arrows
      navigation: {
        nextEl: '.slider-tips .slider-arrow_next',
        prevEl: '.slider-tips .slider-arrow_prev',
      },
      breakpoints: {
        320: {
          slidesPerView: 1.1,
          spaceBetween: 15,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        992: {
          slidesPerView: 3,
          spaceBetween: 32,
        },
      },
    });
  }
};

export default sliders;
