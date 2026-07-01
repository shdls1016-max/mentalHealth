/* 서브공통, 브래드크럼 */

const breadgnb = document.querySelector('.breadcrumb--current-gnb');
const breadlnb = document.querySelector('.breadcrumb--current-lnb');

const breadgnbBox = document.querySelector('.breadcrumb--gnb-dropdown');
const breadlnbBox = document.querySelector('.breadcrumb--lnb-dropdown');

if(breadgnb && breadlnb){
    breadgnb.addEventListener('click', (e)=>{
        e.stopPropagation();
        breadgnbBox.classList.toggle('dn');
        breadlnbBox.classList.add('dn');
    })

    breadlnb.addEventListener('click', (e)=>{
        e.stopPropagation();
        breadlnbBox.classList.toggle('dn');
        breadgnbBox.classList.add('dn');
    })

    document.addEventListener('click', (e)=>{
        if(!breadgnbBox.classList.contains('dn') &&  !breadgnbBox.contains(e.target)){
        breadgnbBox.classList.add('dn');    
        }

        if(!breadlnbBox.classList.contains('dn') &&  !breadlnbBox.contains(e.target)){
        breadlnbBox.classList.add('dn');    
        }
    })
    
}


/* 서브1-2 둘러보기 기능 */
const selectedImgTag = document.querySelector('.sub1-2cont--big').children[0];
const selectedImg = document.querySelector('.sub1-2cont--big').children[1];
const forselectList = document.querySelectorAll('.sub1-2cont--smalls > li');

forselectList.forEach((liImg)=>{
    liImg.addEventListener('click', (e)=>{
        const forchangeTag= liImg.children[0].getAttribute('alt');
        const forchangeSrc= liImg.children[0].getAttribute('src');
        const changeTag = forchangeTag.slice(0,-5);
        
        forselectList.forEach((li)=>{
            li.classList.remove('selected');
        })

        selectedImgTag.textContent = changeTag;
        selectedImg.setAttribute('src', forchangeSrc);
        liImg.classList.add('selected');

        
    })

})
