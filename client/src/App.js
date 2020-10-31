import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import { normalizeWeatherForecastData } from "./helpers/funcs";
import { searchLocations, getWeatherForecast } from "./helpers/api";
import OtherLocations from "./components/OtherLocations";
import LayoutSection from "./components/LayoutSection";
import SearchInput from "./components/SearchInput";
import WeatherBoard from "./components/WeatherBoard";

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [location, setLocation] = useState(null);
  const [locations, setLocations] = useState(null);

  const handleSearch = async () => {
    if (!searchValue) {
      return;
    }

    const searchedLocations = await searchLocations(searchValue);
    setLocations(searchedLocations);

    if (searchedLocations.length > 0) {
      const weathers = normalizeWeatherForecastData(
        await getWeatherForecast(searchedLocations[0].woeid)
      );
      setLocation(weathers);
    }
  };

  const handleChangeSearchInput = (e) => {
    setSearchValue(e.target.value);
  };

  const handleClickChangeLocation = async (woeid) => {
    const weathers = normalizeWeatherForecastData(
      await getWeatherForecast(woeid)
    );
    setLocation(weathers);
  };

  return (
    <Container className="App">
      <LayoutSection>
        <SearchInput
          value={searchValue}
          handleChange={handleChangeSearchInput}
          handleSearch={handleSearch}
        />
      </LayoutSection>
      <LayoutSection>
        <OtherLocations
          locations={locations}
          handleClick={handleClickChangeLocation}
        />
      </LayoutSection>
      <LayoutSection>
        <WeatherBoard weathers={location} />
      </LayoutSection>
    </Container>
  );
}

export default App;
