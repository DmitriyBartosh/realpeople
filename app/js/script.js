// import Swiper JS
import Swiper from 'swiper';

const swiper = new Swiper('.categoryNav__container', {
  spaceBetween: 15,
  freeMode: true,
  breakpoints: {
    320: {
      slidesPerView: 2,
    },
    370: {
      slidesPerView: 3,
    },
    640: {
      slidesPerView: 4,
    }
  }
});
