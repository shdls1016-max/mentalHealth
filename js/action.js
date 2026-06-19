//히어로 슬라이드스와이퍼

const swiper = new Swiper('.swiper', {
  
  loop: true,
  direction: 'horizontal',
  slidesPerView: 1,       // 한 번에 보여줄 슬라이드 개수
  spaceBetween: 0,

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

   autoplay: {
   delay: 5000,
 },


});

