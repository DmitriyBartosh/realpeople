// import Swiper JS
import Swiper from 'swiper';
import SwiperCore, { Navigation, Pagination, Lazy } from 'swiper/core';
import { gsap } from "gsap";
import { CSSRulePlugin } from "gsap/CSSRulePlugin";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(CSSRulePlugin, ScrollToPlugin);

// Высота мобильного браузера
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

window.addEventListener('resize', () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});

// Запретить Scale
document.addEventListener('touchmove', function(event) {
  event = event.originalEvent || event;
  if(event.scale > 1) {
    event.preventDefault();
  }
}, false);

// Анимация для списка ссылок и галереи (Freelance)
let openButton = document.querySelectorAll(".master__link__openNavButton");
let linksMaster = document.querySelectorAll(".master__nav");
let links = [];

// Добавление слушателя событий на кнопки открыть навигацию
for (let i = 0; i < openButton.length; i++) {
  // Создание анимации для открытия навигации
  links[i] = linksMaster[i].querySelectorAll('.master__nav__button');

  var openNavTl = gsap.timeline({paused: true, reversed: true});

  openNavTl
    .to(linksMaster[i], {height: 108, duration: 0.20})
    .from(links[i], {opacity: 0, scale: 0.9, stagger: {from: "random", amount: 0.2, ease: "circ.out"}}, '-=0.1');

  linksMaster[i].anim = openNavTl;

  openButton[i].addEventListener('click', function(e){
    e.preventDefault();
    this.classList.toggle('active');

    linksMaster[i].anim.reversed() ? linksMaster[i].anim.play() : linksMaster[i].anim.reverse();
  });
}

// Слайдер для историй
let storyBlock = document.querySelectorAll(".storyBlock");
let sliderStory = document.querySelectorAll(".storyBlock__content");
let masterAvatar = document.querySelectorAll(".storyOpen");
let closeStory = document.querySelectorAll(".closeButton");
let swipersliderStory = [];

if(sliderStory){
  SwiperCore.use([Navigation, Pagination, Lazy]);
  for(let i = 0; i < sliderStory.length; i++) {
    sliderStory[i].id = 'storyContent_' + [i];
    storyBlock[i].id = 'story_' + [i];

    var swiperContainer = document.querySelector('#storyContent_' + [i]);
    swipersliderStory[i] = new Swiper(swiperContainer, {
      preloadImages: false,
      init: false,
      lazy: {
        loadPrevNext: true,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });

    var openStoryTl = gsap.timeline({paused: true, reversed: true});

    openStoryTl
      .to('#story_' + [i], {scale: 1, autoAlpha: 1, duration: 0.2});
  
    storyBlock[i].anim = openStoryTl;

    masterAvatar[i].addEventListener('click', function(e){
      e.preventDefault();
      swipersliderStory[i].init();
      storyBlock[i].anim.play();

      var video = storyBlock[i].querySelector('video');

      if(video){
        var iconClose = new Image();
        iconClose.src = '../img/icon/volume_up.svg';
        
        if(swipersliderStory[i].activeIndex == 0){
          video.play();
        }
        swipersliderStory[i].on('realIndexChange', function() {
          if(swipersliderStory[i].activeIndex == 0){
            video.play();
          }
          else{
            video.pause();
            video.currentTime = 0;
          }
         });
      }
    })

    closeStory[i].addEventListener('click', function(e){
      e.preventDefault();
      storyBlock[i].anim.reverse();

      var video = storyBlock[i].querySelector('video');

      if(video){
        if(swipersliderStory[i].activeIndex == 0){
          video.pause();
          video.currentTime = 0;
        }
      }
    })
  }

  // Звук на историях
  let sound = document.querySelectorAll('.sound');
  let allVideo = document.querySelectorAll('video');

  for(let i = 0; i < sound.length; i++){
    sound[i].addEventListener('click', function(e){
      e.preventDefault();

      if(this.classList.contains('on')){
        for(let i = 0; i < sound.length; i++){
          sound[i].classList.toggle('on');
          allVideo[i].muted = true;
        }
      }
      else{
        for(let i = 0; i < sound.length; i++){
          sound[i].classList.toggle('on');
          allVideo[i].muted = false;
        }
      }
      
    })}
}

// Открыть Цена
let priceBlock = document.querySelectorAll(".priceBlock");
let priceButton = document.querySelectorAll(".price");
let closePrice = document.querySelectorAll(".closePrice");

for(let i = 0; i < priceBlock.length; i++){
  priceBlock[i].id = 'priceBlock_' + [i];
  
  var openPriceTl = gsap.timeline({defaults:{duration: 1}, paused: true, reversed: true});

  openPriceTl
      .set('#priceBlock_' + [i], {display: 'flex'})
      .to('#priceBlock_' + [i], {clipPath: 'circle(100%)'})
      .from('#priceBlock_' + [i] + ' .priceBlock__container .priceBlock__cost', {opacity: 0, y: 30, stagger: 0.1, ease: "back.out(1.7)"}, "-=0.8");
  
  priceBlock[i].anim = openPriceTl;

  priceButton[i].addEventListener('click', function(){
    priceBlock[i].anim.timeScale(1);
    priceBlock[i].anim.play();
  })
  closePrice[i].addEventListener('click', function(){
    priceBlock[i].anim.timeScale(2);
    priceBlock[i].anim.reverse();
  })
}

// Слайдер для Популярных товаров
let sliderPopularProduct = document.querySelector('.serviceContent__popularProduct');

if(sliderPopularProduct){
const swiperPopularProduct = new Swiper(sliderPopularProduct, {
  slidesPerView: 3.5,
  spaceBetween: 10,
  slidesOffsetBefore: 10,
  slidesOffsetAfter: 10,
  grabCursor: true,
})
}

// Видео в стори


// Добавить слайдер для Подкатегорий
let sliderCategoryNav = document.querySelector('.categoryNav__container');

if(sliderCategoryNav){
const swiperCategoryNav = new Swiper(sliderCategoryNav, {
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