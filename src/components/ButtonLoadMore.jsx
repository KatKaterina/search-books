import React from 'react';
import {
  Row,
  Button,
  Spinner,
} from 'react-bootstrap';

const ButtonLoadMore = (props) => {
  const {
    volume,
    totalItems,
    handleClick,
    loading,
  } = props;

  const renderButton = () => (
    (loading
      ? (
        <Button variant="outline-primary" size="sm" className="mw-50" disabled>
          <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
          Loading...
        </Button>
      )
      : <Button variant="outline-primary" size="sm" className="mw-50" onClick={handleClick}>Load more</Button>
    ));

  return (
    <Row className="justify-content-center mb-4 mt-4">
      { volume < totalItems ? renderButton() : null }
    </Row>
  );
};

export default ButtonLoadMore;
