
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './Orders.css';
import Cookies from 'js-cookie';
const apiUrl = import.meta.env.VITE_REACT_API_URL;
const ModalAddItem = ({ isOpen, onRequestClose, setOrderItems,order }) => {
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [items, setItems] = useState([]);
    const token = Cookies.get('jwt');

    const handleQuantityChange = (id, q) => {
        const updatedItems = items.map(item => {
            if (item.id === id) {
                return { ...item, quantity: q };
            }
            return item;
        });
        if(selectedItems){
            const update = selectedItems.map(item => {
                if (item.id === id) {
                    return { ...item, quantity: q };
                }
                return item;
            });
            setSelectedItems(update);
        }
        setSelectedItems(updatedItems);


    };
    
    const search = () => {
        const filteredResults = items.filter(item =>
            item.name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.id.toString().includes(searchText.toLowerCase())
        );
        setSearchResults(filteredResults);
    };

    const cancelSelection = () => {
        setSearchText('');
        setSearchResults([]);
        setSelectedItems([]);
        onRequestClose();
    };
    const toggleItemSelection = (item) => {
        const selectedItemIndex = selectedItems.findIndex(selectedItem => selectedItem.id === item.id);
        const selectedItem = items.find(i => i.id === item.id); 
        console.log(selectedItem);
        if (selectedItemIndex !== -1) {
            const updatedSelectedItems = [...selectedItems];
            updatedSelectedItems.splice(selectedItemIndex, 1); 
            setSelectedItems(updatedSelectedItems);
        } else {
            setSelectedItems([...selectedItems, { ...item, quantity: selectedItem.quantity }]);
        }
    };
    
    
    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const response = await fetch(`${apiUrl}/item/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            });
            const data = await response.json();
            const filteredItems = data.filter(item => !order.items.some(orderItem => orderItem.id === item.id));
            const updatedItems = filteredItems.map(item => ({
                ...item,
                quantity: 1
            }));
            setItems(updatedItems);
            setSearchResults(updatedItems);
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Add Items"
            className="AddItemsModal"
        >
            <div className='order-details'>
                <h2>Add Items</h2>
                <input
                    type="text"
                    placeholder="Search by name or ID"
                    value={searchText}
                    style={{color:'black'}}
                    onChange={(e) => setSearchText(e.target.value)}
                />
                <button onClick={search}>Search</button>
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
                                        <div className='create'>
                                        <input 
                                            type="checkbox" 
                                            onChange={() => toggleItemSelection(item)}
                                        /></div>
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
                                            style={{ width: '100%', boxSizing: 'border-box', backgroundColor:'white', color:'black' }}
                                            onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <button onClick={cancelSelection}>Cancel</button>
                <button onClick={ () =>{
                setOrderItems(prevOrderItems => [...prevOrderItems, ...selectedItems]);
                onRequestClose();} } style={{float:'right'}}>Save</button>

            </div>
        </Modal>
    );
};

export default ModalAddItem;
