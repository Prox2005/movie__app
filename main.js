const API_KEY = "apikey=af0dad7d&s=";
const BASE_URL = "https://www.omdbapi.com/?";
const API_URL = BASE_URL + API_KEY;
const movies = [];
const form = document.querySelector(".header__search-bar");
form.addEventListener("submit", logSubmit);

async function request(movie) {
  fetch(`${API_URL}${movie}`).then((response) =>
    response.json().then((data) => {
      renderMovies(data.Search);
    })
  );
}

request("superman");

function renderMovies(movies) {
  cleanContainer();
  movies.map((movie) => {
    const poster = movie.Poster;
    const title = movie.Title;
    const year = movie.Year;
    createCard(poster, title, year);
  });
}

function logSubmit(event) {
  event.preventDefault();
  let formData = new FormData(form);

  for (const input of formData.entries()) {
    const title = input[1];
    request(title);
  }

  form.reset();
}

function cleanContainer() {
  const main = document.querySelector("main");
  main.innerHTML = "";
}

function createCard(poster, movieTitle, movieYear) {
  if (poster !== "N/A") {
    const main = document.querySelector("main");

    const section = document.createElement("section");
    section.className = "main__movie-card";

    const div = document.createElement("div");
    div.className = "main__movie-card__poster";

    const img = document.createElement("img");
    img.src = poster;

    const info = document.createElement("div");
    info.className = "main__movie-card__info";

    const title = document.createElement("h2");
    title.textContent = movieTitle;
    const year = document.createElement("h2");
    year.textContent = movieYear;

    main.appendChild(section);
    section.appendChild(div);
    div.appendChild(img);
    section.appendChild(info);
    info.appendChild(title);
    info.appendChild(year);
  }
}
