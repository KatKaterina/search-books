import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import getDataRequest from '../utils/getDataRequest.js';
import getStringRequest from '../utils/getStringRequest.js';
import uploadBooks from '../utils/uploadBooks.js';

const booksAdapter = createEntityAdapter();

const initialState = booksAdapter.getInitialState({
  allBooks: [],
  totalItems: 0,
  query: '',
  typeSort: 'relevance',
  typeFilter: 'all',
  countItemsLoad: 0,
  selectedBook: null,
  loading: '',
  error: null,
});

const getBooks = (param) => {
  const stringRequest = getStringRequest(param);
  return getDataRequest(stringRequest);
};

export const searchBooks = createAsyncThunk('books/fetchData', getBooks);

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setTypeSort: (state, action) => {
      state.typeSort = action.payload;
    },
    setTypeFilter: (state, action) => {
      state.typeFilter = action.payload;
    },
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    resetCount: (state) => {
      state.countItemsLoad = 0;
    },
    selectBook: (state, action) => {
      state.selectedBook = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchBooks.pending, (state) => {
        state.loading = 'loading';
        state.error = null;
      })
      .addCase(searchBooks.fulfilled, (state, action) => {
        const { totalItems, items } = action.payload;
        state.totalItems = totalItems;
        if (totalItems > 0) {
          state.allBooks = uploadBooks(items, state.allBooks, state.countItemsLoad);
          state.countItemsLoad = state.countItemsLoad + items.length;
        } else {
          state.allBooks = [];
          state.countItemsLoad = 0;
        }
        state.loading = 'success';
        state.error = null;
      })
      .addCase(searchBooks.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error;
        state.allBooks = [];
        state.countItemsLoad = 0;
        state.totalItems = 0;
      });
  },
});

export const {
  setTypeSort,
  setTypeFilter,
  setQuery,
  resetCount,
  selectBook,
} = booksSlice.actions;
export default booksSlice.reducer;
