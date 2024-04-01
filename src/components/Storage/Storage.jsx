import React, { useState, useEffect } from 'react';
import './Storage.css'; // Import CSS file

const Storage = ({id}) => {
  const [storage, setStorage] = useState({});
  const [storageId, setStorageId] = useState();
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setStorageId(storageId);
    fetchStorage();
  }, [id]);

  const fetchStorage = async () => {
    try {
      const headers = {
        'Authorization': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJ1c2VybmFtZSI6ImFtaW5hIiwiaWF0IjoxNzExOTM0NDcwLCJleHAiOjE3MTE5MzYyNzB9.xx2wj0WaeTGd4Su7XtfR2bUBIrOzWHyMCJp433Ea1xw`
      };
      const response = await fetch('http://localhost:3000/storage/'+id , { headers });
      const data = await response.json();
      setStorage(data);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className='storage-container'>
      <h2>Storage location: {storage.Location && storage.Location.name}</h2>
      <h2>Storage status: {storage.status}</h2>
      <table>
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {storage.Items && storage.Items.map((product, index) => (
            <tr key={index}>
              <td>{product.name}</td>
              <td>{product.StorageItem.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {errorMessage && <p>Error: {errorMessage}</p>}
    </div>
  );
};

export default Storage;

