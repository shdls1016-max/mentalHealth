//히어로 슬라이드스와이퍼
let mySwiper = undefined;

function initSwiper(){
    const windowWidth = window.innerWidth;

    if(windowWidth > 810 && mySwiper === undefined){
        mySwiper = new Swiper('.swiper', {
  
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
        disableOnIneraction : false,
        },
        });
    }
    else if (windowWidth <= 810 && mySwiper !== undefined){
        mySwiper.slideTo(0,0);
        mySwiper.destroy(true, true);
        mySwiper = undefind;
    }
}

initSwiper();
window.addEventListener('resize', initSwiper);


/* 햄버거 */
const hamburger = document.querySelector('.header--icon-set').children[1];
const menuModal = document.querySelector('.side-menu');
const sideMenuLis = document.querySelectorAll('.side-menu--gnb-li');
const closeSideMenuBtn = menuModal.children[1];



hamburger.addEventListener('click', ()=>{
    menuModal.classList.add('active');
    document.body.classList.add('scroll-lock');

    if(menuModal.classList.contains('active') && mySwiper !== undefined){
        mySwiper.autoplay.stop();
        mySwiper.allowTouchMove = false;
    } 
})

closeSideMenuBtn.addEventListener('click', ()=>{
    menuModal.classList.remove('active');
    document.body.classList.remove('scroll-lock');

    sideMenuLis.forEach((li)=>{
        if(li.children[1] && li.children[1].classList.contains('db')){
            li.children[1].classList.remove('db');
        }
    })

    if(!menuModal.classList.contains('active') && mySwiper !== undefined){
        mySwiper.allowTouchMove = true;
        mySwiper.update();
        mySwiper.autoplay.start();
    }
})


menuModal.addEventListener('click', (e)=>{
    e.stopPropagation();

    if(menuModal.classList.contains('active') && menuModal === e.target){
        menuModal.classList.remove('active');
        document.body.classList.remove('scroll-lock');

        sideMenuLis.forEach(li => {
            if(li.children[1] && li.children[1].classList.contains('db')){
                li.children[1].classList.remove('db');
            }
        });

        if(!menuModal.classList.contains('active') && mySwiper !== undefined){
            mySwiper.allowTouchMove = true;
            mySwiper.update();
            mySwiper.autoplay.start();
        }
    }
})


/* 아코디언처럼 만들기 하나 누르면 기존거 닫히게 */
sideMenuLis.forEach((li)=>{
    const gnbA = li.children[0];
    const lnb = li.children[1];

    if(gnbA && lnb){
        gnbA.addEventListener('click', (e)=>{
            if(window.matchMedia('(hover:none)').matches){
                e.preventDefault();
                e.stopPropagation();

                sideMenuLis.forEach(l => l.children[1].classList.remove('db'))
                lnb.classList.add('db');
            }
           
        })
    }
})






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
const sect2ContentLines = document.querySelectorAll('.sect2-cont-indi');
const sect2txtset = document.querySelectorAll('.sect2-cont--txt-set');

let circleTimers = [];
let mosect2timer = [];
let isMobile = window.innerWidth <= 600;

function resetAllEffects(){
    circleTimers.forEach(timer=>clearTimeout(timer));
    mosect2timer.forEach(timer=>clearTimeout(timer));
    circleTimers = [];
    mosect2timer = [];

    // 2. PC용 클래스 제거
    sect2Circle.forEach(circle => circle.classList.remove('opacity1'));
    if (!sect2txtset[0].classList.contains('opacity0')) {
        sect2txtset[0].classList.add('opacity0');
    }
    const txtexcept1 = [...sect2txtset].slice(1);
    txtexcept1.forEach(txt => txt.classList.remove('up'));

    // 3. 모바일용 클래스 제거
    sect2ContentLines.forEach(line => line.classList.remove('mo_up'));
}

function handleResize(){
    const currentIsMobile = window.innerWidth <= 600;
    
    if(isMobile !== currentIsMobile){
        isMobile = currentIsMobile;
        resetAllEffects();
    }
}


