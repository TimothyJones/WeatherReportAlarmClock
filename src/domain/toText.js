const errorDescription = data => (data.text ? `This may be because ${data.text}.` : '');

const shortDescription = data => {
  if (data.error) {
    return `I was unable to read the forecast today. ${errorDescription(data)}`;
  } else {
    return `The forecast for today says ${data.text}`;
  }
};

const umbrella = data => {
  if (data.rainChance) {
    const chance = parseInt(data.rainChance, 10);
    if (chance >= 60) {
      return 'It is very likely to rain. You probably want to take an umbrella.';
    } else if (chance >= 30) {
      return 'It might rain. You may want to take an umbrella.';
    } else if (chance > 0) {
      return 'There is a slim chance of rain.';
    }
  }
  return '';
};

const temperatureDescription = data => {
  if (data.minTemp || data.maxTemp) {
    return `The temperature is expected to reach ${
      data.maxTemp ? `maximum ${data.maxTemp} degrees ${data.minTemp ? 'and' : ''}` : ''
    } ${data.minTemp ? `minimum ${data.minTemp} degrees` : ''}`;
  }
  return '';
};

const forecastToText = data => {
  return `<speak>Good morning. <prosody rate="fast"><amazon:auto-breaths duration="short" volume="soft">${shortDescription(
    data
  )} ${umbrella(data)} ${temperatureDescription(data)}</amazon:auto-breaths></prosody></speak>`;
};

module.exports = forecastToText;
