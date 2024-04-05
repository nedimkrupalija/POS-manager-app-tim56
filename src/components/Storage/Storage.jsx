import React, { useState, useEffect } from 'react';
import './Storage.css';
import Home from '../Home/Home';
const Storage = ({ id }) => {
  const [storageData, setStorageData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchStorageData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/storage/${id}`, {
          method: 'GET',
          headers: {
            'Authorization': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic3VwZXJhZG1pbiIsInVzZXJuYW1lIjoibmVkYSIsImlhdCI6MTcxMjI4MDY2OSwiZXhwIjoxNzEyMjgyNDY5fQ.U407zA89BHG0sADYwWeLYxPPFNJIW3JnLnXqYpUHTUE"
          }
      });
        if (!response.ok) {
          throw new Error('Failed to fetch storage data');
        }
        const data = await response.json();
        setStorageData(data);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    fetchStorageData();
  }, [id]);

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
        </div>
      )}
    </div>
    </Home>
  );
};

export default Storage;
