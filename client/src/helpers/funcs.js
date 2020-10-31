export const getDate = (str) => {
  return new Date(str);
};

export const getDayOfWeek = (date) => {
  if (!date || !date.getDay) {
    return "";
  }

  const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return weekdays[date.getDay()];
};

export const toFixedNumber = (number, noteLength) => {
  return parseFloat(number).toFixed(noteLength);
};

export const normalizeWeatherForecastData = (data) => {
  const CONSOLIDATED_WEATHER = "consolidated_weather";

  if (!data[CONSOLIDATED_WEATHER]) {
    return [];
  }

  const weathers = data[CONSOLIDATED_WEATHER].slice(0, 5);

  return weathers.map((weather) => ({
    title: data.title,
    state: weather["weather_state_name"],
    stateAbbr: weather["weather_state_abbr"],
    minTemp: parseInt(weather["min_temp"]),
    maxTemp: parseInt(weather["max_temp"]),
    dayOfWeek: getDayOfWeek(getDate(weather["applicable_date"])),
  }));
};