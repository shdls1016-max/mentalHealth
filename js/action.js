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



/* 메인페이지 섹션1 아코디언 */
let accordion_subjects = document.querySelectorAll('.accordion--subject');
let accordion_conts = document.querySelectorAll('.accordion--cont');

accordion_subjects.forEach((subject, idx)=>{    
    
    subject.addEventListener('click', (e)=>{
        accordion_subjects.forEach((s)=>{
            s.children[1].classList.remove('rotate180_effect');  
            s.children[1].classList.add('rotate360_effect'); 
        });   //모든 아코디언 아이콘 원상태로
        
        accordion_conts.forEach((cont)=>{
            cont.classList.add('dn');
            cont.classList.remove('db');
        });   //모든 내용 닫기


        if(subject.contains(e.target)){
            //클릭한 아이콘만 뒤집히게
            subject.children[1].classList.add('rotate180_effect');
            subject.children[1].classList.remove('rotate360_effect'); 

            //클릭한 제목의 내용만 열리게
            subject.nextElementSibling.classList.add('db');
            subject.nextElementSibling.classList.remove('dn');
            
            //이미지 변경
            const imgnamevariable = Number(idx)+1
            document.querySelector('.sect1--img').children[0].setAttribute('src',`img/SECT1-${imgnamevariable}IMG.jpg`);

        }    

    })
    
});

