const apiUrl = "https://homework-server1.onrender.com";
const key = "JosipaSaravanja";
const notes = JSON.parse(localStorage.getItem("notes"));
let codelineNum=Number()
const headers = {
  "Content-Type": "application/json",
  key,
};

document.getElementsByClassName("closebtn")[0].addEventListener("click", () => {
  closeOverlay()
});

let count = Number(); //pronaći neki bolji nacin pracenja id za localStorage notes
if (notes) {
  count = notes[notes.length - 1].id;
} else {
  count = 0;
}

fetch(`${apiUrl}/code`, {
  method: "GET",
  headers: headers,
})
  .then((resonce) => resonce.json())
  .then((json) => writeCode(json.code.split("\n"))) //splitati bez uklanjanja whitespaces?
  .then(() => {
    fetch(`${apiUrl}/comments`, {
      method: "GET",
      headers: headers,
    })
      .then((resonce) => resonce.json())
      .then((x) => {
        console.log(x.comments);
        x.comments.forEach(
          (comment) =>
            new Comment(comment.id, comment.line, comment.text, comment.isLiked)
        );
      });

    if (notes) {
      notes.forEach((el) => {
        new Note(el.id, el.line, el.text, el.isLiked, el.date);
      });
    }
  });


function closeOverlay() {
  document.getElementsByClassName("overlay")[0].style.display = "none";
  /*document.getElementById("komentar").value = "";*/
}

function openOverlay(line) {
  let linija=document.getElementById("line")
  linija.value = line;
  const komentar = document.getElementById("komentar");
  const message1 = document.getElementById("line-message");
  const message2 = document.getElementById("komentar-message");
  message1.style.display = "none";
  message2.style.display = "none";
  document.getElementsByClassName("overlay")[0].style.display = "block";

  document.getElementById("comment-button").addEventListener("click", () => {
    console.log(line);
    if (!komentar.value) {
      message2.style.display = "block";
    } else if(linija.value>codelineNum || linija.value<=0){
      message1.style.display = "block";
    }else {
      new Comment(0, linija.value, komentar.value, false).save();
      komentar.value = "";
      closeOverlay();
    }
  });

  document.getElementById("notes-button").addEventListener("click", () => {
    if (!komentar.value) {
      message2.style.display = "block";
    } else {
      count++;
      new Note(count, linija.value, komentar.value, false).save();
      closeOverlay();
    }
  });
  
}
