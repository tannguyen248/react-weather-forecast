export const validateStatus = (status) => {
  return status === 200;
};

export const getSearchLocationsUrl = (query) => {
  return `/location/search/?query=${query}`
}

export const getLocationUrl = (woeid) => {
  return `/location/${woeid}`
}

export const searchLocations = async (query) => {
  const response = await fetch(`/location/search/?query=${query}`);

  if (!validateStatus(response.status)) {
    return;
  }

  return await response.json();
};

export const getWeatherForecast = async (woeid) => {
  const response = await fetch(`/location/${woeid}`);

  if (!validateStatus(response.status)) {
    return;
  }

  return await response.json();
};
