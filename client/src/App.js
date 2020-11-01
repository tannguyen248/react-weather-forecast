import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import { normalizeWeatherForecastData } from "./helpers/funcs";
import { getSearchLocationsUrl, getLocationUrl } from "./helpers/api";
import LayoutSection from "./components/LayoutSection";
import SearchInput from "./components/SearchInput";
import BackdropSpinner from "./components/BackdropSpinner";
import WeatherBoard from "./components/WeatherBoard";
import useAPI from "./hooks/useAPI";

const App = () => {
  const [{ data: locations, isLoading: locationsLoading }, setSearchLocationsURL] = useAPI('')
  const [{ data: locationInfo, isLoading: locationLoading }, setLocationsURL] = useAPI('')
  const [location, setLocation] = useState(null)
  const isLoading = locationsLoading || locationLoading

  const handleSearch = async (value) => {
    if (!value) {
      return;
    }

    setSearchLocationsURL(getSearchLocationsUrl(value));
  };

  const handleClickChangeLocation = async (woeid) => {
    setLocationsURL(getLocationUrl(woeid));
  };

  useEffect(() => {
    if (!locations || locations.length < 1) {
      setLocation(null)
      return () => {}
    }

    setLocationsURL(getLocationUrl(locations[0].woeid))
  }, [locations, setLocationsURL])

  useEffect(() => {
    if (locationInfo) {
      setLocation(normalizeWeatherForecastData(locationInfo))
    }
  }, [locationInfo])
  
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
