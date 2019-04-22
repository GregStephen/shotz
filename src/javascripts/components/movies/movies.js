import moviesData from '../../helpers/data/moviesData';
import util from '../../helpers/util';
import './movies.scss';

let movies = [];

const domStringBuilder = () => {
  let domString = '';
  movies.forEach((movie) => {
    domString += `<div id="${movie.id}" class="movie card col-5 mt-5">`;
    domString += `<div class="card-header">${movie.name}</div>`;
    domString += '<div class="card-body">';
    domString += `<h5 class="card-title">Genre: ${movie.genre}</h5>`;
    domString += '<p class="card-text">';
    domString += '<ul>';
    domString += `<li>Release Date: ${movie.releaseDate}</li>`;
    domString += `<li>Description: ${movie.description}</li>`;
    domString += `<li>How Many Locations: ${movie.locations.length}</li>`;
    domString += '</ul>';
    domString += '</p>';
    domString += '</div>';
    domString += '</div>';
  });
  util.printToDom('movies', domString);
};

const initializeMovies = () => {
  moviesData.getMoviesData()
    .then((resp) => {
      const movieResults = resp.data.movies;
      movies = movieResults;
      domStringBuilder();
    })
    .catch(err => console.error(err));
};

export default { initializeMovies };
