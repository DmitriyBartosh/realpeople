// import Swiper JS
import Swiper from 'swiper';
import { gsap } from "gsap";
import { CSSRulePlugin } from "gsap/CSSRulePlugin";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(CSSRulePlugin, ScrollToPlugin);

// Анимация для списка ссылок и галереи (Freelance)
let master = document.querySelectorAll(".master");

function openCallback(i){
  let callback = document.querySelector("#callback_" + [i]);
  let callbackLink = '#callback_' + [i] + ' a';
  const openCallback = gsap
    .timeline()
    .to(callback, {height: 188})
    .from(callbackLink, {opacity: 0, y: 5, stagger: 0.1}, '-=0.2');
}

for (var i = 0; i < master.length; i++) {
let linkCallback = document.querySelector("#linkCallback_" + [i+1]);
let index = i + 1;

linkCallback.addEventListener("click", () => openCallback(index))
}

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