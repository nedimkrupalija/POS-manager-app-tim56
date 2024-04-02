import React, { useState, useEffect } from 'react';

function CRUDLocation() {
  const [locations, setLocations] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const response = await fetch('http://localhost:3000/location', {
        method: 'GET',
        headers: {
          'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic3VwZXJhZG1pbiIsInVzZXJuYW1lIjoibmVkYSIsImlhdCI6MTcxMjA4ODAwMCwiZXhwIjoxNzEyMDg5ODAwfQ.PLTUxRMlTTXvGjbMfx9FPWoLrpvgewBm4DKzID4xLO4'
        }
      });
      const data = await response.json();
      setLocations(data);
    } catch (error) {
      setError(error.message);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Locations</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {locations.map(location => (
            <tr key={location.id}>
              <td>{location.name}</td>
              <td>{location.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CRUDLocation;
