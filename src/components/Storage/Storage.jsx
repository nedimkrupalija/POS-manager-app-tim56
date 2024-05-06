import React, { useState, useEffect } from 'react';
import './Storage.css';
import Home from '../Home/Home';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

const apiUrl = import.meta.env.VITE_REACT_API_URL;
const Storage = () => {
  const [storageData, setStorageData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const { pathname } = location;

  const token =()=>{
    return Cookies.get("jwt");
  } 
  useEffect(() => {
    const id = pathname.split('/').pop();
    const fetchStorageData = async () => {
      try {
        const response = await fetch(`${apiUrl}/storage/${id}`, {
          method: 'GET',
          headers: {
            'Authorization': token()
          }
      });
        if (!response.ok) {
          throw new Error('Failed to fetch storage data');
        }
        const extendedToken=response.headers.get('Authorization');
        console.log(extendedToken);
        if(extendedToken){
            Cookies.set("jwt",extendedToken,{expires:1/48});
     
        }
        const data = await response.json();
        setStorageData(data);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    fetchStorageData();
  }, [pathname]);

  return (
    <Home>
    <div className='list'> 
      <h2 className='users-title'>Storage</h2>
      {errorMessage && <p>Error: {errorMessage}</p>}
      {storageData && (
        <div>
          <h2  className='users-title'>Storage location: {storageData.Location.name}</h2>
          <h2 className='users-title'>Storage status: {storageData.status}</h2>
          <div className='table'>
          <table border={1}>
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {storageData.Items.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.StorageItem.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          <Link to={`/storageOrder/${storageData.id}`}><button className='buttons1'>Create new order</button></Link>

        </div>
      )}
    </div>
    </Home>
  );
};

export default Storage;
