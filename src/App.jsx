//import Login from './components/Login/Login.jsx'
import Home from './components/Admin/Admin.jsx'
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const jwtToken = Cookies.get('jwt');
    setIsLoggedIn(!!jwtToken);
  }, []);

  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </Router>
  )
}
export default App