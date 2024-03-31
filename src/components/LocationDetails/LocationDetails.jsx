import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './LocationDetails.css'; // Import CSS file
import Storage from '../Storage/Storage';

const LocationDetails = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [storages, setStorages] = useState([]);


  //Get all locations
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get('http://api.example.com/locations');
        setLocations(response.data);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    fetchLocations();
  }, []);

  const handleSearch = () => {
    const foundLocation = locations.find(location => location.name.toLowerCase() === searchTerm.toLowerCase());
    setSelectedLocation(foundLocation);
  };

  //When location name is inputted, we get all storages which are connected to that location
  useEffect(() => {
    const fetchStorages = async () => {
      try {
        const response = await axios.get('http://api.example.com/storage/${locationId}');
        setStorages(response.data);
      } catch (error) {
        console.error('Error fetching storages:', error);
      }
    };

    fetchStorages();
  }, locations);

  return (
    <div>
      <h2>Location Details</h2>
      <input
        type="text"
        placeholder="Search by location name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      {selectedLocation && (
        <div>
          <h3>{selectedLocation.name}</h3>
          <p>Address: {selectedLocation.address}</p>
          <h4>Storages:</h4>
          <ul>
            {storages.map(storage => (
              <li key={storage.id}>
                <Storage storage={storage}/>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LocationDetails;

