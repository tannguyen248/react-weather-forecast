import React from "react";
import Card from "react-bootstrap/Card";
import Temparature from "./Temparature";

const WeatherCard = ({ stateAbbr, dayOfWeek, minTemp, maxTemp }) => {
  return (
    <Card className="text-center">
      <Card.Img
        variant="top"
        src={`https://www.metaweather.com/static/img/weather/${stateAbbr}.svg`}
      />
      <Card.Body>
        <Card.Title>{dayOfWeek}</Card.Title>
        <Card.Text>
          <Temparature number={maxTemp} symbol="o" /> -{" "}
          <Temparature number={minTemp} symbol="o" />
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default WeatherCard;
