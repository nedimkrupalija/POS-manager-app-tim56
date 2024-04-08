import React, { useState, useEffect } from 'react';
import './CRUDTablesStations.css';
import close_icon from '../../assets/close.png'
import info_icon from '../../assets/info.png'
import Cookies from 'js-cookie';
import Home from '../Home/Home';
const CRUDTablesStations = ({ id }) => {

  const [stations, setStation] = useState([]);
  const [infoMessage, setInfoMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const token =()=>{
   return Cookies.get("jwt");
} 
  useEffect(() => {
    fetchTablesStations();
}, []);

  const fetchTablesStations = async () => {
    try {
        //const token=Cookies.get('jwt');
        const headers = {
            'Authorization': token()
        };
        //ruta: 
        const data = await fetchData('GET', 'https://localhost:3000/location/'+id+'/tables', null, headers);
        setStation(data);
    } catch (error) {
        console.error(error);
    }
  };

//                                      CREATE
  const createTablesStations = async () => {
    const number = document.getElementById('numberCreate').value;

    try {
        if (number == '') {
            setErrorMessage('All fields must be filled!')
            setInfoMessage('')
        }
        else{
        const requestData = { number};
        const headers = {
            'Authorization': token()
        };
        //ruta
        await fetchData('POST', 'https://localhost:3000/location/'+id+'/tables', requestData, headers);
        setInfoMessage('Table/Station created')
                document.getElementById('numberCreate').value = ''
                setErrorMessage('')   
        fetchTablesStations(); 
    }} catch (error) {
        console.error(error);
    }
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
        const extendedToken=response.headers.get('Authorization');
        console.log(extendedToken);
        if(extendedToken){
            Cookies.set(jwt,extendedToken,{expires:1/48});
     
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
    
    <>
    <div className='list'>
        <h2 className='users-title'> "Create new table/station"</h2>
        <div className="buttons-container">
            <button >CREATE NEW</button>
        </div>
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
        <div className='createFields'>
            <label htmlFor="number" className='fields'>Table name: </label>
            <input type="text" id="numberCreate" className="number-input" placeholder="Table name" onChange={() => {setInfoMessage('')}}/>
        </div>
        <button className='button2' onClick={createTablesStations}>CREATE</button>
    </div>
    </div>
</>

    
);

};

export default CRUDTablesStations;