window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    const effectpoint = Number(sect2Start) - (Number(viewportHeight) * 0.8);

    if (!isMobile) {
        const txtexcept1 = [...sect2txtset].slice(1);
        if(!sect2txtset[0].classList.contains('opacity0')){
            sect2txtset[0].classList.add('opacity0');
        }
        if (currentScroll >= effectpoint) {
            if (circleTimers.length === 0) {
                sect2Circle.forEach((circle, i) => {
                    const timerId = setTimeout(() => {
                        circle.classList.add('opacity1');
                    }, i * 400); 
                    circleTimers.push(timerId);
                });
            }

            sect2txtset[0].classList.remove('opacity0');
            txtexcept1.forEach(txt => txt.classList.add('up'));
        } else {
            // 효과 제거
            circleTimers.forEach(timer => clearTimeout(timer));
            circleTimers = [];
            sect2Circle.forEach(circle => circle.classList.remove('opacity1'));
            sect2txtset[0].classList.add('opacity0');
            txtexcept1.forEach(txt => txt.classList.remove('up'));
        }

    } else {
        /* 모바일*/
        sect2txtset[0].classList.remove('opacity0');
        if (currentScroll >= effectpoint) {
            if (mosect2timer.length === 0) {
                sect2ContentLines.forEach((line, idx) => {
                    const timerId = setTimeout(() => {
                        line.classList.add('mo_up');
                    }, idx * 400);
                    mosect2timer.push(timerId);
                });
            }
        } else {
            mosect2timer.forEach(timer => clearTimeout(timer));
            mosect2timer = []; 
            
            sect2ContentLines.forEach(line => {
                line.classList.remove('mo_up');
            });
        }
    }
});

// 초기 실행
handleResize();
window.addEventListener('resize', handleResize);

    



/* gsap */
document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger)
  // gsap code here!
    const sect3Timeline = gsap.timeline();

    sect3Timeline
        .from(".sect3--txt-set--title", { x: -50, opacity: 0, duration: 0.8, clearProps: "all" })
        .from(".sect3--txt-set--cont > div:nth-child(1)", { y: 30, opacity: 0, duration: 0.6, clearProps: "all" }, "+=0.02")
        .from(".sect3--txt-set--cont > div:nth-child(2)", { y: 30, opacity: 0, duration: 0.6, clearProps: "all" }, "+=0.05");



    ScrollTrigger.create({
        trigger : ".main-section-box > .sect3",
        start : "top 70%",
        end : "bottom 80%",
        
        onEnter : () => sect3Timeline.restart(),
        onLeaveBack: () => sect3Timeline.pause(0)
    });


    let section4 = gsap.matchMedia();

    section4.add("(min-width:1181px)", ()=>{
        const sect4Timeline = gsap.timeline(); 

        sect4Timeline.from(".sect4--txt-set--cont > li:nth-of-type(1)", {y : 20, opacity : 0, duration : 0.5, clearProps: "all"})
        sect4Timeline.from(".sect4--txt-set--cont > li:nth-of-type(2)", {y : 20, opacity : 0, duration : 0.5, clearProps: "all"}, "+=0.1")
        sect4Timeline.from(".sect4--txt-set--cont > li:nth-of-type(3)", {y : 20, opacity : 0, duration : 0.5, clearProps: "all"}, "+=0.1")
        sect4Timeline.from(".sect4--txt-set--cont > li:nth-of-type(4)", {y : 20, opacity : 0, duration : 0.5, clearProps: "all"}, "+=0.1");

        ScrollTrigger.create({
            trigger : ".main-section-box > .sect4",
            start : "top 70%",
            end : "bottom 85%",

            onEnter: ()=>sect4Timeline.restart(),
            onLeaveBack: ()=>sect4Timeline.pause(0)
        })

    })
   
    section4.add("(max-width:1180px)", ()=>{
        const sect4MoTimeline = gsap.timeline(); 

        sect4MoTimeline.from(".sect4--txt-set--cont > li:nth-of-type(1)", {y : 20, opacity : 0, duration : 0.5, clearProps: "all"})
        sect4MoTimeline.from(".sect4--txt-set--cont > li:nth-of-type(2)", {y : 20, opacity : 0, duration : 0.5, clearProps: "all"}, "+=0.1")
        sect4MoTimeline.from(".sect4--txt-set--cont > li:nth-of-type(3)", {y : 20, opacity : 0, duration : 0.5, clearProps: "all"}, "+=0.1")
        sect4MoTimeline.from(".sect4--txt-set--cont > li:nth-of-type(4)", {y : 20, opacity : 0, duration : 0.5, clearProps: "all"}, "+=0.1");

        ScrollTrigger.create({
            trigger : ".sect4--txt-set--cont",
            start : "top 84%",
            end : "bottom 96%",

            onEnter: ()=>sect4MoTimeline.restart(),
            onLeaveBack: ()=>sect4MoTimeline.pause(0)
        });

    })




});












