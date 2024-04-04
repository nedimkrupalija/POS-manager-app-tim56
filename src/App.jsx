import Login from './components/Login/Login.jsx'
import Home from './components/Home/Home.jsx'
import React, { useState, useEffect } from 'react';
import Orders from './components/Orders/Orders.jsx';
import Cookies from 'js-cookie';
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";

import CRUDAdmins from './components/CRUDAdmins/CRUDAdmins.jsx';

import CRUDUsers from './components/CRUDUsers/CRUDUsers.jsx';

import CRUDItems from './components/CRUDItems/CRUDItems.jsx';
import Modal from 'react-modal';

Modal.setAppElement('#root'); 
function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const jwtToken = Cookies.get('jwt');
    setIsLoggedIn(!!jwtToken);
  }, []);

  return (
      <Router>
        <Routes>
          <Route path="/items" element={  <CRUDItems />  }></Route>
        <Route path="/" element={ <Home /> }></Route>
          <Route path="/orders" element={<Orders/>}/>
          <Route path="/users" element={<CRUDUsers/>}/>
          <Route path="/administrators" element={<CRUDAdmins/>}/>
          <Route path="/storage" element={<Storage/>}/>
        </Routes>
      </Router>
  )
}
export default App