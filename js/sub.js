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