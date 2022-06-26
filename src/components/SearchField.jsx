import React, { useRef, useEffect } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';

const SearchField = (props) => {
  const {
    handleClick,
    handleChange,
    value,
    placeholder = '',
    loading = false,
    error = null,
  } = props;

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <>
      <InputGroup className="mb-1">
        <Form.Control
          placeholder={placeholder}
          onChange={handleChange}
          ref={inputRef}
          value={value}
          type="search"
          disabled={loading}
        />
        <Button variant="light" type="submit" onClick={handleClick} disabled={loading}>
          🔍
        </Button>
      </InputGroup>
      {error && <div>{error}</div>}
    </>
  );
};

export default SearchField;
