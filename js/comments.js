class Comment{
    constructor(id, lineNumber, text, isLiked){
        this.id=id;
        this.line=lineNumber;
        this.text=text;
        this.isLiked=isLiked;
        this.date=new Date()

        const line=document.getElementsByClassName('code-line')[lineNumber-1]
        const newComment=document.createElement('div')
        newComment.className="comment"

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
        console.log(lineNumber)
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
            console.log(this)
            fetch(`${apiUrl}/update-is-liked/${this.id}`, {
                method: 'PUT',
                headers:{
                    'Content-Type': 'application/json',
                    key
                },
                body: JSON.stringify({
                    id: id,
                    isLiked:true
                })
            })
        })

        deleteIcon.addEventListener('click', ()=>{
            newComment.style.display='none';
            fetch(`${apiUrl}/remove/${id}`, {
                method: 'DELETE',
                headers:{
                    'Content-Type': 'application/json',
                    key
                },
                body: JSON.stringify({
                    id: id
                })
            })
        })
    }
    save(){
        const toAdd={
            line: this.line,
            text: this.text
        }
        fetch(`${apiUrl}/create`, {
            method: 'POST',
            headers:headers,
            body: JSON.stringify(toAdd)
        }).then(responce=>responce.json()).then(json=>this.setId(json.id))
    }
    
    setId(id){
        this.id=id
    }
}
