import Login from './components/Login/Login.jsx'
import Home from './components/Home/Home.jsx'
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";

import CRUDTablesStations from './components/CRUDTablesStations/CRUDTablesStations.jsx';
import CRUDLocation from './components/CRUDLocation/CRUDLocation.jsx';
import CRUDItems from './components/CRUDItems/CRUDItems.jsx';
import Orders from './components/Orders/Orders.jsx';
import Modal from 'react-modal';
import CRUDAdmins from './components/CRUDAdmins/CRUDAdmins.jsx';
import CRUDUsers from './components/CRUDUsers/CRUDUsers.jsx';
Modal.setAppElement('#root'); 
function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);


  useEffect(() => {
    Cookies.set('jwt', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic3VwZXJhZG1pbiIsInVzZXJuYW1lIjoibmVkYSIsImlhdCI6MTcxMjc1MDMzOCwiZXhwIjoxNzEyNzUyMTM4fQ.-TiuypmbxNwlhpYtghAKRcw-kDydbM5XulwS0JvwtKo');
    const jwtToken = Cookies.get('jwt');
    console.log(!!jwtToken);
    setIsLoggedIn(!!jwtToken);
  }, []);
  return (
 

    
      <Router basename='/'>
        <Routes>
          <Route path="/items" element={isLoggedIn?  <CRUDItems /> :<Login/> }></Route>
        <Route path="/" element={ isLoggedIn?  <Home /> :<Login/> }></Route>
          <Route path="/orders" element={isLoggedIn?  <Orders /> :<Login/> }/>
          <Route path="/users" element={isLoggedIn?  <CRUDUsers /> :<Login/> }/>
          <Route path="/administrators" element={isLoggedIn?  <CRUDAdmins /> :<Login/> }/>
          <Route path="/locations" element={isLoggedIn?  <CRUDLocation /> :<Login/> }/>
        </Routes>
      </Router>
    
  )
}
export default App
