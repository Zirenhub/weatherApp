const fetchWeatherInfo = async (location) => {
  try {
    const weatherAPI = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=3753fea3c9f037d32f1dec1ad67ef169&units=metric`,
      { mode: 'cors' }
    );
    if (weatherAPI.ok) {
      const weatherData = await weatherAPI.json();
      return weatherData;
    }

    const err = await weatherAPI.json();

    // if (err.cod == 404) {
    //   throw new Error(console.log(err.message));
    // } else {
    //   throw new Error(err.message || err.statusText);
    // }

    throw new Error(err.message || err.statusText);
  } catch (err) {
    throw new Error(err);
  }
};

export { fetchWeatherInfo };
