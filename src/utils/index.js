const refineForecastData = (rawData, cityKey) => {
  const refinedData = rawData.DailyForecasts.map(
    ({ Day, Night, Temperature }, i) => {
      const forecastObj = { key: cityKey };
      forecastObj.description = {
        day: Day.IconPhrase,
        night: Night.IconPhrase,
      };
      forecastObj.range = {
        min: Temperature.Minimum.Value,
        max: Temperature.Maximum.Value,
      };

      return forecastObj;
    }
  );

  return refinedData;
};

const fToC = (degs) => {
  return (((degs - 32) * 5) / 9).toFixed(0);
};

const cToF = (degs) => {
  return ((degs * 9) / 5 + 32).toFixed(0);
};

module.exports = {
  refineForecastData,
  fToC,
  cToF,
};
