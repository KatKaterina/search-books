import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import FormSearch from './FormSearch.jsx';
import ResultSearch from './ResultSearch.jsx';
import AppContext from '../contexts/index.js';
import ViewItem from './ViewItem.jsx';

const value = { stepPagination: 30 };

const App = () => (
  <AppContext.Provider value={value}>
    <Router>
      <FormSearch />
      <Routes>
        <Route path="/result" element={<ResultSearch />} />
        <Route path="/book" element={<ViewItem />} />
        <Route path="/" element={<ResultSearch />} />
      </Routes>
    </Router>
  </AppContext.Provider>
);

export default App;
