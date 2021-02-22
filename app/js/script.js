// import Swiper JS
import Swiper from 'swiper';
import { gsap } from "gsap";
import { CSSRulePlugin } from "gsap/CSSRulePlugin";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(CSSRulePlugin, ScrollToPlugin);

// Анимация для списка ссылок и галереи (Freelance)
let openButton = document.querySelectorAll(".master__link__openNavButton");
let linksMaster = document.querySelectorAll(".master__nav");
let links = [];

// Добавление слушателя событий на кнопки открыть навигацию и открыть мессенджер
for (let i = 0; i < openButton.length; i++) {
  links[i] = linksMaster[i].querySelectorAll('.master__nav__button');

  var openNavTl = gsap.timeline({paused: true, reversed: true});
    
  openNavTl
    .to(linksMaster[i], {height: 108})
    .from(links[i], {opacity: 0, scale: 0.9, stagger: {from: "end", amount: 0.5}}, '-=0.3');

  linksMaster[i].anim = openNavTl;

  openButton[i].addEventListener('click', function(e){
    e.preventDefault();
    this.classList.toggle('active');

    linksMaster[i].anim.reversed() ? linksMaster[i].anim.play() : linksMaster[i].anim.reverse();
  });
}

// var openNav = gsap.timeline()
//   .to('#navContent_0', {height: 108})
//   .from('#navContent_0 .master__nav__button', {opacity: 0, scale: 0.9, stagger: {from: "end", amount: 0.5}}, '-=0.3');
// openNav.pause();

// Добавить слайдер для Подкатегорий
let swiperContainer = document.querySelector('.categoryNav__container');

if(swiperContainer){
  console.log('SwiperInit');
const swiper = new Swiper(swiperContainer, {
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
}