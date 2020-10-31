import React from "react";
import { ListGroup } from "react-bootstrap";

const OtherLocations = ({ locations, handleClick }) => {
  if (!locations) {
    return null;
  }
  return (
    <ListGroup horizontal>
      {locations.map(({ title, woeid }) => (
        <ListGroup.Item action key={woeid} onClick={() => handleClick(woeid)}>
          {title}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default OtherLocations;
