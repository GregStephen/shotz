import util from '../../helpers/util';
import './locations.scss';
import locationsData from '../../helpers/data/locationsData';

const morningButton = document.getElementById('morning');
const afternoonButton = document.getElementById('afternoon');
const eveningButton = document.getElementById('evening');
const darkButton = document.getElementById('dark');
const allButton = document.getElementById('all');

let locations = [];

const shootTimeClass = (shootTime) => {
  let selectedClass = '';
  switch (shootTime) {
    case 'Morning':
      selectedClass = 'bg-secondary';
      break;
    case 'Afternoon':
      selectedClass = 'bg-success';
      break;
    case 'Evening':
      selectedClass = 'bg-info';
      break;
    case 'After Dark':
      selectedClass = 'bg-danger';
      break;
    default:
      selectedClass = '';
      break;
  }
  return selectedClass;
};

const domStringBuilder = (selectedBtn) => {
  let domString = '';
  locations.forEach((location) => {
    if (selectedBtn === location.shootTime || selectedBtn === 'all') {
      console.error(selectedBtn, location.shootTime);
      domString += `<div id="${location.id}" class="movie card col-2 mt-5">`;
      domString += `<div class="card-header ${shootTimeClass(location.shootTime)}">${location.name}</div>`;
      domString += `<img class="card-img-top" src="${location.imageUrl}" alt="Card image cap"></img>`;
      domString += '<div class="card-body">';
      domString += `<h5 class="card-title">Location: ${location.address}</h5>`;
      domString += '</div>';
      domString += '</div>';
    }
    util.printToDom('locations', domString);
  });
};


const filter = (e) => {
  const btnClicked = e.target.id;
  let selectedBtn = '';
  switch (btnClicked) {
    case 'morning':
      selectedBtn = 'Morning';
      break;
    case 'afternoon':
      selectedBtn = 'Afternoon';
      break;
    case 'evening':
      selectedBtn = 'Evening';
      break;
    case 'dark':
      selectedBtn = 'After Dark';
      break;
    default:
      selectedBtn = 'all';
      break;
  }
  domStringBuilder(selectedBtn);
};

const addEventListners = () => {
  darkButton.addEventListener('click', filter);
  morningButton.addEventListener('click', filter);
  afternoonButton.addEventListener('click', filter);
  eveningButton.addEventListener('click', filter);
  allButton.addEventListener('click', filter);
};

const initializeLocations = () => {
  locationsData.getLocationsData()
    .then((resp) => {
      const locationsResults = resp.data.locations;
      locations = locationsResults;
      domStringBuilder('all');
      addEventListners();
    })
    .catch(err => console.error(err));
};


export default { initializeLocations };
