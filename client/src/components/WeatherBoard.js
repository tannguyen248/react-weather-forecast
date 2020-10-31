import React from "react";
import styled from "styled-components";
import WeatherCard from "./WeatherCard";
import CardDeck from "react-bootstrap/CardDeck";
import { Card } from "react-bootstrap";

const WeatherBoard = ({ weathers }) => {
  if (!weathers) {
    return null;
  }

  const title = weathers[0].title;

  return (
    <Card>
      <Card.Header>{title}</Card.Header>
      <Card.Body>
        <Content>
          <CardDeck>
            {weathers.map((state, index) => (
              <WeatherCard key={index} {...state} />
            ))}
          </CardDeck>
        </Content>
      </Card.Body>
    </Card>
  );
};

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export default WeatherBoard;
