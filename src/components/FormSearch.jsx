import React, { useContext, useState } from 'react';
import {
  Row,
  Container,
  Col,
  Form,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  searchBooks,
  setTypeSort,
  setTypeFilter,
  setQuery,
  resetCount,
} from '../slices/booksSlice.js';
import AppContext from '../contexts/index.js';
import FormSelect from './FormSelect.jsx';
import SearchField from './SearchField.jsx';

const FormSearch = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [queryText, setQueryText] = useState('');

  const {
    query,
    typeFilter,
    typeSort,
    loading,
  } = useSelector((state) => state.books);
  const { stepPagination } = useContext(AppContext);

  const startIndex = 0;
  const statusLoading = loading === 'loading';

  const handleRequest = () => {
    if (query.trim() !== '') {
      dispatch(resetCount());
      const param = {
        query,
        typeFilter,
        typeSort,
        stepPagination,
        startIndex,
      };
      dispatch(searchBooks(param));
      navigate('result');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    if (query.trim() === '') {
      setError('an empty request is not allowed');
    }
    handleRequest();
  };

  const handleChange = (e) => {
    const val = e.target.value;
    dispatch(setQuery(val));
    setQueryText(val);
  };

  const handleChangeFilter = (e) => {
    dispatch(setTypeFilter(e.target.value));
    handleSubmit(e);
  };

  const handleChangeSort = (e) => {
    dispatch(setTypeSort(e.target.value));
    handleSubmit(e);
  };

  const filterValues = ['all', 'art', 'biography', 'computers', 'history', 'medicine', 'poetry'];
  const sortValues = ['relevance', 'newest'];

  return (
    <Container className="backdrop text-white">
      <Row>
        <Col className="mt-5">
          <h1 className="text-center">Search for books</h1>
        </Col>
      </Row>
      <Row>
        <Form onSubmit={handleSubmit}>
          <SearchField placeholder="e.g. Little Prince" value={queryText} handleChange={handleChange} handleClick={handleSubmit} loading={statusLoading} error={error} />
          <Form.Group as={Row} className="mb-5 mt-5 justify-content-center">
            <FormSelect values={filterValues} handleChange={handleChangeFilter} label="Categories" loading={statusLoading} ariaLabel="select categories" />
            <FormSelect values={sortValues} handleChange={handleChangeSort} label="Sorting by" loading={statusLoading} ariaLabel="select sorting" />
          </Form.Group>
        </Form>
      </Row>
    </Container>
  );
};

export default FormSearch;
