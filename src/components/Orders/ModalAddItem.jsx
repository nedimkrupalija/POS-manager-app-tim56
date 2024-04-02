import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './Orders.css';

const ModalAddItem = ({ isOpen, onRequestClose, addItemToOrder }) => {
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [items, setItems] = useState([]);

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
        if (selectedItems.includes(item)) {
            setSelectedItems(selectedItems.filter(selectedItem => selectedItem !== item));
        } else {
            setSelectedItems([...selectedItems, item]);
        }
    };
    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJ1c2VybmFtZSI6ImFtaW5hIiwiaWF0IjoxNzEyMDkyNzM1LCJleHAiOjE3MTIwOTQ1MzV9.rropnvD6dvDRQjYoNhs4wZN-nqyGO5C7m5i-uMFAfdc";
            const response = await fetch('http://localhost:3000/item/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            });
            const data = await response.json();
            setItems(data);
            setSearchResults(data);
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
                <button onClick={ () =>{addItemToOrder(selectedItems);
                onRequestClose();} } style={{float:'right'}}>Save</button>

            </div>
        </Modal>
    );
};

export default ModalAddItem;
