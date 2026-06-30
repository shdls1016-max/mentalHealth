/* 햄버거 */
const hamburger = document.querySelector('.header--icon-set').children[1];
const menuModal = document.querySelector('.side-menu');
const sideMenuLis = document.querySelectorAll('.side-menu--gnb-li');
const closeSideMenuBtn = menuModal.children[1];



hamburger.addEventListener('click', ()=>{
    menuModal.classList.add('active');
    document.body.classList.add('scroll-lock');
})

closeSideMenuBtn.addEventListener('click', ()=>{
    menuModal.classList.remove('active');
    document.body.classList.remove('scroll-lock');

    sideMenuLis.forEach((li)=>{
        if(li.children[1] && li.children[1].classList.contains('db')){
            li.children[1].classList.remove('db');
        }
    })

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

                const isOpen = lnb.classList.contains('db');

                sideMenuLis.forEach(otherLi =>{
                    if(otherLi !== li){  //내가 클릭한 li가 아니면(내가 클릭한 것의 형제들만 통과)
                        const otherLnb = otherLi.children[1];
                        if(otherLnb){
                            otherLnb.classList.remove('db');
                        }
                    }
                });

                if(isOpen){   //내가 클릭한 li는 여기서 조절
                    lnb.classList.remove('db');
                } else {
                    lnb.classList.add('db');
                }
            }
           
        })
    }
})


