import './style.css';
import {
  bindEvents,
  pageContent,
} from './components/dom-manipulation';
import { fetchWeatherInfo } from './components/api-functions';
import { processData } from './components/process-data';

const getWeatherInfo = async (searchBar) => {
  let weatherData = await fetchWeatherInfo(searchBar.value);
  searchBar.value = '';

  let mainData = weatherData.main;
  let sysData = weatherData.sys;
  let cloudsData = weatherData.weather;
  let placeName = weatherData.name;

  let newLocation = new processData(
    mainData,
    sysData,
    cloudsData,
    placeName
  );
  console.log(newLocation);

  pageContent(newLocation);
};

bindEvents();

export { getWeatherInfo };
