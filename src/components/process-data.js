class processData {
  constructor(mainData) {
    this.feelsLike = mainData.feels_like;
    this.humidity = mainData.humidity;
    this.pressure = mainData.pressure;
    this.temp = mainData.temp;
    this.tempMax = mainData.temp_max;
    this.tempMin = mainData.temp_min;
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
}

export { processData };
