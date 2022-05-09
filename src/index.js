import { GiphyFetch } from "@giphy/js-fetch-api";
import "./style.scss";

const apiKey = "i2WQvfRAfgXF6HEAIqpKrU941EuJ972Z";
const gf = new GiphyFetch(apiKey); // Обвёртка над API
const gif = document.querySelector(".gif");

const paginatorButtonLeft = document.querySelector(".padiantor-button__left");
const paginatorButtonRight = document.querySelector(".padiantor-button__right");
let set = 0;
let lim = 10;
const searchForm = document.getElementById("search");
const searcsText = searchForm.querySelector("[type=search]");


showGif(set, lim);

searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  showGif(set, lim);
});

paginatorButtonLeft.disabled = true;

paginatorButtonRight.addEventListener("click", function (event) {
  set += lim;
  showGif(set, lim);
  if (set > 0) {
    paginatorButtonLeft.disabled = false;
  }
});

paginatorButtonLeft.addEventListener("click", function (event) {
  set -= lim;
  showGif(set, lim);
  if (set <= 0) {
    paginatorButtonLeft.disabled = true;
  }
});

function showGif(set, lim) {
  if (searcsText.value == "") {
    gf.trending({ offset: set, limit: lim }) // Асинхронный метод для получения гифок в тренде
      .then(showGifImages);
  } else {
    gf.search(searcsText.value, { offset: set, limit: lim }) // Асинхронный метод для получения гифок в тренде
      .then(showGifImages);
  }
}

function showGifImages(res) {
  console.log(res);
  gif.innerHTML = "";
  for (let item of res.data) {
    let img = document.createElement("img");
    img.src = item.images.fixed_width.url;
    gif.appendChild(img);
  }
}
