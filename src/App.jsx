import Login from './components/Login/Login.jsx'
import Home from './components/Home/Home.jsx'
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import CRUDItems from './components/CRUDItems/CRUDItems.jsx';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const jwtToken = Cookies.get('jwt');
    setIsLoggedIn(!!jwtToken);
  }, []);

  return (
      <Router>
        <Routes>
          <Route path="/" element={ isLoggedIn ? <Home /> : <Login /> }></Route>
          <Route path="/items" element={ isLoggedIn ? <CRUDItems /> : <Login /> }></Route>
        </Routes>
      </Router>
  )
}
export default App