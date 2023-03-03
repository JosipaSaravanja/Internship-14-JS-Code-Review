class Comment{
    constructor(lineNumber, author, text, isLiked){
        this.line=lineNumber+1;
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
    save(){
        console.log(this)
    }

}

new Comment(3, 'Josipa', 'neki komentar ', false)
new Comment(5, 'Josipa2', 'neki drugi komentar ', false)

//dodat id