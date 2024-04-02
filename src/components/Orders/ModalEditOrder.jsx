import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './Orders.css';
import ModalAddItem from './ModalAddItem';

const ModalEditOrder = ({ isOpen, onRequestClose, order, updateOrder, handleQuantityChange }) => {
    const [storages, setStorages] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [isAddingItems, setIsAddingItems] = useState(false);

    function formatDate(inputDate) {
        const date = new Date(inputDate);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    const getStorages = async () => {
        try {
            const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJ1c2VybmFtZSI6ImFtaW5hIiwiaWF0IjoxNzEyMDkyNzM1LCJleHAiOjE3MTIwOTQ1MzV9.rropnvD6dvDRQjYoNhs4wZN-nqyGO5C7m5i-uMFAfdc";
           
            const response = await fetch(
                'http://localhost:3000/storage/',
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    }
                }
            );
            const data = await response.json();
            setStorages(data); 
        } catch (error) {
            console.error('Error fetching storages:', error);
        }
    };
    useEffect(() => {
        getStorages();
    }, []);

    const addItemToOrder = (item) => {
        setSelectedItems(prevItems => [...prevItems, item]);
    };

    const handleAddItemsClick = () => {
        setIsAddingItems(true);
    };

    const handleSaveChangesClick = async (order) => {
        try {
            const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJ1c2VybmFtZSI6ImFtaW5hIiwiaWF0IjoxNzEyMDkyNzM1LCJleHAiOjE3MTIwOTQ1MzV9.rropnvD6dvDRQjYoNhs4wZN-nqyGO5C7m5i-uMFAfdc";
           console.log(order);
           const updatedItems = order.items.map(({ id, ...rest }) => ({ ItemId: id, ...rest }));

            const response = await fetch(
                'http://localhost:3000/orders/'+order.id,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                    body: JSON.stringify({ items: updatedItems })
                }
            );
            const data = await response.json();
            setStorages(data); 
        } catch (error) {
            console.error('Error fetching storages:', error);
        }    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Edit Order"
            className="EditModal" 
        >
            {order && !isAddingItems && (
                <div className='edit-order'>
                    <h2>Edit Order</h2>
                    <label htmlFor="storage">Storage:</label>
                    <select id="storage" value={order.storage.status} onChange={(e) => updateOrder({ ...order, storage: { status: e.target.value } })}>
                        {storages.map(storage => (
                            <option key={storage.id} value={storage.status}>{storage.status}</option>
                        ))}
                    </select>

                    <label htmlFor="date">Date:</label>
                    <input type="date" id="date" value={formatDate(order.date)} onChange={(e) => updateOrder({ ...order, date: e.target.value })} />
                    <h3>Items:</h3>
                    <div className='table'>
                        <table border={1}>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Measuring Unit</th>
                                    <th>Purchase Price</th>
                                    <th>Selling Price</th>
                                    <th>Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {order.items.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.measurmentUnit}</td>
                                        <td>{item.purchasePrice}</td>
                                        <td>{item.sellingPrice}</td>
                                        <td>
                                            <input 
                                                type="number" 
                                                defaultValue={item.quantity} 
                                                style={{ width: '100%', boxSizing: 'border-box' }}
                                                onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button onClick={handleAddItemsClick} style={{ float: 'right' }}>Add Items</button>
                    </div>
                    <br />
                    <button onClick={() => handleSaveChangesClick(order)}>Save Changes</button>
                    <button onClick={onRequestClose} className='cancel-button'>Cancel</button>
                </div>
            )}
            {isAddingItems && (
                <ModalAddItem
                    isOpen={true} // Otvorite modal za dodavanje stavki
                    onRequestClose={() => setIsAddingItems(false)} // Postavite isAddingItems na false da biste zatvorili modal za dodavanje stavki
                    addItemToOrder={addItemToOrder} // Proslijedite funkciju za dodavanje stavki u modal za dodavanje stavki
                />
            )}
        </Modal>
    );
};

export default ModalEditOrder;
