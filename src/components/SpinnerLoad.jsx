import React from 'react';
import { Row, Spinner } from 'react-bootstrap';

const SpinnerLoad = (props) => {
  const { loading } = props;
  return (
    <Row className="justify-content-center mb-4 mt-4">
      {loading
        ? (
          <div className="text-center">
            <Spinner animation="border" variant="primary" size="sm" />
            Loading...
          </div>
        )
        : null }
    </Row>
  );
};

export default SpinnerLoad;
