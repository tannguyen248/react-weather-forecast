import React from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const ENTER_KEYCODE = 13;

const SearchInput = ({ value, handleChange, handleSearch }) => {
  return (
    <InputGroup>
      <FormControl
        placeholder="Search city"
        aria-label="Search city"
        value={value}
        onChange={handleChange}
        onKeyDown={(e) => e.keyCode === ENTER_KEYCODE && handleSearch()}
      />
      <InputGroup.Append>
        <Button variant="outline-secondary" onClick={handleSearch}>
          <FontAwesomeIcon icon={faSearch} />
        </Button>
      </InputGroup.Append>
    </InputGroup>
  );
};

export default SearchInput;
