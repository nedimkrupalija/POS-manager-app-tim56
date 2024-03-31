import React from 'react';
import './LocationDetails.css'; // Import CSS file

const Storage = (storage) => {
  return (
    <div>
      <h2>Storage: {storage.storageId}</h2>
      <h2>Storage status: {storage.storageStatus}</h2>
      <ul>
        {storage.products.map(product => (
          <li key={product.id}>
            {product.name}: {product.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Storage;
