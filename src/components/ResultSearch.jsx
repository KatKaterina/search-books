import React, { useContext } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { searchBooks, selectBook } from '../slices/booksSlice.js';
import CardsResult from './CardsResult.jsx';
import ButtonLoadMore from './ButtonLoadMore.jsx';
import InfoResult from './InfoResult.jsx';
import SpinnerLoad from './SpinnerLoad.jsx';
import AppContext from '../contexts/index.js';

const ResultSearch = () => {
  const {
    totalItems,
    allBooks,
    countItemsLoad,
    query,
    typeFilter,
    typeSort,
    loading,
  } = useSelector((state) => state.books);
  const dispatch = useDispatch();
  const { stepPagination } = useContext(AppContext);

  const volume = Math.min(countItemsLoad, totalItems);
  const stateLoading = loading === 'loading';
  const link = '/book';

  const handleClick = () => {
    const startIndex = countItemsLoad;
    const param = {
      query,
      typeFilter,
      typeSort,
      stepPagination,
      startIndex,
    };
    dispatch(searchBooks(param));
  };

  const handleSelectItem = (index) => {
    dispatch(selectBook(index));
  };

  return (
    <Container>
      <SpinnerLoad loading={stateLoading} />
      <InfoResult totalItems={totalItems} loading={loading} />
      <CardsResult items={allBooks} link={link} handleClick={handleSelectItem} />
      <ButtonLoadMore
        volume={volume}
        totalItems={totalItems}
        handleClick={handleClick}
        loading={stateLoading}
      />
    </Container>
  );
};

export default ResultSearch;
