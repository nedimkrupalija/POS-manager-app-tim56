import React, { useState, useEffect } from 'react';
import '../CRUDLocation/CRUDLocation.css';
import edit_icon from '../../assets/edit.png';
import delete_icon from '../../assets/delete.png';
import confirm_icon from '../../assets/confirm.png';
import close_icon from '../../assets/close.png';
import info_icon from '../../assets/info.png';
import error_icon from '../../assets/error.png';
import pos_icon from '../../assets/pos.png';
import Home from '../Home/Home';
import Storage from '../Storage/Storage';
import ModalListTables from '../CRUDLocation/ModalListTables'
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import ModalListOrders from './ModalListOrders';

import CRUDTablesStations from '../CRUDTablesStations/CRUDTablesStations';
import ModalFilteredTables from './ModalFilteredTables';
const CRUDLocations = () => {
    const [storageCheckbox, setStorageCheckbox] = useState(false);
    const [tableVisible, setTableVisible] = useState(true);
    const [locations, setLocations] = useState([]);
    const [location, setLocation] = useState(null);
    const [editingLocation, setEditingLocation] = useState(null);
    const [infoMessage, setInfoMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [editingPOS, setEditingPOS] = useState(null);
    const [posList, setPosList] = useState([]);
    const [posTableVisible, setPosTableVisible] = useState(false);
    const [createPOSShown, setCreatePOSShown] = useState(false);
    const [showStorage, setShowStorage] = useState(false);
    const [storageId,setStorageId]=useState();
    const [table,setTable]=useState(null);
    const [showTable, setShowTable] = useState(false);
    const [tableId,setTableId]=useState();
    const [stations, setStations] = useState([]);
const [filteredTables,setFilteredTables]=useState();
const [purchaseOrder,setPurchaseOrder]=useState([]);

   
    useEffect(() => {
if(Cookies.get("location"))
Cookies.remove("location");
        fetchLocations();
        fetchPOS();
      
    }, []);
    
  const handleStorageclick=(storageId)=>{
    setStorageId(storageId);
    setShowStorage(true);

  };
  const handleTableclick=(tableId)=>{
    setTableId(tableId);
    setShowTable(true);

  };
  const closeModal = () => {
    setTable(null);
};
  const token =()=>{
    return Cookies.get("jwt");
} 
    const fetchPOS= async () => {
      try {
          const response = await fetch('https://pos-app-backend-tim56.onrender.com/pos', {
              method: 'GET',
              headers: {
                'Authorization': token()
            }
          });
          const extendedToken=response.headers.get('Authorization');
          if(extendedToken){
              Cookies.set("jwt",extendedToken,{expires:1/48});
       
          }          const data = await response.json();
          setPosList(data);
      } catch (error) {
          setErrorMessage(error.message);
      }
  };
  const filteredPOS = selectedLocation ? posList.filter(pos => pos.LocationId === selectedLocation.id) : [];


    const fetchLocations = async () => {
        try {
            const response = await fetch('https://pos-app-backend-tim56.onrender.com/location', {
                method: 'GET',
                headers: {
                    'Authorization': token()
                }
            });
            const extendedToken=response.headers.get('Authorization');
            if(extendedToken){
                Cookies.set("jwt",extendedToken,{expires:1/48});
         
            }           
            const data = await response.json();
           
            setLocations(data);
        } catch (error) {
            setErrorMessage(error.message);
        }
    };



    const handlePOSclick = async (locationId) => {
      try {
          const response = await fetch(`https://pos-app-backend-tim56.onrender.com/location/${locationId}`, {
              method: 'GET',
              headers: {
                'Authorization': token()
            }
          });
          const extendedToken=response.headers.get('Authorization');
          if(extendedToken){
              Cookies.set("jwt",extendedToken,{expires:1/48});
       
          }
          const data = await response.json();
          
          setSelectedLocation(data); 
          setEditingPOS(null);
          setPosTableVisible(true); 
      } catch (error) {
          setErrorMessage(error.message);
      }
  };
  
  const handleEditPOSClick = (pos) => {
    setEditingPOS(pos);
};
  

    const createLocation = async () => {
        const name = document.getElementById('nameCreate').value;
        const adress = document.getElementById('addressCreate').value; 
        const checkbox = document.getElementById('checkboxCreate').checked;
        try {
            if (name === '' || adress === '') {
                setErrorMessage('All fields must be filled!');
                return;
            }
            const requestData = { name, adress }; 
            const headers = {
                'Authorization': token()
            };
            
            const data = await fetchData('POST', 'https://pos-app-backend-tim56.onrender.com/location', requestData, headers);
            if(checkbox){
                await fetchData('POST', 'https://pos-app-backend-tim56.onrender.com/storage', {status : "Active", LocationId: data.id}, headers);
            }
           
            setInfoMessage('Location created');
            fetchLocations();
            document.getElementById('nameCreate').value = '';
            document.getElementById('addressCreate').value = '';
            setErrorMessage('');
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    const confirmDelete =  (id, storage) => {
        if (window.confirm("Are you sure you want to delete this location?")) {
             deleteLocation(id, storage);
        }
    };

    const deleteLocation = async (id,storage) => {
        const headers = {
            'Authorization': token()
        };
        if(storage)
        {
            await fetchData('DELETE', `https://pos-app-backend-tim56.onrender.com/storage/${storage.id}`, null, headers);
        }
        await fetchData('DELETE', `https://pos-app-backend-tim56.onrender.com/location/${id}`, null, headers);
        setErrorMessage('');
        fetchLocations();
    };

  const deletePOS = async (id) =>{
    const headers = {
        'Authorization': token()
    };
    await fetchData ('DELETE', `https://pos-app-backend-tim56.onrender.com/pos/${id}`, null, headers);
    setErrorMessage('');
    fetchLocations();
    fetchPOS();
  };

  const confirmPOSDelete = async(id)=>{
    if(window.confirm("Are you sure you want to delete this POS?")){
      await deletePOS(id);
      
    }
  };



    const fetchData =  async (method, url, requestData = null, headers = {}) => {
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
            
            if(response.body){
                const extendedToken=response.headers.get('Authorization');

                if(extendedToken){
                    Cookies.set("jwt",extendedToken,{expires:1/48});
             
                }
                const data = await response.json();
                return data;
            }
            if (!response.ok) {
                throw new Error(data.message || 'Error fetching data');
            }
           
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
            'Authorization': token()
        };
              await fetchData('PUT', `https://pos-app-backend-tim56.onrender.com/pos/${id}`, requestData, headers);
              setErrorMessage('');
              fetchPOS();
              setEditingPOS(null);
          
      }
  };
  
  const createPOS = async () => {
    
    const name = document.getElementById('nameCreate').value;
    const status = document.getElementById('statusCreate').value;
    const LocationId = selectedLocation.id;
    try {
        if (name === '' || status === '') {
            setErrorMessage('All fields must be filled!');
            return;
        }
        
        const requestData = { name, status,  LocationId};
        const headers = {
            'Authorization': token()
        };
        await fetchData('POST', 'https://pos-app-backend-tim56.onrender.com/pos', requestData, headers);
        setInfoMessage('POS created');
        fetchPOS();
        document.getElementById('nameCreate').value = '';
        document.getElementById('statusCreate').value = '';
        setErrorMessage('');
        setCreatePOSShown(false);
    } catch (error) {
        setErrorMessage(error.message);
    }
};
const fetchPurchaseOrder=async ()=>{
    const headers = {
        Authorization: token()
    };
    const resp = await fetchData ('GET', `https://pos-app-backend-tim56.onrender.com/purchase-order/`, null, headers)
    console.log("bn",resp )
      setPurchaseOrder(resp);
  };
  const filterTables = async (table) => {
    await fetchPurchaseOrder();

    setFilteredTables(stations.filter(order => {

        return purchaseOrder.find(table => table.tableId == order.id) !== undefined;
    }));

};

const fetchTablesStations = async (location) => {
    try {
        //const token=Cookies.get('jwt');
        const headers = {
            'Authorization': token()
        };
        //ruta: 
        
        const data = await fetchData('GET', 'https://pos-app-backend-tim56.onrender.com/location/'+location.id+'/tables', null, headers);
        console.log("a", data)
        setStations(data);
    } catch (error) {
        console.error(error);
    }
  };
  
const openEditOrderModal = (location) => {
    fetchTablesStations(location);
    setLocation(location);
};

const openListOrderModal = async (location) => {
    Cookies.set("location",location.id);
   await fetchTablesStations(location);
    setTable(location);
   //  await filterTables(location);
};


const closeEditOrderModal = () => {
    Cookies.remove("location")
    setLocation(null);
    
};

    const handleSaveClick = async () => {
        if (editingLocation) {
            const id = editingLocation.id;
            const name = document.getElementById('nameEdit').value;
            const adress = document.getElementById('addressEdit').value;
            const checkbox = document.getElementById('checkboxEdit').checked;   
            if (name === '' || adress === '') {
                setErrorMessage('All fields must be filled!');
                return;
            }
            const requestData = { name, adress }; 
            const headers = {
                'Authorization': token()
            };
            if(!editingLocation.Storage && checkbox){
                await fetchData('POST', 'https://pos-app-backend-tim56.onrender.com/storage', {status : "Active", LocationId: id}, headers);
            }
            else if(editingLocation.Storage && !checkbox){
               
                try {
                    await fetchData('DELETE', `https://pos-app-backend-tim56.onrender.com/storage/${editingLocation.Storage.id}`, null, headers)
                } catch (error) {
                    console.log(error)
                }
                
            }

            await fetchData('PUT', `https://pos-app-backend-tim56.onrender.com/location/${id}`, requestData, headers);
            setErrorMessage('');
            fetchLocations();
            setEditingLocation(null);
        }
    };
if(showStorage){
    
    return <Storage id={storageId}/>
}

if(showTable){
    
    return <CRUDTablesStations id={tableId}/>
}
    return (
        <Home>
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
                                        <th>Storage</th>
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
            <td className='editable-cell'>
                {editingLocation === location ? (
                    <input id='checkboxEdit' type="checkbox" defaultChecked={location.Storage}  />   
                ) : (
                    <div>
                        {location.Storage ? (
                            <>
                                Yes
                                <Link to={`/storage/${location.Storage.id}`}>
   <button className="buttons1">
                                    View Storage
                                </button></Link>
                            </>
                        ) : (
                            "No"
                        )}
                    </div>
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
                        <img onClick={() => confirmDelete(location.id, location.Storage)} src={delete_icon} alt="Delete" className='delete-icon' />

                    )}
                                                    <div className='view-orders-container'>
                     <button className="buttons1" onClick={() => handleTableclick(location.id)}>
                                    Add new table
                                </button>
                                </div>
                                <div className='view-orders-container'>
                                
                                <button className="buttons1" onClick={() => openEditOrderModal(location) }>
                                   View tables
                                </button>
                                </div>
                            
                                <div className='view-orders-container'>
                                     <button className="buttons1" onClick={() => openListOrderModal(location) }>
                                   View orders
                                </button>
                                </div>
                               
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
                        <div style={{ display: 'flex', alignItems: 'center', verticalAlign: 'center' }}>
                            <label className='fields' htmlFor="checkboxCreate">Storage: </label>
                            <input defaultChecked={false} type='checkbox' id="checkboxCreate" />
                        </div>
                        
                      
                        
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


        </div>
        <button className='button2' onClick={createPOS}>CREATE</button>
    </div>
)}



</>

<ModalListTables 
                isOpen={location !== null}
                onRequestClose={closeEditOrderModal}
                tables={stations}
            />
            <ModalFilteredTables 
                isOpen={table !== null}
                onRequestClose={closeModal}
                tables={stations}
                location={Cookies.get("location")}
            />

</Home>

);
        };

export default CRUDLocations;