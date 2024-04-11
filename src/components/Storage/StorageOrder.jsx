import React, { useState, useEffect } from 'react'; 
import Home from '../Home/Home';
import error_icon from '../../assets/error.png';
import Cookies from 'js-cookie';
import { useLocation } from 'react-router-dom';
import info_icon from '../../assets/info.png';

const StorageOrder = () => {
    const [tableVisible, settableVisible] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [editingOrder, setEditingOrder] = useState(null);
    const [storages, setStorages] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [items, setItems] = useState([]);
    const [storage, setStorage] = useState([]);
    const [quantity, setQuantity] = useState([]);
    const [infoMessage, setInfoMessage] = useState('');
    const location = useLocation();
    const { pathname } = location;
  
    const token = () => {
        return Cookies.get("jwt");
    } 

    const search = () => {
        const filteredResults = items.filter(item =>
            item.name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.id.toString().includes(searchText.toLowerCase())
        );
        setSearchResults(filteredResults);
    };

    const fetchItems = async () => {
        try {
            const response = await fetch('https://pos-app-backend-tim56.onrender.com/item/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token()
                }
            });
            const extendedToken = response.headers.get('Authorization');
            console.log(extendedToken);
            if (extendedToken) {
                Cookies.set("jwt", extendedToken, { expires: 1/48 });
            }
            const data = await response.json();
            const updatedItems = data.map(item => ({
                ...item,
                quantity: 1
            }));
            setItems(updatedItems);
            setSearchResults(updatedItems);
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };

    useEffect(() => {
        // Izdvoji id iz pathname
        const id = pathname.split('/').pop();
        setStorage(id);
        fetchItems();
    }, []);

    const handleCreateOrder = async () => {
        try {
            const quantityList = selectedItems.map(selectedItem => {
                const existingItem = quantity.find(item => item.ItemId === selectedItem.id);
                if (existingItem) {
                    return existingItem;
                } else {
                    return { ItemId: selectedItem.id, quantity: 1 };
                }
            });
            const response = await fetch(
                'https://pos-app-backend-tim56.onrender.com/orders/',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token()
                    },
                    body: JSON.stringify({
                        'storageId': storage,
                        'items': quantityList,
                        'status': 'placed'
                    })
                });
            settableVisible(true);

            const extendedToken = response.headers.get('Authorization');
            console.log(extendedToken);
            if (extendedToken) {
                Cookies.set("jwt", extendedToken, { expires: 1/48 });
            }
            setInfoMessage("Your new order has been successfully placed!");
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    const handleQuantityChange = (itemId, newQuantity) => {
        const existingIndex = quantity.findIndex(item => item.id === itemId);
        if (existingIndex !== -1) {
            const updatedQuantityList = [...quantity];
            updatedQuantityList[existingIndex].quantity = parseInt(newQuantity);
            setQuantity(updatedQuantityList);
        } else {
            setQuantity(prevList => [...prevList, { "ItemId": itemId, "quantity": newQuantity }]);
        }
    };

    const toggleItemSelection = (item) => {
        if (selectedItems.some(selectedItem => selectedItem.id === item.id)) {
            setSelectedItems(selectedItems.filter(selectedItem => selectedItem.id !== item.id));
        } else {
            setSelectedItems([...selectedItems, item]);
        }
        console.log(selectedItems);
    };

    return (
        <Home>
            <>
                <div className='list'>
                    <h2 className='users-title'>{"CREATE NEW ORDERS"}</h2>
                    {errorMessage && (
                        <div className="error-message">
                            <img src={error_icon} alt='error' className='error-icon' />
                            <span>{errorMessage}</span>
                        </div>
                    )}
                    <div className='create'>
                        <label>Storage</label>
                        <label id="storage">{storage}</label>
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
                        <h3>Items:</h3>
                        <div>
                            <input
                                type="text"
                                placeholder="Search by name or ID"
                                value={searchText}
                                style={{ color: 'black' }}
                                onChange={(e) => setSearchText(e.target.value)}
                            />
                            <button onClick={search}>Search</button>
                        </div>
                        <div className='table'>
                            <table border={1}>
                                <thead>
                                    <tr>
                                        <th>Select</th>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Measuring Unit</th>
                                        <th>Purchase Price</th>
                                        <th>Selling Price</th>
                                        <th>Quantity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {searchResults.map((item) => (
                                        <tr key={item.id}>
                                            <td>
                                                <div className='create1'>
                                                    <input
                                                        type="checkbox"
                                                        onChange={() => toggleItemSelection(item)}
                                                    />
                                                </div>
                                            </td>
                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td>{item.measurmentUnit}</td>
                                            <td>{item.purchasePrice}</td>
                                            <td>{item.sellingPrice}</td>
                                            <td>
                                                <input
                                                    type="number"
                                                    defaultValue={1}
                                                    style={{ width: '100%', boxSizing: 'border-box', backgroundColor: 'white', color: 'black' }}
                                                    onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <button className='button2' onClick={handleCreateOrder}>CREATE</button>
                        </div>
                    </div>
                </div>
            </>
        </Home>
    );
};

export default StorageOrder;
