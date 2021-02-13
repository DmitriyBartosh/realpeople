// import Swiper JS
import Swiper from 'swiper';
import gsap from "gsap";

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
  let gallaryPhoto = document.querySelector("#gallary_" + [i]).childNodes;
  const openGallery = gsap
    .timeline()
    .set(gallary, {height: 508});
}

function openCallback(i){
  let callback = document.querySelector("#callback_" + [i]);
  let callbackLink = document.querySelector("#callback_" + [i]).childNodes;
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