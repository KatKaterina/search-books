import React, { useRef, useEffect } from 'react';
import {
  Row,
  Container,
  Col,
  Card,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import defaultImg from '../img/kniga25.jpg';

const ViewItem = () => {
  const { allBooks, selectedBook } = useSelector((state) => state.books);
  const {
    title,
    categories,
    subtitle,
    description,
    imgLink,
    imgDescr,
  } = allBooks[selectedBook];
  const categoriesView = categories.length > 1 ? categories.join(' / ') : categories;
  const topView = useRef();
  useEffect(() => {
    topView.current.scrollIntoView();
  });
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(-1);
  };

  return (
    <Container>
      <Row className="mt-4" ref={topView}>
        <Col>
          <img src={imgLink || defaultImg} className="img-fluid rounded-start mx-auto d-block mb-4 mt-4" alt={imgDescr} />
        </Col>
        <Col>
          <Card.Body>
            <div className="text-muted mb-2">{categoriesView}</div>
            <Card.Title>{title}</Card.Title>
            <Card.Subtitle className="text-decoration-underline mb-2 text-muted">{subtitle}</Card.Subtitle>
            <Card.Text>{description}</Card.Text>
            <Card.Link href="#" onClick={handleClick}>back to search results</Card.Link>
          </Card.Body>
        </Col>
      </Row>
    </Container>
  );
};

export default ViewItem;
