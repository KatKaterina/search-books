import React from 'react';
import { Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import defaultImg from '../img/kniga25.jpg';

const CardResult = (props) => {
  const {
    imgLink,
    imgDescr,
    category,
    title,
    subtitle,
    link,
    handleClickLink,
    index,
  } = props;

  return (
    <Col>
      <Card className="h-100">
        <Card.Body>
          <img src={imgLink || defaultImg} className="smallThumbnail mx-auto d-block mb-4" alt={imgDescr} />
          <div className="text-decoration-underline text-muted mb-2">{category}</div>
          <Card.Title>{title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{subtitle}</Card.Subtitle>
          <Link to={link} className="stretched-link" onClick={handleClickLink(index)} />
        </Card.Body>
      </Card>
    </Col>
  );
};

export default CardResult;
