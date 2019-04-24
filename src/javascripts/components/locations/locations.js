import util from '../../helpers/util';
import './locations.scss';
import locationsData from '../../helpers/data/locationsData';

const morningButton = document.getElementById('morning');
const afternoonButton = document.getElementById('afternoon');
const eveningButton = document.getElementById('evening');
const darkButton = document.getElementById('dark');
const allButton = document.getElementById('all');
const searchBar = document.getElementById('search-input');

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

const domStringBuilder = (selectedLocations) => {
  let domString = '';
  selectedLocations.forEach((location) => {
    domString += `<div id="${location.id}" class="movie card col-2 mt-5">`;
    domString += `<div class="card-header ${shootTimeClass(location.shootTime)}">${location.name}</div>`;
    domString += `<img class="card-img-top" src="${location.imageUrl}" alt="Card image cap"></img>`;
    domString += '<div class="card-body">';
    domString += `<h5 class="card-title">Location: ${location.address}</h5>`;
    domString += '</div>';
    domString += '</div>';
  });
  util.printToDom('locations', domString);
};

const filterButtonEvent = (e) => {
  const buttonId = e.target.id;
  const darkLocations = locations.filter(x => x.shootTime === 'After Dark');
  const morningLocations = locations.filter(x => x.shootTime === 'Morning');
  const afternoonLocations = locations.filter(x => x.shootTime === 'Afternoon');
  const eveningLocations = locations.filter(x => x.shootTime === 'Evening');
  switch (buttonId) {
    case 'morning':
      domStringBuilder(morningLocations);
      break;
    case 'afternoon':
      domStringBuilder(afternoonLocations);
      break;
    case 'evening':
      domStringBuilder(eveningLocations);
      break;
    case 'dark':
      domStringBuilder(darkLocations);
      break;
    default:
      domStringBuilder(locations);
  }
};

const filterByTextEvent = (e) => {
  const searchText = e.target.value;
  const searchLocations = locations.filter((x) => {
    const hasName = x.name.includes(searchText);
    const hasAddress = x.address.includes(searchText);
    return hasName || hasAddress;
  });
  domStringBuilder(searchLocations);
};

const addEventListners = () => {
  darkButton.addEventListener('click', filterButtonEvent);
  morningButton.addEventListener('click', filterButtonEvent);
  afternoonButton.addEventListener('click', filterButtonEvent);
  eveningButton.addEventListener('click', filterButtonEvent);
  allButton.addEventListener('click', filterButtonEvent);
  searchBar.addEventListener('keyup', filterByTextEvent);
};

const initializeLocations = () => {
  locationsData.getLocationsData()
    .then((resp) => {
      const locationsResults = resp.data.locations;
      locations = locationsResults;
      domStringBuilder(locations);
      addEventListners();
    })
    .catch(err => console.error(err));
};


export default { initializeLocations, domStringBuilder, shootTimeClass };
