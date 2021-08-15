import React, {useState, useEffect} from 'react'
import { BrowserRouter } from 'react-router-dom'
import MainRouter from './MainRouter'
import './App.css';


import {AppContext} from './Context'
import auth from './auth/auth-helper'

function App() {
  const jwt = auth.isAuthenticated()
  const [isAuthenticated, userHasAuthenticated] = useState(auth.isAuthenticated());

  useEffect(() => {
  }, [])
  
  return (
    <div className="App">
      <BrowserRouter>
        <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
          <MainRouter/>
        </AppContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
