const movieContainer = document.querySelector(".movies");
const addToFavBtn = document.querySelector(".btn2");
const searchBox = document.querySelector(".search");
const searchInput = document.querySelector(".search-bar input");
let movieIdxArr = JSON.parse(localStorage.getItem("Idx") || "[]");

async function fetchApiData() {
  const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=a6b3b359e91afe0131a127b733932257&language=en-US&page=1`);
  const data = await res.json();
  return data.results;
}
const data = await fetchApiData();
loadData(data);

function loadData(data) {
  let imgPath = "https://image.tmdb.org/t/p/original";
  const movies = (document.querySelector(".movies").innerHTML = ``);
  const moviesCard = data.map(({ backdrop_path, id, original_title }) => {
    let posterPath = imgPath + backdrop_path;
    return `<div class="movie"><div class="movie-poster"><img src="${posterPath}"/></div><div class='btn2 hidden'>Add To Fav</div><div class="movie-name">${id} : ${original_title}</div></div>`;
  });

  movieContainer.innerHTML = moviesCard.join("");
}

function toggleAddToFav(target) {
  target.children[0].classList.toggle("hidden");
  target.children[1].classList.toggle("hidden");
  target.children[2].classList.toggle("hidden");
}

function addToFav(movie) {
  let movieIdx = movie.children[2].innerText.split(":")[0];
  if (!movieIdxArr.includes(movieIdx)) {
    movieIdxArr.push(movieIdx);
  }
  localStorage.setItem("Idx", JSON.stringify(movieIdxArr));
}

movieContainer.addEventListener("click", (e) => {
  const target = e.target.closest(".movie");
  if (e.target.innerHTML == "Add To Fav") {
    addToFav(target);
  }
  if (!target) return;
});

movieContainer.addEventListener("mouseover", (e) => {
  const target = e.target.closest(".movie");
  if (!target) return;
  toggleAddToFav(target);
});

movieContainer.addEventListener("mouseout", (e) => {
  const target = e.target.closest(".movie");
  if (!target) return;
  toggleAddToFav(target);
});

searchBox.addEventListener("input", () => {
  if (!searchInput.value) return loadData(data);

  let name = searchInput.value.toUpperCase();
  const list = data.filter((movie) => movie.original_title.startsWith(name.toUpperCase()));
  loadData(list);
});
