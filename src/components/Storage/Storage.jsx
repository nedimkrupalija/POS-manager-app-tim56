import React from 'react';
import './Storage.css'; // Import CSS file

const storage = {
  storageId: 1,
  location: 'Location A',
  items: [
    { name: 'Item 1', quantity: 10 },
    { name: 'Item 2', quantity: 20 },
    { name: 'Item 3', quantity: 15 },
    { name: 'Item 4', quantity: 15 },
    { name: 'Item 5', quantity: 15 },
    { name: 'Item 6', quantity: 15 },
    { name: 'Item 7', quantity: 15 },
  ],
};

const Storage = () => {
  return (
    <div className='storage-container'>
      <h2>Storage location: {storage.location}</h2>
      <table>
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {storage.items.map((product, index) => (
            <tr key={index}>
              <td>{product.name}</td>
              <td>{product.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}

export default Storage;