const errorDescription = data =>
  data.text ? `This may be because ${data.text}.` : '';

const shortDescription = data => {
  if (data.error) {
    return `I was unable to read the forecast today. ${errorDescription(data)}`;
  }
  return `The forecast for today says ${data.text}`;
};

const umbrella = data => {
  if (data.rainChance) {
    const chance = parseInt(data.rainChance, 10);
    if (chance >= 80) {
      return 'It is very likely to rain. You should definitely take an umbrella.';
    }
    if (chance >= 60) {
      return 'It is likely to rain. You should take an umbrella.';
    }
    if (chance >= 30) {
      return 'It might rain. You may want to take an umbrella.';
    }
    if (chance > 0) {
      return 'There is a slim chance of rain.';
    }
  }
  return '';
};

const temperatureDescription = data => {
  if (data.minTemp || data.maxTemp) {
    return `The temperature is expected to reach ${
      data.maxTemp
        ? `maximum ${data.maxTemp} degrees ${data.minTemp ? 'with a ' : ''}`
        : ''
    } ${data.minTemp ? `minimum of ${data.minTemp} degrees` : ''}`;
  }
  return '';
};

const forecastToText = data =>
  `<speak>Good morning. <prosody rate="fast"><amazon:auto-breaths duration="short" volume="soft">${shortDescription(
    data
  )} ${umbrella(data)} ${temperatureDescription(
    data
  )}</amazon:auto-breaths></prosody></speak>`;

module.exports = forecastToText;
