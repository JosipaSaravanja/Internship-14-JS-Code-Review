function writeCode(code){   
    code.forEach((el, id) => {
        const codeBlock=document.getElementsByClassName('code-block')[0]
        const codeLine=document.createElement('div');
        codeLine.className='code-line'

        const ordNumb=document.createElement('div');
        ordNumb.className='ord-number'

        ordNumb.innerHTML=`${id+1}.`;
        ordNumb.addEventListener('mouseover', ()=>{ordNumb.innerHTML="+"})
        ordNumb.addEventListener('mouseleave', ()=>{ordNumb.innerHTML=`${id+1}.`;})
        ordNumb.addEventListener('click', ()=>openOverlay(id+1))
        codeLine.appendChild(ordNumb)
        
        const text=document.createElement('div');
        text.className='code-line-text'
        text.innerHTML=el;
        codeLine.appendChild(text)

        codeBlock.appendChild(codeLine)
    });
}