import Login from './components/Login/Login.jsx'
import Home from './components/Home/Home.jsx'
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";

import CRUDLocation from './components/CRUDLocation/CRUDLocation.jsx';
import CRUDItems from './components/CRUDItems/CRUDItems.jsx';
import Orders from './components/Orders/Orders.jsx';
import Modal from 'react-modal';

import CRUDAdmins from './components/CRUDAdmins/CRUDAdmins.jsx';
import CRUDUsers from './components/CRUDUsers/CRUDUsers.jsx';

import VATgroups from './components/VATgroups/VATgroups.jsx';
import StorageOrder from './components/Storage/StorageOrder.jsx';
import Storage from './components/Storage/Storage.jsx';
import Statistics from './components/Statistics/Statistics.jsx';

Modal.setAppElement('#root'); 


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);


  useEffect(() => {
   //Cookies.set('jwt', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwicm9sZSI6InN1cGVyYWRtaW4iLCJ1c2VybmFtZSI6Im5lZGEiLCJpYXQiOjE3MTI4NzA0NzMsImV4cCI6MTcxMjg3MjI3M30.4ZkykQyPqXIH2ojx6nVSJUhX7RUonj28iMV5W1SjtHA');
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
          <Route path="/vat" element={isLoggedIn?  <VATgroups /> :<Login/> }/>
          <Route path="/storageOrder/:id" element={isLoggedIn ? <StorageOrder /> : <Login />} />
          <Route path="/storage/:id" element={isLoggedIn ? <Storage /> : <Login />} />
          <Route path="/statistics" element={isLoggedIn ? <Statistics/> : <Login />}></Route>
        </Routes>
      </Router>
    
  )
}
export default App
