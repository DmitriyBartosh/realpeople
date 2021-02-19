// import Swiper JS
import Swiper from 'swiper';
import { gsap } from "gsap";
import { CSSRulePlugin } from "gsap/CSSRulePlugin";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(CSSRulePlugin, ScrollToPlugin);

// Анимация для списка ссылок и галереи (Freelance)
let openButton = document.querySelectorAll(".master__link__openNavButton");
let linksMaster = document.querySelectorAll(".master__nav");
let messengerMaster = document.querySelectorAll(".messenger");

// Добавление слушателя событий на кнопки открыть навигацию и открыть мессенджер
for (var i = 0; i < openButton.length; i++) {
  openButton[i].id = 'masterOpenButton_' + [i];
  linksMaster[i].id = 'linksMaster_' + [i];
  messengerMaster[i].id = 'messenger_' + [i];

  var openNavigation = document.querySelector('#masterOpenButton_' + [i]);
  var openMessenger = document.querySelector('#messenger_' + [i]);

  let index = i;
  openNavigation.addEventListener("click", () => openNav(index));
  openMessenger.addEventListener("click", () => openMess(index));
}

// Открыть навигацию анкеты
function openNav(i){
  var linkNav = document.querySelector("#linksMaster_" + [i]);
  var childLinkNav = '#linksMaster_' + [i] + ' a';
  var linkIconNav = '#masterOpenButton_' + [i] + ' img';

  const openNav = gsap
    .timeline()
    .to(linkIconNav, {rotate: 45})
    .to(linkNav, {height: 105}, "<")
    .from(childLinkNav, {opacity: 0, scale: 0.9, stagger: {from: "random", amount: 0.5}}, '-=0.2');
}

// Открыть мессенджер
function openMess(i){
  var linkMess = document.querySelector("#callback_" + [i]);
  var childLinkMess = '#callback_' + [i] + ' a';
  var childLinkNav = '#linksMaster_' + [i] + ' a';
  var linkIconMess = '#messenger_' + [i];

  const openMess = gsap
    .timeline()
    .to(childLinkNav, {opacity: 0.2, stagger: 0.1})
    .set(linkIconMess, {opacity: 1}, '<')
    .to(linkMess, {height: 84}, "<")
    .from(childLinkMess, {opacity: 0, y: -5, stagger: {from: "random", amount: 0.5}}, '-=0.2');
}

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