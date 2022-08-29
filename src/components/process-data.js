class processData {
  constructor(mainData, sysData, cloudsData, placeName) {
    this.feelsLike = mainData.feels_like;
    this.humidity = mainData.humidity;
    this.pressure = mainData.pressure;
    this.temp = mainData.temp;
    this.tempMax = mainData.temp_max;
    this.tempMin = mainData.temp_min;

    this.country = sysData.country;
    this.sunrise = sysData.sunrise;
    this.sunset = sysData.sunset;

    this.desc = cloudsData[0].description;
    this.mainDesc = cloudsData[0].main;

    this.place = placeName;
  }

  getFeelsLike() {
    return this.feelsLike;
  }

  getHumidity() {
    return this.humidity;
  }

  getPressure() {
    return this.pressure;
  }

  getTemp() {
    return this.temp;
  }

  getTempMax() {
    return this.tempMax;
  }

  getTempMin() {
    return this.tempMin;
  }

  getDesc() {
    return this.desc;
  }

  getPlace() {
    return this.place;
  }
}

export { processData };
