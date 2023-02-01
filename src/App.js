import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './Pages/Home';
import BookSearch from './Pages/BookSearch';
import './App.css';

const App = () => (
  <Router>
    <div className="app">
      <Route exact path="/" component={Home} />
      <Route path="/search" component={BookSearch} />
    </div>
  </Router>
);

export default App;
