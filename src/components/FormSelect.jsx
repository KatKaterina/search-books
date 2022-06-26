import React from 'react';
import { Col, Form } from 'react-bootstrap';

const FormSelect = (props) => {
  const {
    values,
    handleChange,
    label = '',
    ariaLabel = '',
    loading = false,
  } = props;
  return (
    <>
      <Form.Label column md="auto">
        {label}
      </Form.Label>
      <Col md="auto">
        <Form.Select onChange={handleChange} disabled={loading} aria-label={ariaLabel}>
          {values.map((val) => (
            <option value={val} key={val}>{val}</option>
          ))}
        </Form.Select>
      </Col>
    </>
  );
};

export default FormSelect;
