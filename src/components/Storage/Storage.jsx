import React, { useState, useEffect } from 'react';
import './Storage.css';
const Storage = ({ id }) => {
  const [storageData, setStorageData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchStorageData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/storage/${id}`);
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
    <div className='storage'> 
      <h1>Storage</h1>
      {errorMessage && <p>Error: {errorMessage}</p>}
      {storageData && (
        <div>
          <h2 className='prviNaslov'>Storage location: {storageData.Location.name}</h2>
          <h2 className='drugiNaslov'>Storage status: {storageData.status}</h2>
          <table>
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
      )}
    </div>
    </Home>
  );
};

export default Storage;
