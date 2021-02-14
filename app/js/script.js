// import Swiper JS
import Swiper from 'swiper';
import { gsap } from "gsap";
import { CSSRulePlugin } from "gsap/CSSRulePlugin";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(CSSRulePlugin, ScrollToPlugin);

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

// Анимация для списка ссылок и галереи (Freelance)
let master = document.querySelectorAll(".master");

function openGallery(i){
  let gallary = document.querySelector("#gallary_" + [i]);
  let gallaryPhoto = '#gallary_' + [i] + ' div';
  const openGallery = gsap
    .timeline()
    .to(gallary, {height: 508})
    .to(window, {duration: 1 ,scrollTo: gallary, ease: "power2.inOut"})
    .from(gallaryPhoto, {opacity: 0, scale: 0.8, stagger: 0.1, ease: "power2.inOut"}, '-=0.75');
}

function openCallback(i){
  let callback = document.querySelector("#callback_" + [i]);
  let callbackLink = '#callback_' + [i] + ' a';
  const openCallback = gsap
    .timeline()
    .to(callback, {height: 188})
    .from(callbackLink, {opacity: 0, y: 5, stagger: 0.1}, '-=0.2');

}

for (var i = 0; i < master.length; i++) {
let linkGallary = document.querySelector("#linkGallery_" + [i+1]);
let linkCallback = document.querySelector("#linkCallback_" + [i+1]);
let index = i + 1;

linkGallary.addEventListener("click", () => openGallery(index))
linkCallback.addEventListener("click", () => openCallback(index))
}