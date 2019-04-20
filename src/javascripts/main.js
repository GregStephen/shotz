import '../styles/main.scss';
import 'bootstrap';
import movies from './components/movies/movies';

const init = () => {
  movies.initializeMovies();
};

init();
