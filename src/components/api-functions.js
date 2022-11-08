import { errorHandling } from './error-handling';

const fetchWeatherInfo = async (location, unit) => {
  try {
    const weatherAPI = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=3753fea3c9f037d32f1dec1ad67ef169&units=${unit}`,
      { mode: 'cors' }
    );
    if (weatherAPI.ok) {
      const weatherData = await weatherAPI.json();
      return weatherData;
    }

    const err = await weatherAPI.json();

    errorHandling(err);
    throw new Error(err.message || err.statusText);
  } catch (err) {
    throw new Error(err);
  }
};

export { fetchWeatherInfo };
