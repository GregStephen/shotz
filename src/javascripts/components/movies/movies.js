import moviesData from '../../helpers/data/moviesData';
import util from '../../helpers/util';
import './movies.scss';

let movies = [];

const domStringBuilder = () => {
  let domString = '';
  movies.forEach((movie) => {
    domString += `<div id="${movie.id}" class="movie card col-5 mt-5">`;
    domString += `<div class="card-header"><a data-target="#myModal" data-toggle="modal" class="modalAnchors" id="${movie.name}" 
    href="#myModal">${movie.name}</a></div>`;
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


const modalMaker = (e) => {
  const anchorId = e.target.id;
  let domString = '';
  domString += '<div class="modal-header">';
  domString += `<h5 class="modal-title">${anchorId}</h5>`;
  domString += '<button type="button" class="close" data-dismiss="modal" aria-label="Close">';
  domString += '<span aria-hidden="true">&times;</span>';
  domString += '</button>';
  domString += '</div>';
  domString += '<div class="modal-body" id="movie-modal-message">';
  domString += '</div>';
  domString += '<div class="modal-footer">';
  domString += '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>';
  domString += '</div>';
  util.printToDom('movie-modal-content', domString);
};

const addEventListeners = () => {
  const modalAnchors = document.getElementsByClassName('modalAnchors');
  for (let i = 0; i < modalAnchors.length; i += 0) {
    modalAnchors[i].addEventListener('click', modalMaker);
  }
};

const initializeMovies = () => {
  moviesData.getMoviesData()
    .then((resp) => {
      const movieResults = resp.data.movies;
      movies = movieResults;
      domStringBuilder();
      addEventListeners();
    })
    .catch(err => console.error(err));
};

export default { initializeMovies };
