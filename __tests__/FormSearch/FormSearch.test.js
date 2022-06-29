import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

const testValue1 = {
  query: 'sun',
  typeFilter: 'all',
  typeSort: 'relevance',
  loading: '',
};

const testValue2 = { ...testValue1, loading: 'loading'};

const step = 30;

describe('FormSearch', () => {
  it('create FormSearch', () => {
    mockedSelector.mockReturnValue(testValue1);
    mockedDispatch.mockReturnValue(jest.fn());
    mockedNavigate.mockReturnValue(jest.fn());

    const component = render(
      <AppContext.Provider value={step}>
        <FormSearch />
      </AppContext.Provider>
    );

    expect(component).toMatchSnapshot();
  });

  it('dispatch actions', async() => {
    const dispatch = jest.fn();
    mockedDispatch.mockReturnValue(dispatch);

    const mockedSetTypeFilter = jest.spyOn(actions, 'setTypeFilter');
    const mockedSetTypeSort = jest.spyOn(actions, 'setTypeSort');
    const mockedSetQuery = jest.spyOn(actions, 'setQuery'); 
    render (
      <AppContext.Provider value={step}>
        <FormSearch />
      </AppContext.Provider>
    );

    expect(screen.getByTestId('all').selected).toBe(true);
    await userEvent.selectOptions(screen.getByTestId('select-categories'), ['art']);
    expect(screen.getByTestId('all').selected).toBe(false);
    expect(screen.getByTestId('art').selected).toBe(true);
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(mockedSetTypeFilter).toHaveBeenCalledWith('art');

    expect(screen.getByTestId('relevance').selected).toBe(true);
    await userEvent.selectOptions(screen.getByTestId('select-sorting'), ['newest']);
    expect(screen.getByTestId('newest').selected).toBe(true);
    expect(screen.getByTestId('relevance').selected).toBe(false);
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(mockedSetTypeSort).toHaveBeenCalledWith('newest');

    expect(screen.getByTestId('search-field')).toHaveValue('');
    await userEvent.type(screen.getByTestId('search-field'), 'flowers');
    expect(screen.getByTestId('search-field')).toHaveValue('flowers');
    expect(dispatch).toHaveBeenCalledTimes(9);
    expect(mockedSetQuery).toHaveBeenCalledWith('flowers');
  });

  it('render download process', async() => {
    mockedSelector.mockReturnValue(testValue2);
    render (
      <AppContext.Provider value={step}>
        <FormSearch />
      </AppContext.Provider>
    );
    expect(screen.getByTestId('search-field').disabled).toBe(true);
    expect(screen.getByTestId('button-submit').disabled).toBe(true);
    expect(screen.getByTestId('select-categories').disabled).toBe(true);
    expect(screen.getByTestId('select-sorting').disabled).toBe(true);
  });
});
