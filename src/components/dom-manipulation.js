import { getWeatherInfo } from '../app';
import { formatInTimeZone } from 'date-fns-tz';
let cityTimezones = require('city-timezones');

const searchBar = document.querySelector('#searchBar');
const searchButton = document.querySelector('#searchButton');

const tempDisplay = document.querySelector('#temp');

const locationDisplay = document.querySelector('#locationName');
const skyInfo = document.querySelector('#skyInfo');
const timeInfo = document.querySelector('#timeInfo');
const countryInfo = document.querySelector('#countryInfo');

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

  const pTemp = document.createElement('p');
  pTemp.textContent = newLocation.getTemp();
  tempDisplay.insertBefore(pTemp, tempDisplay.childNodes[2]);

  locationDisplay.textContent = newLocation.getPlace();
  skyInfo.textContent = newLocation.getDesc();

  const cityLookup = cityTimezones.findFromCityStateProvince(
    `${newLocation.getPlace()}`
  );

  const date = new Date();
  let country;
  let cityTimeZone;

  if (cityLookup.length) {
    for (const city of cityLookup) {
      if (
        city.iso2 === newLocation.getCountry() &&
        city.city === newLocation.getPlace()
      ) {
        cityTimeZone = city.timezone;
        country = city.country;
      }
    }
    let time = formatInTimeZone(
      date,
      `${cityTimeZone}`,
      'yyyy-MM-dd HH:mm:ss zzz'
    );
    timeInfo.textContent = time;
    countryInfo.textContent = country;
  } else {
    // could not find city.
  }
};

export { bindEvents, pageContent };
