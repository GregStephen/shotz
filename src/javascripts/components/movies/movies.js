import moviesData from '../../helpers/data/moviesData';
import util from '../../helpers/util';
import locationsPage from '../locations/locations';
import locationsData from '../../helpers/data/locationsData';
import './movies.scss';

let movies = [];
let locationsLocationsLocations = [];

const initializeLocations = () => {
  locationsData.getLocationsData()
    .then((resp) => {
      const locationsResults = resp.data.locations;
      locationsLocationsLocations = locationsResults;
    })
    .catch(err => console.error(err));
};

const modalMaker = (e) => {
  initializeLocations();
  const anchorId = e.target.id;
  const movieSelected = movies.filter(x => x.name === anchorId);
  let domString = '';
  domString += '<div id="modal-title" class="modal-header">';
  domString += `<h5 class="modal-title">${anchorId}</h5>`;
  domString += '<button type="button" class="close" data-dismiss="modal" aria-label="Close">';
  domString += '<span aria-hidden="true">&times;</span>';
  domString += '</button>';
  domString += '</div>';
  domString += '<div class="modal-body" id="movie-modal-message">';
  domString += `<div id="${movieSelected[0].id}" class="movie card col-12">`;
  domString += '<div class="card-body">';
  domString += `<h5 class="card-title">Genre: ${movieSelected[0].genre}</h5>`;
  domString += '<p class="card-text">';
  domString += '<ul>';
  domString += `<li>Release Date: ${movieSelected[0].releaseDate}</li>`;
  domString += `<li>Description: ${movieSelected[0].description}</li>`;
  domString += '</ul>';
  domString += '</p>';
  domString += '</div>';
  domString += '</div>';
  domString += '<h4>Locations: </h4>';
  const locationsSelected = movieSelected[0].locations;
  const locationsArray = [];
  for (let i = 0; i < locationsSelected.length; i += 1) {
    const locationCheck = locationsSelected[i];
    const locationObj = locationsLocationsLocations.filter(x => x.id === locationCheck);
    locationsArray.push(locationObj);
  }
  domString += '<div class="row justify-content-around">';
  for (let i = 0; i < locationsArray.length; i += 1) {
    domString += `<div id="${locationsArray[i][0].id}" class="movie card col-4 mt-2">`;
    domString += `<div class="card-header ${locationsPage.shootTimeClass(locationsArray[i][0].shootTime)}">${locationsArray[i][0].name}</div>`;
    domString += `<img class="card-img-top" src="${locationsArray[i][0].imageUrl}" alt="Card image cap"></img>`;
    domString += '<div class="card-body">';
    domString += `<h5 class="card-title">Location: ${locationsArray[i][0].address}</h5>`;
    domString += '</div>';
    domString += '</div>';
  }
  domString += '</div>';
  domString += '</div>';
  domString += '<div class="modal-footer">';
  domString += '<button type="button" class="btn btn-secondary"';
  domString += 'data-dismiss="modal">Close</button>';
  domString += '</div>';
  util.printToDom('movie-modal-content', domString);
};

const addEventListeners = () => {
  const modalAnchors = document.getElementsByClassName('modalAnchors');
  for (let i = 0; i < modalAnchors.length; i += 1) {
    modalAnchors[i].addEventListener('click', modalMaker);
  }
};

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
  addEventListeners();
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

export default { initializeMovies, initializeLocations };
