const apiUrl = "https://homework-server1.onrender.com";
const key = "JosipaSaravanja";
const notes = JSON.parse(localStorage.getItem("notes"));
const headers = {
  "Content-Type": "application/json",
  key,
};

let count = Number(); //pronaći neki bolji nacin
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
  .then((json) => writeCode(json.code.split("\n")))
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
}

function openOverlay(line) {
  const komentar = document.getElementById("komentar");
  document.getElementById("komentar-message").style.display = "none";
  document.getElementsByClassName("overlay")[0].style.display = "block";
  document.getElementById("comment-button").addEventListener("click", () => {
    const message = document.getElementById("komentar-message");
    if (!komentar.value) {
      message.style.display = "block";
    } else {
      new Comment(0, line, komentar.value, false).save();
      komentar.value = "";
      closeOverlay();
    }
  });

  document.getElementById("notes-button").addEventListener("click", () => {
    const message = document.getElementById("komentar-message");
    if (!komentar.value) {
      message.style.display = "block";
    } else {
      count++;
      new Note(count, line, komentar.value, false).save();
      komentar.value = "";
      closeOverlay();
    }
  });
}
