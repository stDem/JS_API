const photoBox = document.querySelector(".photo_box__random_photo");
const author = document.querySelector(".photo_box__author");
const likeBtn = document.querySelector(".photo_box__likes_btn");
const likeCount = document.querySelector(".like_count");
let counter = 0;
let fact,
  single = true,
  rndNum = Math.floor(Math.random() * 10);

async function showPhoto() {
  try {
    const response = await fetch(
      "https://api.unsplash.com/photos/?client_id=X1dpFeVfpj_-SQKmpyWiMIudb0jYviZwmVcWkjYHovI"
    );
    fact = await response.json();
    const urlsImg = Array.from(fact[0].urls);
  } catch (error) {
    console.error("Ошибка при загрузке фото:", error);
    return [];
  }
  fact.forEach((element, i) => {
    if (i == rndNum || !single) {
      const image = document.createElement("img");
      image.setAttribute("src", `${element.urls.regular}`);
      image.setAttribute("width", "304");
      image.setAttribute("height", "208");
      photoBox.append(image);
    }
  });
}

document.addEventListener("scroll", function () {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    single = false;
    showPhoto();
  }
});

showPhoto();

likeBtn.addEventListener("click", () => {
  counter++;
  localStorage.setItem("like_counter", counter);
  likeCount.textContent = localStorage.getItem("like_counter");
});

// localStorage.clear();

// var d = new Date();
// var day=new Array("Воскресенье","Понедельник","Вторник","Среда","Четверг","Пятница","Суббота");
// var month=new Array("января","февраля","марта","апреля","мая","июня","июля","августа",
// "сентября","октября","ноября","декабря");
// document.write(day[d.getDay()]+" " +d.getDate()+ " " + month[d.getMonth()]+ " " + d.getFullYear() +" г.");
