import React from 'react';
import { Row } from 'react-bootstrap';
import CardResult from './CardResult';

const CardsResult = (props) => {
  const { items, link, handleClick } = props;
  const handleClickLink = (id) => () => {
    handleClick(id);
  };

  return (
    <Row xs={1} md={4} className="g-4">
      {items.map((item, index) => (
        <CardResult
          key={`${item.id}${item.etag}`}
          id={item.id}
          imgLink={item.imgLink}
          imgDescr={item.imgDescr}
          category={item.category}
          title={item.title}
          subtitle={item.subtitle}
          link={link}
          handleClickLink={handleClickLink}
          index={index}
        />
      ))}
    </Row>
  );
};

export default CardsResult;
