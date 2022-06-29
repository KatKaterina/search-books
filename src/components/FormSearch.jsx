import React, { useContext, useState, useEffect } from 'react';
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

  const [queryText, setQueryText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('relevance');
  const [error, setError] = useState(null);

  const { loading } = useSelector((state) => state.books);
  const { stepPagination } = useContext(AppContext);

  const startIndex = 0;
  const statusLoading = loading === 'loading';

  useEffect(() => {
    if (isTyping) {
      return;
    }
    if (queryText.trim() !== '') {
      dispatch(resetCount());
      const param = {
        query: queryText,
        typeFilter: filter,
        typeSort: sort,
        stepPagination,
        startIndex,
      };
      dispatch(searchBooks(param));
      navigate('result');
    }
  }, [filter, sort, queryText, isTyping]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    if (queryText.trim() === '' && e.target.value === '') {
      setError('an empty request is not allowed');
      return;
    }
    setIsTyping(false);
  };

  const handleChange = (e) => {
    const val = e.target.value;
    dispatch(setQuery(val));
    setQueryText(val);
    setIsTyping(true);
  };

  const handleChangeFilter = (e) => {
    const val = e.target.value;
    dispatch(setTypeFilter(val));
    setFilter(val);
  };

  const handleChangeSort = (e) => {
    const val = e.target.value;
    dispatch(setTypeSort(val));
    setSort(val);
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
            <FormSelect value={filter} values={filterValues} handleChange={handleChangeFilter} label="Categories" loading={statusLoading} ariaLabel="select-categories" />
            <FormSelect value={sort} values={sortValues} handleChange={handleChangeSort} label="Sorting by" loading={statusLoading} ariaLabel="select-sorting" />
          </Form.Group>
        </Form>
      </Row>
    </Container>
  );
};

export default FormSearch;
