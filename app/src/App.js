import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


import {BrowserRouter as Router, Route  } from 'react-router-dom';

import Home from './components/Home/Home';
import Chat from './components/Chat/Chat';
import Registration from './components/Registration/Registration';

function App() {
  return (
      <Router>
        <Route path="/" exact component={Home} />
        <Route path="/chat" component={Chat} /> 
        <Route path="/registration" component={Registration} />

      </Router>
  );
}

export default App;
