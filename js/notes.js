class Note{
    constructor(id, lineNumber, text, isLiked){
        this.id=JSON.parse(JSON.stringify(id));
        this.line=lineNumber;
        this.text=text;
        this.isLiked=isLiked;
        this.date=new Date()

        const newComment=document.createElement('div')
        newComment.className="comment"
        newComment.style.backgroundColor="#dbbac0"

        const newDate=document.createElement('p')
        newDate.innerHTML=`${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()}     ${new Date().getHours()}:${new Date().getMinutes()}`;

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
        document.getElementsByClassName('code-line')[lineNumber-1].after(newComment)
        
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
            notes=notes.filter(el=>el.id!=this.id)
            localStorage.setItem("notes", JSON.stringify(notes))
            if(notes.length==0){
                localStorage.clear()
            }
        })
    }

    save(){
        let notes = JSON.parse(localStorage.getItem("notes"));
        
        if(!notes) notes = [];
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
    }
}
