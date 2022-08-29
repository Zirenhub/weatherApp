class processData {
  constructor(mainData, sysData, cloudsData, placeName, timezone) {
    this.feelsLike = mainData.feels_like;
    this.humidity = mainData.humidity;
    this.pressure = mainData.pressure;
    this.temp = mainData.temp;
    this.tempMax = mainData.temp_max;
    this.tempMin = mainData.temp_min;

    this.country = sysData.country;

    this.desc = cloudsData[0].description;
    this.mainDesc = cloudsData[0].main;

    this.place = placeName;

    this.timezone = timezone;
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

  getCountry() {
    return this.country;
  }

  getPlace() {
    return this.place;
  }

  getTimezone() {
    return this.timezone;
  }
}

export { processData };
