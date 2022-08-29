import { doc } from 'prettier';
import { getWeatherInfo } from '../app';

const searchBar = document.querySelector('#searchBar');
const searchButton = document.querySelector('#searchButton');

const tempDisplay = document.querySelector('#temp');
const tempMaxDisplay = document.querySelector('#maxTemp');
const tempMinDisplay = document.querySelector('#minTemp');

const locationDisplay = document.querySelector('#locationName');

const bindEvents = () => {
  searchBar.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      getWeatherInfo(searchBar);
    }
  });

  searchButton.addEventListener('click', () => {
    getWeatherInfo(searchBar);
  });
};

const pageContent = (newLocation) => {
  tempDisplay.childNodes[2].remove();
  tempMaxDisplay.childNodes[2].remove();
  tempMinDisplay.childNodes[2].remove();

  const pTemp = document.createElement('p');
  pTemp.textContent = newLocation.getTemp();
  tempDisplay.insertBefore(pTemp, tempDisplay.childNodes[2]);

  const pTempMax = document.createElement('p');
  pTempMax.textContent = newLocation.getTempMax();
  tempMaxDisplay.insertBefore(pTempMax, tempMaxDisplay.childNodes[2]);

  const pTempMin = document.createElement('p');
  pTempMin.textContent = newLocation.getTempMin();
  tempMinDisplay.insertBefore(pTempMin, tempMinDisplay.childNodes[2]);

  locationDisplay.textContent = newLocation.getPlace();
};

export { bindEvents, pageContent };
