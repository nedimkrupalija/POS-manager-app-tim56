import React, { useState, useEffect } from 'react';
import './CRUDItems.css';
import Cookies from 'js-cookie';
import edit_icon from '../../assets/edit.png'
import delete_icon from '../../assets/delete.png'
import confirm_icon from '../../assets/confirm.png'
import close_modal_icon from '../../assets/close-modal.png'
import close_icon from '../../assets/close.png'
import info_icon from '../../assets/info.png'
import error_icon from '../../assets/error.png'
import choose_icon from '../../assets/choose.png'
import Home from '../Home/Home';

const CRUDItems = () => {
    //const ROUTE = 'https://pos-app-backend-tim56.onrender.com/'
    const ROUTE = 'http://localhost:3000/'
    
    const [tableVisible, settableVisible] = useState(true);
    const [items, setItems] = useState([]);
    const [locations, setLocations] = useState([]);
    const [vatGroups, setVATgroups] = useState([]);
    const [editingItem, setEditingItem] = useState(null);
    const [infoMessage, setInfoMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [locationId, setLocationId] = useState(''); 
    const [vatGroup, setVATgroup] = useState(''); 
    const [locModalVisible, setLocModalVisible] = useState(false);
    const [vatModalVisible, setVatModalVisible] = useState(false);
    const token =()=>{
       return Cookies.get("jwt");
    } 
    useEffect(() => {
        fetchItems();
        fetchVatGroups();
        fetchLocations();
    }, []);

    const fetchItems = async () => {
        try {
            const headers = {
                'Authorization': token()
            };
            const data = await fetchData('GET', `${ROUTE}item`, null, headers);
            setItems(data);
        } catch (error) {
            setErrorMessage(error.message)
        }
    };
    
    const fetchVatGroups = async () => {
        try {
            const headers = {
                'Authorization': token()
            };
            const data = await fetchData('GET', `${ROUTE}vat`, null, headers);
            setVATgroups(data);
        } catch (error) {
            setErrorMessage(error.message)
        }
    };

    const fetchLocations = async () => {
        try {
            const headers = {
                'Authorization': token()
            };
            const data = await fetchData('GET', `${ROUTE}location`, null, headers);
            setLocations(data);
        } catch (error) {
            setErrorMessage(error.message)
        }
    };

    const isDataValid = (name, barCode, measurmentUnit, purchasePrice, sellingPrice) => {
        if (name == '' || barCode == '' || measurmentUnit == '' || purchasePrice == '' || sellingPrice == '') {
            setErrorMessage('All fields must be filled!')
            setInfoMessage('')
            return false;
        }
        return true;
    }

    const createItem = async () => {
        const name = document.getElementById('nameCreate').value;
        const barCode = document.getElementById('barcodeCreate').value;
        const measurmentUnit = document.getElementById('measurmentUnitCreate').value;
        const purchasePrice = document.getElementById('purchasePriceCreate').value;
        const sellingPrice = document.getElementById('sellingPriceCreate').value;
        const LocationId = document.getElementById('locationCreate').value;
        const VATId= vatGroup.id;
        try {
            if (isDataValid(name, barCode, measurmentUnit, purchasePrice, sellingPrice)) {
                const requestData = { name, barCode, measurmentUnit, purchasePrice, sellingPrice, LocationId, VATId };
                const headers = {
                    'Authorization': token()
                };
                await fetchData('POST', `${ROUTE}item`, requestData, headers);
                setInfoMessage('Item created')
                document.getElementById('nameCreate').value = ''
                document.getElementById('barcodeCreate').value = ''
                document.getElementById('measurmentUnitCreate').value = ''
                document.getElementById('purchasePriceCreate').value = ''
                document.getElementById('sellingPriceCreate').value = ''
                setErrorMessage('')
                fetchItems();
                fetchVatGroups();
                fetchLocations();
                settableVisible(true)
            }
        } catch (error) {
            setErrorMessage(error.message)
        }
    };

    const confirmDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            await deleteItem(id);
        }
    };

    const deleteItem = async (id) => {
        try {
            const headers = {
                'Authorization': token()
            };
            await fetchData('DELETE', `${ROUTE}item/${id}`, null, headers);
            setErrorMessage('')
            fetchItems();
        } catch (error) {
            setErrorMessage(error.message)
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
                console.log(options.body)
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

    const handleSaveClick = async () => {
        try {
            if (editingItem) {
                const id = editingItem.id;
                const name = document.getElementById('nameEdit').value;
                const barCode = document.getElementById('barcodeEdit').value;
                const measurmentUnit = document.getElementById('measurmentUnitEdit').value;
                const purchasePrice = document.getElementById('purchasePriceEdit').value;
                const sellingPrice = document.getElementById('sellingPriceEdit').value;
                const LocationId = document.getElementById('locationEdit').value
                const VATId = vatGroup.id
                if (isDataValid(name, barCode, measurmentUnit, purchasePrice, sellingPrice)) {
                    const requestData = { name, barCode, measurmentUnit, purchasePrice, sellingPrice, LocationId, VATId };
                    const headers = {
                        'Authorization': `${Cookies.get('jwt')}`,
                    };

                    await fetchData('PUT', `${ROUTE}item/${id}`, requestData, headers);
                    setErrorMessage('')
                    fetchItems();
                    fetchVatGroups()
                    fetchLocations()
                }
            }
        } catch (error) {
            setErrorMessage(error.message)
        }
    };

    return (
        <Home>
        <>
            <div className='list'>
                <h2 className='items-title'>{tableVisible ? "ITEMS" : "CREATE NEW ITEM"}</h2>
                <div className="buttons-container">
                    <button disabled={tableVisible} className={tableVisible ? 'buttons' : 'buttons1'} onClick={() => { settableVisible(true); setInfoMessage(''); setErrorMessage(''); setLocationId(''); setVATgroup(''); }}>LIST ITEMS</button>
                    <button disabled={!tableVisible} className={tableVisible ? 'buttons1' : 'buttons'} onClick={() => { settableVisible(false); setErrorMessage(''); setLocationId(''); setVATgroup('') }}>CREATE NEW</button>
                </div>
                {tableVisible && (
                    <>
                        {errorMessage && (
                            <div className="error-message-items">
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
                                        <th>BAR-code</th>
                                        <th>Measurement</th>
                                        <th>Purchase Price ($)</th>
                                        <th>Selling Price ($)</th>
                                        <th>VAT group (%)</th>
                                        <th>Location ID</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        items.map(item => (
                                            <tr key={item.id}>
                                                <td>{item.id}</td>
                                                <td className="editable-cell">
                                                    {editingItem === item ? (
                                                        <input id="nameEdit" type="text" defaultValue={item.name} className="editable-input" />
                                                    ) : (
                                                        item.name
                                                    )}
                                                </td>
                                                <td className="editable-cell">
                                                    {editingItem === item ? (
                                                        <input id="barcodeEdit" type="text" defaultValue={item.barCode} className="editable-input" />
                                                    ) : (
                                                        item.barCode
                                                    )}
                                                </td>
                                                <td className="editable-cell">
                                                    {editingItem === item ? (
                                                        <input id="measurmentUnitEdit" type="text" defaultValue={item.measurmentUnit} className="editable-input" />
                                                    ) : (
                                                        item.measurmentUnit
                                                    )}
                                                </td>
                                                <td className="editable-cell">
                                                    {editingItem === item ? (
                                                        <input id="purchasePriceEdit" type="number" min="0" defaultValue={item.purchasePrice} className="editable-input" />
                                                    ) : (
                                                        item.purchasePrice
                                                    )}
                                                </td>
                                                <td className="editable-cell">
                                                    {editingItem === item ? (
                                                        <input id="sellingPriceEdit" type="number" min="0" defaultValue={item.sellingPrice} className="editable-input" />
                                                    ) : (
                                                        item.sellingPrice
                                                    )}
                                                </td>
                                                <td className="editable-cell">
                                                    {editingItem === item ? (
                                                        <>
                                                            <input
                                                                id="vatGroupEdit"
                                                                type="text"
                                                                className="editable-input"
                                                                readOnly
                                                                //Ako je izabrana nova vrijednost ona će biti prikazana, ako nije, bit će prikazana stara vrijednost
                                                                Value={vatGroup ? `${vatGroup.name} (${vatGroup.percent}%)`: (item.VAT ? `${item.VAT.name} (${item.VAT.percent}%)` : 'N/A')}
                                                            />

                                                            <button className='buttons1' onClick={() => { setVatModalVisible(true); }}>Find VAT group</button>
                                                        </>
                                                    ) : (
                                                        item.VAT ? `${item.VAT.name} (${item.VAT.percent}%)` : 'N/A'
                                                    )}
                                                </td>
                                                <td className="editable-cell">
                                                    {editingItem === item ? (
                                                        <>
                                                            <input
                                                                id="locationEdit"
                                                                type="text"
                                                                className="editable-input-loc"
                                                                readOnly
                                                                Value={locationId ? locationId : (item.Location ? item.Location.id : 'N/A')}
                                                            />

                                                            <button className='buttons1' onClick={() => { setLocModalVisible(true); }}>Find Location</button>
                                                        </>
                                                    ) : (
                                                        item.Location && item.Location.id ? item.Location.id : 'N/A'
                                                    )}
                                                </td>

                                                <td>
                                                    <div className='actions-containter'>
                                                        {
                                                            editingItem === item
                                                                ? <img onClick={() => { handleSaveClick(); }} src={confirm_icon} alt="Confirm" className='confirm-icon' />
                                                                : <img onClick={() => {setEditingItem(item); setLocationId(''); setVATgroup('')}} src={edit_icon} alt="Edit" className='edit-icon' />
                                                        }
                                                        {
                                                            editingItem === item
                                                                ? <img onClick={() => { setEditingItem(null); setLocationId(''); setVATgroup('') }} src={close_icon} alt="Close" className='close-icon' />
                                                                : <img onClick={() => confirmDelete(item.id)} src={delete_icon} alt="Delete" className='delete-icon' />
                                                        }
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div> </>
                )}
            </div>

            {!tableVisible && <div className='create'>
                {infoMessage && (
                    <div className="info-message-items">
                        <img src={info_icon} alt='info' className='info-icon' />
                        <span>{infoMessage}</span>
                    </div>
                )}
                {errorMessage && (
                    <div className="error-message-items">
                        <img src={error_icon} alt='error' className='error-icon' />
                        <span>{errorMessage}</span>
                    </div>
                )}
                <div className='createFields'>
                    <label htmlFor="name" className='fields'>Name:</label>
                    <input type="text" id="nameCreate" className="name-input" placeholder="Name" onChange={() => { setInfoMessage('') }} />
                    <br />
                    <label htmlFor="barcode" className='fields'>BAR-code:</label>
                    <input type="text" id="barcodeCreate" className="barcode-input" placeholder="BAR-code" onChange={() => { setInfoMessage('') }} />
                    <br />
                    <label htmlFor="measurmentUnit" className='fields'>Measurement:</label>
                    <input type="text" id="measurmentUnitCreate" className="measurment-unit-input" placeholder="Measurement" onChange={() => { setInfoMessage('') }} />
                    <br />
                    <label htmlFor="purchasePrice" className='fields'>Purchase Price ($):</label>
                    <input type="number" min="0" id="purchasePriceCreate" className="purchase-price-input" placeholder="Purchase Price ($)" onChange={() => { setInfoMessage('') }} />
                    <br />
                    <label htmlFor="sellingPrice" className='fields'>Selling Price ($):</label>
                    <input type="number" min="0" id="sellingPriceCreate" className="selling-price-input" placeholder="Selling Price ($)" onChange={() => { setInfoMessage('') }} />
                    <br />
                    <label htmlFor="vatGroup" className='fields'>VAT group:</label>
                    <input type="text" readOnly id="vatCreate" className="location-id-input" placeholder="VAT group" value={vatGroup && `${vatGroup.name} (${vatGroup.percent}%)`} />
                    <button className='select-location-button buttons1' onClick={() => { setVatModalVisible(true) }}>Find VAT group</button>
                    <br />
                    <label htmlFor="locationId" className='fields'>Location ID:</label> {/*probaaaaa*/}
                    <input type="text" readOnly id="locationCreate" className="location-id-input" placeholder="Location ID" value={locationId} onChange={(e) => setLocationId(e.target.value)} />
                    <button className='select-location-button buttons1' onClick={() => { setLocModalVisible(true); fetchLocations() }}>Find Location</button>
                </div>
                <button className='button2' onClick={createItem}>CREATE</button>
            </div>
            }
            {locModalVisible && (
                <div className="modal">
                    <div className="modal-content">
                        <img src={close_modal_icon} onClick={() => setLocModalVisible(false)} alt="Close" className="close-modal-icon" />
                        <h2 className='select-loc-title'>SELECT LOCATION</h2>
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
                                            <td>{location.name}</td>
                                            <td>{location.adress}</td>
                                            <td><img onClick={() => { setLocationId(location.id); setLocModalVisible(false); setInfoMessage('') }} src={choose_icon} alt="Choose" className='choose-icon' /></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
            {vatModalVisible && (
                <div className="modal">
                    <div className="modal-content">
                        <img src={close_modal_icon} onClick={() => setVatModalVisible(false)} alt="Close" className="close-modal-icon" />
                        <h2 className='select-loc-title'>SELECT VAT GROUP</h2>
                        <div className='table'>
                            <table border="1">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Percent</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {vatGroups.map(group => (
                                        <tr key={group.id}>
                                            <td>{group.id}</td>
                                            <td>{group.name}</td>
                                            <td>{group.percent}</td>
                                            <td><img onClick={() => { setVATgroup(group); setVatModalVisible(false); setInfoMessage('') }} src={choose_icon} alt="Choose" className='choose-icon' /></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </>
        </Home>
    );
};

export default CRUDItems;