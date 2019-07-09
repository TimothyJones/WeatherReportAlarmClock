const errorDescription = data =>
  data.text ? `This may be because ${data.text}.` : "";

const shortDescription = data => {
  if (data.error) {
    return `I was unable to read the forecast today. ${errorDescription(data)}`;
  }
  return `The forecast for today says ${data.text}`;
};

const umbrella = data => {
  if (data.rainChance) {
    const chance = parseInt(data.rainChance, 10);
    if (chance >= 60) {
      return "It is very likely to rain. You probably want to take an umbrella.";
    }
    if (chance >= 30) {
      return "It might rain. You may want to take an umbrella.";
    }
    if (chance > 0) {
      return "There is a slim chance of rain.";
    }
  }
  return "";
};

const temperatureDescription = data => {
  if (data.minTemp || data.maxTemp) {
    return `The temperature is expected to reach ${
      data.maxTemp
        ? `maximum ${data.maxTemp} degrees ${data.minTemp ? "with a " : ""}`
        : ""
    } ${data.minTemp ? `minimum of ${data.minTemp} degrees` : ""}`;
  }
  return "";
};

const forecastToText = data =>
  `<speak><amazon:breath duration='x-long' volume='x-soft'/><break strength="strong"/>,Good morning. <prosody rate="fast"><amazon:auto-breaths duration="short" volume="soft">${shortDescription(
    data
  )} ${umbrella(data)} ${temperatureDescription(
    data
  )}</amazon:auto-breaths></prosody><break strength="strong"/><amazon:breath duration='x-long' volume='x-soft'/></speak>`;

module.exports = forecastToText;
