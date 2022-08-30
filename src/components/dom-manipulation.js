import { getWeatherInfo } from '../app';
import { formatInTimeZone } from 'date-fns-tz';
let cityTimezones = require('city-timezones');

const searchBar = document.querySelector('#searchBar');
const searchButton = document.querySelector('#searchButton');

const weatherImage = document.querySelector('.weather-icon-sunny');

const tempDisplay = document.querySelector('#temp');
const feelsLike = document.querySelector('#feelsLike');
const humidity = document.querySelector('#humidity');
const skyInfo = document.querySelector('#skyInfo');

const switchButton = document.querySelector('#switchButton');

const locationDisplay = document.querySelector('#locationName');
const countryInfo = document.querySelector('#countryInfo');
const timeInfo = document.querySelector('#timeInfo');

let unit = 'metric';

const bindEvents = () => {
  searchBar.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      getWeatherInfo(searchBar, unit);
    }
  });

  searchButton.addEventListener('click', () => {
    getWeatherInfo(searchBar, unit);
  });

  switchButton.addEventListener('click', (e) => {
    let target = e.target;
    switchUnit(target);
  });
};

const switchUnit = (target) => {
  if (target.textContent === '°F') {
    tempDisplay.childNodes[2].textContent = Math.round(
      (tempDisplay.childNodes[2].textContent * 9) / 5 + 32
    );

    feelsLike.childNodes[2].textContent = Math.round(
      (feelsLike.childNodes[2].textContent * 9) / 5 + 32
    );

    tempDisplay.childNodes[3].textContent = '°F';
    feelsLike.childNodes[3].textContent = '°F';

    unit = 'imperial';
    target.textContent = '°C';
  } else if (target.textContent === '°C') {
    tempDisplay.childNodes[2].textContent = Math.round(
      ((tempDisplay.childNodes[2].textContent - 32) * 5) / 9
    );

    feelsLike.childNodes[2].textContent = Math.round(
      ((feelsLike.childNodes[2].textContent - 32) * 5) / 9
    );

    tempDisplay.childNodes[3].textContent = '°C';
    feelsLike.childNodes[3].textContent = '°C';

    unit = 'metric';
    target.textContent = '°F';
  } else {
    console.log('something went wrong');
  }
};

const updateImage = (desc) => {
  weatherImage.setAttribute('class', '');
  if (desc.includes('clouds')) {
    weatherImage.classList.add('weather-icon-cloudy');
  } else if (desc.includes('rain')) {
    weatherImage.classList.add('weather-icon-rainy');
  } else {
    weatherImage.classList.add('weather-icon-sunny');
  }
};

const pageContent = (newLocation) => {
  tempDisplay.childNodes[2].remove();
  feelsLike.childNodes[2].remove();
  humidity.childNodes[2].remove();
  if (document.querySelector('.error-para')) {
    document.querySelector('.error-para').remove();
  }

  const pTemp = document.createElement('p');
  pTemp.textContent = Math.round(newLocation.getTemp());
  tempDisplay.insertBefore(pTemp, tempDisplay.childNodes[2]);

  const pFeelsLike = document.createElement('p');
  pFeelsLike.textContent = Math.round(newLocation.getFeelsLike());
  feelsLike.insertBefore(pFeelsLike, feelsLike.childNodes[2]);

  const pHumidity = document.createElement('p');
  pHumidity.textContent = newLocation.getHumidity() + '%';
  humidity.insertBefore(pHumidity, humidity.childNodes[2]);

  locationDisplay.textContent = newLocation.getPlace();
  skyInfo.textContent = newLocation.getDesc();

  updateImage(newLocation.getDesc());

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
