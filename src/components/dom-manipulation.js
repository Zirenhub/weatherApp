import { getWeatherInfo } from '../app';
import { formatInTimeZone } from 'date-fns-tz';
let cityTimezones = require('city-timezones');

const searchBar = document.querySelector('#searchBar');
const searchButton = document.querySelector('#searchButton');

const tempDisplay = document.querySelector('#temp');
const feelsLike = document.querySelector('#feelsLike');
const humidity = document.querySelector('#humidity');
const skyInfo = document.querySelector('#skyInfo');

const switchButton = document.querySelector('#switchButton');

const locationDisplay = document.querySelector('#locationName');
const countryInfo = document.querySelector('#countryInfo');
const timeInfo = document.querySelector('#timeInfo');

const bindEvents = () => {
  searchBar.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      getWeatherInfo(searchBar);
    }
  });

  searchButton.addEventListener('click', () => {
    getWeatherInfo(searchBar);
  });

  switchButton.addEventListener('click', (e) => {
    let target = e.target;
    switchUnit(target);
  });
};

const switchUnit = (target) => {
  if (target.textContent === '°F') {
    tempDisplay.childNodes[2].textContent =
      (tempDisplay.childNodes[2].textContent * 9) / 5 + 32;
  }
};

const pageContent = (newLocation) => {
  tempDisplay.childNodes[2].remove();
  feelsLike.childNodes[2].remove();
  humidity.childNodes[2].remove();

  const pTemp = document.createElement('p');
  pTemp.textContent = newLocation.getTemp();
  tempDisplay.insertBefore(pTemp, tempDisplay.childNodes[2]);

  const pFeelsLike = document.createElement('p');
  pFeelsLike.textContent = newLocation.getFeelsLike();
  feelsLike.insertBefore(pFeelsLike, feelsLike.childNodes[2]);

  const pHumidity = document.createElement('p');
  pHumidity.textContent = newLocation.getHumidity() + '%';
  humidity.insertBefore(pHumidity, humidity.childNodes[2]);

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
    countryInfo.textContent = country;
    timeInfo.textContent = time;
  } else {
    countryInfo.textContent = newLocation.getCountry();
    timeInfo.textContent = 'could not find city time';
  }
};

export { bindEvents, pageContent };
