import React, { useState, useEffect } from 'react';
import '../CRUDLocation/CRUDLocation.css';
import edit_icon from '../../assets/edit.png';
import delete_icon from '../../assets/delete.png';
import confirm_icon from '../../assets/confirm.png';
import close_icon from '../../assets/close.png';
import info_icon from '../../assets/info.png';
import error_icon from '../../assets/error.png';
import pos_icon from '../../assets/pos.png';

const CRUDLocations = () => {
    const [tableVisible, setTableVisible] = useState(true);
    const [locations, setLocations] = useState([]);
    const [editingLocation, setEditingLocation] = useState(null);
    const [infoMessage, setInfoMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [editingPOS, setEditingPOS] = useState(null);
    const [posList, setPosList] = useState([]);
    const [posTableVisible, setPosTableVisible] = useState(false);
    const [createPOSShown, setCreatePOSShown] = useState(false);



    useEffect(() => {
        fetchLocations();
        fetchPOS();
    }, []);
  
  
    const fetchPOS= async () => {
      try {
          const response = await fetch('http://localhost:3000/pos', {
              method: 'GET',
              headers: {
                  'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic3VwZXJhZG1pbiIsInVzZXJuYW1lIjoibmVkYSIsImlhdCI6MTcxMjA4ODAwMCwiZXhwIjoxNzEyMDg5ODAwfQ.PLTUxRMlTTXvGjbMfx9FPWoLrpvgewBm4DKzID4xLO4'
              }
          });
          const data = await response.json();
          setPosList(data);
      } catch (error) {
          setErrorMessage(error.message);
      }
  };
  const filteredPOS = selectedLocation ? posList.filter(pos => pos.LocationId === selectedLocation.id) : [];


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
            setErrorMessage(error.message);
        }
    };



    const handlePOSclick = async (locationId) => {
      try {
          const response = await fetch(`http://localhost:3000/location/${locationId}`, {
              method: 'GET',
              headers: {
                  'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic3VwZXJhZG1pbiIsInVzZXJuYW1lIjoibmVkYSIsImlhdCI6MTcxMjA4ODAwMCwiZXhwIjoxNzEyMDg5ODAwfQ.PLTUxRMlTTXvGjbMfx9FPWoLrpvgewBm4DKzID4xLO4'
              }
          });
          const data = await response.json();
          setSelectedLocation(data); // Postavite odabranu lokaciju
          setEditingPOS(null);
          setPosTableVisible(true); // Postavite da se tablica s POS-ovima prikaže nakon što je kliknuto na pos_icon
      } catch (error) {
          setErrorMessage(error.message);
      }
  };
  
  const handleEditPOSClick = (pos) => {
    setEditingPOS(pos);
};
  

    const createLocation = async () => {
        const name = document.getElementById('nameCreate').value;
        const adress = document.getElementById('addressCreate').value; // Promijenjeno ime polja
        try {
            if (name === '' || adress === '') {
                setErrorMessage('All fields must be filled!');
                return;
            }
            const requestData = { name, adress }; // Promijenjeno ime polja
            const headers = {
                'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic3VwZXJhZG1pbiIsInVzZXJuYW1lIjoibmVkYSIsImlhdCI6MTcxMjA4ODAwMCwiZXhwIjoxNzEyMDg5ODAwfQ.PLTUxRMlTTXvGjbMfx9FPWoLrpvgewBm4DKzID4xLO4'
            };
            await fetchData('POST', 'http://localhost:3000/location', requestData, headers);
            setInfoMessage('Location created');
            fetchLocations();
            document.getElementById('nameCreate').value = '';
            document.getElementById('addressCreate').value = '';
            setErrorMessage('');
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    const confirmDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this location?")) {
            await deleteLocation(id);
        }
    };

    const deleteLocation = async (id) => {
        const headers = {
            'Authorization': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic3VwZXJhZG1pbiIsInVzZXJuYW1lIjoibmVkYSIsImlhdCI6MTcxMjA4ODAwMCwiZXhwIjoxNzEyMDg5ODAwfQ.PLTUxRMlTTXvGjbMfx9FPWoLrpvgewBm4DKzID4xLO4`
        };
        await fetchData('DELETE', `http://localhost:3000/location/${id}`, null, headers);
        setErrorMessage('');
        fetchLocations();
    };

  const deletePOS = async (id) =>{
    const headers = {
      'Authorization': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic3VwZXJhZG1pbiIsInVzZXJuYW1lIjoibmVkYSIsImlhdCI6MTcxMjA4ODAwMCwiZXhwIjoxNzEyMDg5ODAwfQ.PLTUxRMlTTXvGjbMfx9FPWoLrpvgewBm4DKzID4xLO4`
  };
    await fetchData ('DELETE', `http://localhost:3000/pos/${id}`, null, headers);
    setErrorMessage('');
    fetchLocations();
  };

  const confirmPOSDelete = async(id)=>{
    if(window.confirm("Are you sure you want to delete this POS?")){
      await deletePOS(id);
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
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Error fetching data');
            }
            return data;
        } catch (error) {
            throw new Error(error.message || 'Error fetching data');
        }
    };
    
  
    const handleSavePOSClick = async (pos) => {
      if (editingPOS) {
          const id = pos.id;
          const name = document.getElementById(`nameEdit_${pos.id}`).value;
          const status = document.getElementById(`statusEdit_${pos.id}`).value;
          if (name === '' || status === '') {
              setErrorMessage('All fields must be filled!');
              return;
          }
          const requestData = { name, status };
          const headers = {
              'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic3VwZXJhZG1pbiIsInVzZXJuYW1lIjoibmVkYSIsImlhdCI6MTcxMjA4ODAwMCwiZXhwIjoxNzEyMDg5ODAwfQ.PLTUxRMlTTXvGjbMfx9FPWoLrpvgewBm4DKzID4xLO4'
          };
              await fetchData('PUT', `http://localhost:3000/pos/${id}`, requestData, headers);
              setErrorMessage('');
              fetchPOS();
              setEditingPOS(null);
          
      }
  };
  
  const createPOS = async () => {
    const name = document.getElementById('nameCreate').value;
    const status = document.getElementById('statusCreate').value;
    const openingTime = document.getElementById('openingTime').value;
    const closingTime = document.getElementById('closingTime').value;
    const createdAt = document.getElementById('createdAt').value;
    const updatedAt = document.getElementById('updatedAt').value;
    const locationId = document.getElementById('locationId').value;

    try {
        if (name === '' || status === '' || openingTime === '' || closingTime === '' || createdAt === '' || updatedAt === '' || locationId === '') {
            setErrorMessage('All fields must be filled!');
            return;
        }
        const requestData = { name, status, openingTime, closingTime, createdAt, updatedAt, locationId };
        const headers = {
            'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic3VwZXJhZG1pbiIsInVzZXJuYW1lIjoibmVkYSIsImlhdCI6MTcxMjA4ODAwMCwiZXhwIjoxNzEyMDg5ODAwfQ.PLTUxRMlTTXvGjbMfx9FPWoLrpvgewBm4DKzID4xLO4'
        };
        await fetchData('POST', 'http://localhost:3000/pos', requestData, headers);
        setInfoMessage('POS created');
        fetchPOS();
        document.getElementById('nameCreate').value = '';
        document.getElementById('statusCreate').value = '';
        document.getElementById('openingTime').value = '';
        document.getElementById('closingTime').value = '';
        document.getElementById('createdAt').value = '';
        document.getElementById('updatedAt').value = '';
        document.getElementById('locationId').value = '';
        setErrorMessage('');
        setCreatePOSShown(false);
    } catch (error) {
        setErrorMessage(error.message);
    }
};




    const handleSaveClick = async () => {
        if (editingLocation) {
            const id = editingLocation.id;
            const name = document.getElementById('nameEdit').value;
            const adress = document.getElementById('addressEdit').value; // Promijenjeno ime polja
            if (name === '' || adress === '') {
                setErrorMessage('All fields must be filled!');
                return;
            }
            const requestData = { name, adress }; // Promijenjeno ime polja
            const headers = {
                'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic3VwZXJhZG1pbiIsInVzZXJuYW1lIjoibmVkYSIsImlhdCI6MTcxMjA4ODAwMCwiZXhwIjoxNzEyMDg5ODAwfQ.PLTUxRMlTTXvGjbMfx9FPWoLrpvgewBm4DKzID4xLO4'
            };
            await fetchData('PUT', `http://localhost:3000/location/${id}`, requestData, headers);
            setErrorMessage('');
            fetchLocations();
            setEditingLocation(null);
        }
    };

    return (
        <>
            <div className='list'>
                <h2 className='locations-title'>{tableVisible ? "LOCATIONS" : "CREATE NEW LOCATION"}</h2>
                <div className="buttons-container">
                    <button disabled={tableVisible} className={tableVisible ? 'buttons' : 'buttons1'} onClick={() => { setTableVisible(true); fetchLocations(); setInfoMessage(''); setErrorMessage('') }}>LIST LOCATIONS</button>
                    <button disabled={!tableVisible} className={tableVisible ? 'buttons1' : 'buttons'} onClick={() => { setTableVisible(false); setErrorMessage('') }}>CREATE NEW</button>
                </div>
                {tableVisible && (
                    <>
                        {errorMessage && (
                            <div className="error-message">
                                <img src={error_icon} alt='error' className='error-icon' />
                                <span>{errorMessage}</span>
                            </div>
                        )}
                        <div className='table'>
                            <table border="1">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Address</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {locations.map(location => (
                                        <tr key={location.id}>
                                            <td>{location.id}</td>
                                            <td className="editable-cell">
                                                {editingLocation === location ? (
                                                    <input id="nameEdit" type="text" defaultValue={location.name} className="editable-input" />
                                                ) : (
                                                    location.name
                                                )}
                                            </td>
                                            <td className="editable-cell">
                                                {editingLocation === location ? (
                                                    <input id="addressEdit" type="text" defaultValue={location.adress} className="editable-input" />
                                                ) : (
                                                    location.adress
                                                )}
                                            </td>
                                            <td>
                                                <div className='actions-container'>
                                                    <img onClick={() => handlePOSclick(location.id)} src={pos_icon} alt="POS" className='icon' />
                                                    {editingLocation === location ? (
                                                        <img onClick={() => handleSaveClick()} src={confirm_icon} alt="Confirm" className='confirm-icon' />
                                                    ) : (
                                                        <img onClick={() => setEditingLocation(location)} src={edit_icon} alt="Edit" className='edit-icon' />
                                                    )}
                                                    {editingLocation === location ? (
                                                        <img onClick={() => { setEditingLocation(null); setErrorMessage(''); }} src={close_icon} alt="Close" className='close-icon' />
                                                    ) : (
                                                        <img onClick={() => confirmDelete(location.id)} src={delete_icon} alt="Delete" className='delete-icon' />
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}
            </div>
            {!tableVisible && (
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
                        <label htmlFor="name" className='fields'>Name:</label>
                        <input type="text" id="nameCreate" className="name-input" placeholder="Name" onChange={() => { setInfoMessage('') }} />
                        <br />
                        <label htmlFor="address" className='fields'>Address:</label>
                        <input type="text" id="addressCreate" className="address-input" placeholder="Address" onChange={() => { setInfoMessage('') }} />
                        <br />
                    </div>
                    <button className='button2' onClick={createLocation}>CREATE</button>
                </div>
                
            )}
            {posTableVisible && (
            <div className='list'>
    <div className="buttons-container">
    <button disabled={posTableVisible} className={posTableVisible ? 'buttons' : 'buttons1'} onClick={() => { posTableVisible(true); fetchLocations(); setInfoMessage(''); setErrorMessage('') }}>LIST POS</button>
    <button disabled={!posTableVisible} className={posTableVisible ? 'buttons1' : 'buttons'} onClick={() => { setPosTableVisible(false); setErrorMessage(''); setCreatePOSShown(true); }}>CREATE NEW</button>

   </div>
    <div className="table-overlay">
        <div className="table-container">
          <div className='table'>
            <table className="table" border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredPOS.map(pos => (
                        <tr key={pos.id}>
                        <td>{pos.id}</td>
                        <td className="editable-cell">
                            {editingPOS === pos ? (
                                <input id={`nameEdit_${pos.id}`} type="text" defaultValue={pos.name} className="editable-input" />
                            ) : (
                                pos.name
                            )}
                        </td>
                        <td className="editable-cell">
                            {editingPOS === pos ? (
                                <input id={`statusEdit_${pos.id}`} type="text" defaultValue={pos.status} className="editable-input" />
                            ) : (
                                pos.status
                            )}
                        </td>
                        <td>
                            <div className="actions-container">
                                {editingPOS === pos ? (
                                    <img
                                        onClick={() => handleSavePOSClick(pos)}
                                        src={confirm_icon}
                                        alt="Confirm"
                                        className="confirm-icon"
                                    />
                                ) : (
                                    <img
                                        onClick={() => handleEditPOSClick(pos)}
                                        src={edit_icon}
                                        alt="Edit"
                                        className="edit-icon"
                                    />
                                )}
                                {editingPOS === pos ? (
                                    <img
                                        onClick={() => {
                                            setEditingPOS(null);
                                            setErrorMessage('');
                                        }}
                                        src={close_icon}
                                        alt="Close"
                                        className="close-icon"
                                    />
                                ) : (
                                    <img
                                        onClick={() => confirmPOSDelete(pos.id)}
                                        src={delete_icon}
                                        alt="Delete"
                                        className="delete-icon"
                                    />
                                )}
                                </div>
                                
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
    </div>
    </div>
)}
{createPOSShown && (
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
            <label htmlFor="name" className='fields'>Name:</label>
            <input type="text" id="nameCreate" className="name-input" placeholder="Name" onChange={() => { setInfoMessage('') }} />
            <br />
            <label htmlFor="status" className='fields'>Status:</label>
            <input type="text" id="statusCreate" className="status-input" placeholder="Status" onChange={() => { setInfoMessage('') }} />
            <br />
            <label htmlFor="openingTime" className='fields'>Opening Time:</label>
  <input type="datetime-local" id="openingTime" name="openingTime" />
<br />
  <label htmlFor="closingTime" className='fields'>Closing Time:</label>
  <input type="datetime-local" id="closingTime" name="closingTime" />
<br />
  <label htmlFor="createdAt" className='fields'>Created At:</label>
  <input type="datetime-local" id="createdAt" name="createdAt" />
<br />
  <label htmlFor="updatedAt" className='fields'>Updated At:</label>
  <input type="datetime-local" id="updatedAt" name="updatedAt" />
  <br />

  <label htmlFor="locationId" className='fields'>Location ID:</label>
  <input type="number" id="locationId" name="locationId" />
  <br />
        </div>
        <button className='button2' onClick={createPOS}>CREATE</button>
    </div>
)}
</>
);
};

export default CRUDLocations;
