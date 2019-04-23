import util from '../../helpers/util';
import './locations.scss';
import locationsData from '../../helpers/data/locationsData';

let locations = [];

const domStringBuilder = () => {
  let domString = '';
  locations.forEach((location) => {
    domString += `<div id="${location.id}" class="movie card col-2 mt-5">`;
    domString += `<div class="card-header">${location.name}</div>`;
    domString += `<img class="card-img-top" src="${location.imageUrl}" alt="Card image cap"></img>`;
    domString += '<div class="card-body">';
    domString += `<h5 class="card-title">Location: ${location.address}</h5>`;
    domString += '</div>';
    domString += '</div>';
  });
  util.printToDom('locations', domString);
};

const initializeLocations = () => {
  locationsData.getLocationsData()
    .then((resp) => {
      const locationsResults = resp.data.locations;
      locations = locationsResults;
      domStringBuilder();
    })
    .catch(err => console.error(err));
};

export default { initializeLocations };
