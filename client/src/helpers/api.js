export const validateStatus = (status) => {
  return status === 200;
};

export const getSearchLocationsUrl = (query) => {
  return `/location/search/?query=${query}`
}

export const getLocationUrl = (woeid) => {
  return `/location/${woeid}`
}
