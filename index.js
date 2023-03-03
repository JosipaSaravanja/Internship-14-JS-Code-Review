function closeOverlay(){
    document.getElementsByClassName("overlay")[0].style.display = "none";
}

function openOverlay(){
    document.getElementsByClassName("overlay")[0].style.display = "block";
}

const code=['alert("1")', 'alert("2")', 'alert("3")', 'alert("4")', 'alert("5")', 'alert("6")', 'alert("7")', 'alert("8")', 'alert("9")', 'alert("10")']

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
        ordNumb.addEventListener('click', ()=>openOverlay())
        codeLine.appendChild(ordNumb)
        
        const text=document.createElement('div');
        text.className='code-line-text'
        text.innerHTML=el;
        codeLine.appendChild(text)

        codeBlock.appendChild(codeLine)
    });
}
writeCode(code)


class Comment{
    constructor(lineNumber, author, text, isLiked){
        this.line=lineNumber;
        this.author=author;
        this.text=text;
        this.isLiked=isLiked;
        this.date=new Date()

        const line=document.getElementsByClassName('code-line')[lineNumber]
        const newComment=document.createElement('div')
        newComment.className="comment"

        const newAuthor=document.createElement('h3')
        newAuthor.innerHTML=author;

        const newDate=document.createElement('p')
        newDate.innerHTML=new Date().getFullYear() + "/" + (new Date().getMonth() + 1) + "/" + new Date().getDate();;

        const newText=document.createElement('p');
        newText.innerHTML=text;

        const newIcons=document.createElement('div');
        const likeIcon=document.createElement('i');
        likeIcon.classList="like fa fa-thumbs-up"
        likeIcon.style="font-size: 25px"
        newIcons.appendChild(likeIcon)
        isLiked===true?likeIcon.style.color='blue':likeIcon.style.color='black';

        const deleteIcon=document.createElement('i');
        deleteIcon.classList="delete fa fa-trash-o"
        deleteIcon.style="font-size: 25px"
        newIcons.appendChild(deleteIcon)

        newComment.appendChild(newAuthor)
        newComment.appendChild(newDate)
        newComment.appendChild(newText)
        newComment.appendChild(newIcons)
        line.after(newComment)
        
        likeIcon.addEventListener('click', ()=>{
            if(this.isLiked===true){
                this.isLiked=false
                likeIcon.style.color='black'
            }
            else
            {
                this.isLiked=true
                likeIcon.style.color='blue'
            }     
            console.log(this)})

        deleteIcon.addEventListener('click', ()=>{ newComment.style.display='none';})
    }
}


console.log(new Comment(3, 'Josipa', 'neki komentar ', false)) //4 linija (4-1)
console.log(new Comment(5, 'Josipa2', 'neki drugi komentar ', false)) //6 linija (6-1)