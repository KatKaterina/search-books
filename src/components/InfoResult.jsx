import React from 'react';
import { Row } from 'react-bootstrap';

const InfoResult = (props) => {
  const { totalItems, loading } = props;
  const info = (load) => {
    if (load === '' || load === 'loading') {
      return null;
    }
    return load === 'success' ? `Found ${totalItems} results` : 'network error';
  };

  return (
    <Row className="justify-content-center mb-4 mt-4">
      {info(loading)}
    </Row>
  );
};

export default InfoResult;
