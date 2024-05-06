import React, { useState, useEffect } from 'react';
import './CRUDTablesStations.css';
import close_icon from '../../assets/close.png';
import info_icon from '../../assets/info.png';
import error_icon from '../../assets/error.png'; // Dodana import
import Cookies from 'js-cookie';
import Home from '../Home/Home';

const apiUrl = import.meta.env.VITE_REACT_API_URL;
const CRUDTablesStations = ({ id }) => {
  const [stations, setStations] = useState([]);
  const [infoMessage, setInfoMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [tableInputs, setTableInputs] = useState([{ id: Date.now(), value: '' }]);

  const token = () => {
    return Cookies.get("jwt");
  }

  useEffect(() => {
    fetchTablesStations();
  }, []);

  const fetchTablesStations = async () => {
    try {
      const headers = {
        'Authorization': token()
      };
      const data = await fetchData('GET', `${apiUrl}/location/` + id + '/tables', null, headers);
      setStations(data);
    } catch (error) {
      console.error(error);
    }
  };

  const createTablesStations = async () => {
    try {
      const requestData = { tables: tableInputs.map(input => ({ name: input.value })) }; 
      const headers = {
        'Authorization': token()
      };
      await fetchData('POST', `${apiUrl}/location/` + id + '/tables', requestData, headers);
      setInfoMessage('Tables/Stations created');
      setTableInputs([{ id: Date.now(), value: '' }]);
      setErrorMessage('');
      fetchTablesStations();
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (id, value) => {
    setTableInputs(prevInputs => prevInputs.map(input => {
      if (input.id === id) {
        return { ...input, value };
      }
      return input;
    }));
  };

  const addTableInput = () => {
    setTableInputs(prevInputs => [...prevInputs, { id: Date.now(), value: '' }]);
  };

  const removeTableInput = id => {
    setTableInputs(prevInputs => prevInputs.filter(input => input.id !== id));
  };

  const fetchData = async (method, url, requestData = null, headers = {}) => {
    try {
      const options = {
        method: method,
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        }
      };

      if (requestData) {
        options.body = JSON.stringify(requestData);
      }

      const response = await fetch(url, options);
      const extendedToken = response.headers.get('Authorization');
      if (extendedToken) {
        Cookies.set('jwt', extendedToken, { expires: 1 / 48 });
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error fetching data');
      }

      return data;
    } catch (error) {
      throw new Error(error.message || 'Error fetching data');
    }
  };

  return (
    <Home>
      <>
        <div className='list'>
          <h2 className='users-title'>Create new table/station</h2>
          <div className='create'>
            {infoMessage && (
              <div className="info-message">
                <img src={info_icon} alt='info' className='info-icon' />
                <span>{infoMessage}</span>
              </div>
            )}
            {errorMessage && (
              <div className="error-message">
                <img src={error_icon} alt='error' className='error-icon' /> 
                <span>{errorMessage}</span>
              </div>
            )}
            {tableInputs.map(input => (
              <div key={input.id} className='createFields'>
                <label htmlFor={`number${input.id}`} className='fields'>Table name: </label>
                <input type="text" id={`number${input.id}`} className="number-input" placeholder="Table name" onChange={e => handleInputChange(input.id, e.target.value)} value={input.value} />
                <button className='buttonNovi' onClick={() => removeTableInput(input.id)}>Remove</button>
              </div>
            ))}
            <button className='buttonNovi2' onClick={addTableInput}>Add more</button>
            <button className='button2' onClick={createTablesStations}>CREATE</button>
          </div>
        </div>
      </>
    </Home>
  );
};

export default CRUDTablesStations;
