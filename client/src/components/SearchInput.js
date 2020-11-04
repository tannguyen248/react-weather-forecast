import React, { useRef } from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const ENTER_KEYCODE = 13;

const SearchInput = ({ handleSearch }) => {
  const inputRef = useRef(null);

  const onSearch = () => {
    if (!inputRef.current) {
      return;
    }

    handleSearch(inputRef.current.value);
  };

  return (
    <InputGroup>
      <FormControl
        data-testid="txt-search-input"
        placeholder="Search city"
        aria-label="Search city"
        onKeyDown={(e) => e.keyCode === ENTER_KEYCODE && onSearch()}
        ref={inputRef}
      />
      <InputGroup.Append>
        <Button variant="outline-secondary" onClick={onSearch} data-testid="btn-search-input">
          <FontAwesomeIcon icon={faSearch} />
        </Button>
      </InputGroup.Append>
    </InputGroup>
  );
};

export default SearchInput;
