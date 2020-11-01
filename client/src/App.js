import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect, useRef } from "react";
import Container from "react-bootstrap/Container";
import { normalizeWeatherForecastData } from "./helpers/funcs";
import { getSearchLocationsUrl, getLocationUrl } from "./helpers/api";
import LayoutSection from "./components/LayoutSection";
import SearchInput from "./components/SearchInput";
import BackdropSpinner from "./components/BackdropSpinner";
import WeatherBoard from "./components/WeatherBoard";
import useAPI from "./hooks/useAPI";

const handleSetLocation = (woeid, cache, setLocation, setLocationURL) => {
  if (cache.hasOwnProperty(woeid)) {
    setLocation(cache[woeid]);
  } else {
    setLocationURL(getLocationUrl(woeid));
  }
};

const App = () => {
  const [
    { data: locations, isLoading: locationsLoading },
    setSearchLocationsURL,
  ] = useAPI("");
  const [
    { data: locationInfo, isLoading: locationLoading },
    setLocationURL,
  ] = useAPI("");
  const [location, setLocation] = useState(null);
  const cacheRef = useRef({});
  const isLoading = locationsLoading || locationLoading;

  const handleSearch = (value) => {
    if (!value) {
      return;
    }

    setSearchLocationsURL(getSearchLocationsUrl(value));
  };

  const handleClickChangeLocation = (woeid) => {
    handleSetLocation(woeid, cacheRef.current,setLocation, setLocationURL);
  };

  useEffect(() => {
    if (!locations || locations.length < 1) {
      setLocation(null);
      setLocationURL("");
      return () => {};
    }

    const woeid = locations[0].woeid;
    handleSetLocation(woeid, cacheRef.current,setLocation, setLocationURL);

  }, [locations, setLocationURL]);

  useEffect(() => {
    if (locationInfo) {
      const normalizedWeatherForecast = normalizeWeatherForecastData(
        locationInfo
      );
      const woeid = locationInfo.woeid;

      cacheRef.current[woeid] = normalizedWeatherForecast;
      setLocation(normalizedWeatherForecast);
    }
  }, [locationInfo]);

  return (
    <Container className="App" fluid="sm">
      <BackdropSpinner display={isLoading} />
      <LayoutSection>
        <SearchInput handleSearch={handleSearch} />
      </LayoutSection>
      <LayoutSection>
        <WeatherBoard {...{ locations, location, handleClickChangeLocation }} />
      </LayoutSection>
    </Container>
  );
};

export default App;
