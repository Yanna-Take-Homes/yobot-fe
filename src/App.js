import React from 'react';
import Home from './views/Home.js';
import { Route } from 'react-router-dom';

const App = () => {
  return ( <div className = 'App' >
    <div className = 'Routes' > 
      <Route exact path='/' component = { Home } />
    </div>
  </div> )
}

export default App;
