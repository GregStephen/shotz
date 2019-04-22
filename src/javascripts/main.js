import '../styles/main.scss';
import 'bootstrap';
import movies from './components/movies/movies';
import locations from './components/locations/locations';

const init = () => {
  movies.initializeMovies();
  locations.initializeLocations();
};

init();
