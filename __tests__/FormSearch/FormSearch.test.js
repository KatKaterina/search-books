import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect.js';
import React, * as reactHooks from 'react';
import * as reduxHooks from 'react-redux';
import * as actions from '../../src/slices/booksSlice';
import FormSearch from '../../src/components/FormSearch';
import AppContext from '../../src/contexts/index.js';

jest.mock('react-redux');

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

const mockedDispatch = jest.spyOn(reduxHooks, 'useDispatch');
const mockedSelector = jest.spyOn(reduxHooks, 'useSelector');
const mockedNavigate = jest.spyOn(require('react-router-dom'), 'useNavigate');

const testValue = {
  query: '',
  typeFilter: 'all',
  typeSort: 'relevance',
  loading: '',
};
const step = 30;

describe('FormSearch', () => {
  it('create FormSearch', () => {
    mockedSelector.mockReturnValue(testValue);
    mockedDispatch.mockReturnValue(jest.fn());
    mockedNavigate.mockReturnValue(jest.fn());

    const component = render(
      <AppContext.Provider value={step}>
        <FormSearch />
      </AppContext.Provider>
    );

    expect(component).toMatchSnapshot();
  });

  /*it('dispatch actions', () => {
    // in progress
  });*/
});
