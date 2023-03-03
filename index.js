
const notes = JSON.parse(localStorage.getItem("notes"));
const code=['alert("1")', 'alert("2")', 'alert("3")', 'alert("4")', 'alert("5")', 'alert("6")', 'alert("7")', 'alert("8")', 'alert("9")', 'alert("10")']
let count=Number()
if(!notes){
    count=0
}else {
    count=notes[notes.length-1].id
}


function closeOverlay(){
    document.getElementsByClassName("overlay")[0].style.display = "none";
}

function openOverlay(line){
    document.getElementsByClassName("overlay")[0].style.display = "block";
    document.getElementById("comment-button").addEventListener('click', ()=>{
        const autor=document.getElementById("autor");
        const komentar=document.getElementById("komentar");
        new Comment(line, autor.value, komentar.value, false).save(); //KAKo ces promjene likeova?
        komentar.value="";
        location.reload();
        closeOverlay()
    });
    
    document.getElementById("notes-button").addEventListener('click', ()=>{
        const komentar=document.getElementById("komentar");
        count++
        new Note(count, line, komentar.value, false).save(); 
        komentar.value="";
        location.reload()
        closeOverlay()});
}


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
        ordNumb.addEventListener('click', ()=>openOverlay(id))
        codeLine.appendChild(ordNumb)
        
        const text=document.createElement('div');
        text.className='code-line-text'
        text.innerHTML=el;
        codeLine.appendChild(text)

        codeBlock.appendChild(codeLine)
    });
}
writeCode(code)


class Note{
    constructor(id, lineNumber, text, isLiked){
        this.id=JSON.parse(JSON.stringify(id));
        this.line=lineNumber+1;
        this.text=text;
        this.isLiked=isLiked;
        this.date=new Date()

        const line=document.getElementsByClassName('code-line')[lineNumber]
        const newComment=document.createElement('div')
        newComment.className="comment"
        newComment.style.backgroundColor="pink"

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

        newComment.appendChild(newDate)
        newComment.appendChild(newText)
        newComment.appendChild(newIcons)
        line.after(newComment)
        
        likeIcon.addEventListener('click', ()=>{
            if(this.isLiked===true){
                this.isLiked=false
                likeIcon.style.color='black'
                this.update(false)
            }
            else
            {
                this.isLiked=true
                this.update(true)
                likeIcon.style.color='blue'
            }
        })
        
        deleteIcon.addEventListener('click', ()=>{ 
            newComment.style.display='none'; 

            let notes = JSON.parse(localStorage.getItem("notes"));
            console.log(this.id)
            notes=notes.filter(el=>el.id!=this.id)
            console.log(notes)
            localStorage.setItem("notes", JSON.stringify(notes))
            if(notes.length==0){
                localStorage.clear()
            }
        })
    }
    save(){
        let notes = JSON.parse(localStorage.getItem("notes"));
        
        if(!notes) {notes = [];}
            notes.push(this);
            localStorage.setItem("notes", JSON.stringify(notes))
        }
    
    update(bool){
        let notes = JSON.parse(localStorage.getItem("notes"));
        notes.forEach(obj=>{
            if (obj.id == this.id) {
               obj.isLiked = bool;
            }
          })
        localStorage.setItem("notes", JSON.stringify(notes))
        //promijeni boolean u local storegu        
    }
}
if(notes){
    notes.forEach(el=>{new Note(el.id, el.line-1, el.text, el.isLiked, el.date)})
}
