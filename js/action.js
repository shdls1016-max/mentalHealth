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
const accordion_subjects = document.querySelectorAll('.accordion--subject');
const accordion_conts = document.querySelectorAll('.accordion--cont');

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



/* 메인페이지 섹션2 애니메이션 */
const sect2Start = document.querySelector('.main-section-box').children[1].offsetTop;
const viewportHeight = window.innerHeight;
const sect2Circle = document.querySelectorAll('.sect2-cont--deco-circle');
const sect2txtset = document.querySelectorAll('.sect2-cont--txt-set');

let circleTimers = [];

function showcircles(){
    circleTimers.forEach((timer)=>{clearTimeout(timer)})
    circleTimers = [];

    sect2Circle.forEach((circle, i) => {
        const timerId = setTimeout(() => {
            circle.classList.add('opacity1');
        }, i * 400); 
        //타이머아이디에는 해당 타이머가 몇번째로 실행될지 자연수가 들어감
        circleTimers.push(timerId);   //몇개의 타이머가 쌓였는지 확인할 수있게 생성즉시 리스트에 추가
    });
}

function hiddencircles(){
    circleTimers.forEach(timer => clearTimeout(timer));  //예약걸린 타이머제거
    circleTimers = [];  //타이머리스트리셋

    sect2Circle.forEach((circle) => {
        circle.classList.remove('opacity1');
    });
}


window.addEventListener('scroll', ()=>{
    const currentScroll = window.scrollY;
    const effectpoint = Number(sect2Start) - (Number(viewportHeight)/2)

    const txtexcept1 = [...sect2txtset].slice(1);
    
    

    if(currentScroll >=  effectpoint){
        console.log('효과시작')       
        showcircles()

        if(sect2txtset[0].classList.contains('opacity0')){
            sect2txtset[0].classList.remove('opacity0')
        }
        

        txtexcept1.forEach((txt)=>{
            if(!txt.classList.contains('up')){
                txt.classList.add('up');
            }
        })

    } else{
        console.log('효과제거')
        hiddencircles()

        if(!sect2txtset[0].classList.contains('opacity0')){
            sect2txtset[0].classList.add('opacity0')
        }
        

        txtexcept1.forEach((txt)=>{
            if(txt.classList.contains('up')){
                txt.classList.remove('up');
            }
        })
    }
})


