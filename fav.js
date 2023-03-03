// {
//   original_title: "Lord of the rings",
//   overview:
//     "Queen Ramonda, Shuri, M’Baku, Okoye and the Dora Milaje fight to protect their nation from intervening world powers in the wake of King T’Challa’s death.  As the Wakandans strive to embrace their next chapter, the heroes must band together with the help of War Dog Nakia and Everett Ross and forge a new path for the kingdom of Wakanda.",
//   popularity: "5470.522",
//   id: 123,
//   release_date: "2022-11-09",
//   vote_average: "7.3",
//   vote_count: "2000",
// // },
// import movieIdx from "./script.js";
let movieIdx = JSON.parse(localStorage.getItem("Idx") || "[]");
// let movieIdx = ["11", "22", "112"];
const boxes = document.querySelector(".boxes");
movieIdx.forEach((elem) => {
  searchedData(elem).then((data) => {
    addBox(data);
  });
});

//click on addToFav then get movieIdx
async function searchedData(movieIdx) {
  let imgPath = "https://image.tmdb.org/t/p/original";
  const res = await fetch(`https://api.themoviedb.org/3/movie/${movieIdx}?api_key=a6b3b359e91afe0131a127b733932257&language=en-US`);
  try {
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

function addBox(data) {
  let imgPath = "https://image.tmdb.org/t/p/original";
  let movieName = data.original_title;
  let posterPath = imgPath + data.poster_path;
  boxes.innerHTML += `<div class="box"><div class="movie-poster"><img src="${posterPath}"/></div>
  <div class="grid">Name : ${data.original_title}</div><div class="grid">overview: ${data.overview}</div><div class="grid">popularity : ${data.popularity}</div>
  <div class="grid">id: ${data.id}</div>
  <div class="grid">release-date : ${data.release_date}</div>
  <div class="grid">vote_average : ${data.vote_average}</div>
  <div class="grid">vote_count : ${data.vote_count}</div>

</div>`;
}
