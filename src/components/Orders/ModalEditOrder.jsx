import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './Orders.css';
import ModalAddItem from './ModalAddItem';
import delete_icon from '../../assets/delete.png';

import error_icon from '../../assets/error.png';
import info_icon from '../../assets/info.png';
const ModalEditOrder = ({ isOpen, onRequestClose, order, updateOrder, fetchOrders }) => {
    const [storages, setStorages] = useState([]);
    const [isAddingItems, setIsAddingItems] = useState(false);
    const [infoMessage, setInfoMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [orderItems, setOrderItems] = useState([]);

    const [quantityMap, setQuantityMap] = useState({});
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic3VwZXJhZG1pbiIsInVzZXJuYW1lIjoibmVkYSIsImlhdCI6MTcxMjI4MDY2OSwiZXhwIjoxNzEyMjgyNDY5fQ.U407zA89BHG0sADYwWeLYxPPFNJIW3JnLnXqYpUHTUE";

    
    const getStorages = async () => {
        try {
           
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

    const handleQuantityChange = (itemId, q) => {
        setQuantityMap(prevQuantityMap => ({
            ...prevQuantityMap,
            [itemId]: parseFloat(q)
        }));
        const updatedOrderItems = orderItems.map(item => {
            if (item.id === itemId) {
                return { ...item, quantity: parseFloat(q) };
            }
            return item;
        });
        setOrderItems(updatedOrderItems);
    };
    
    

    const handleAddItemsClick = () => {
        setIsAddingItems(true);
    };

    const handleSaveChangesClick = async (order) => {
        try {
            const updatedItems = [...order.items, ...orderItems].map(({ id,quantity, ...rest }) => ({
                ItemId: id,
                quantity: quantityMap.hasOwnProperty(id) ? quantityMap[id] : quantity,
                ...rest,
            }));
            
            fetch(
                'http://localhost:3000/orders/'+order.id,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                    body: JSON.stringify({ items: updatedItems })
                }
            ).then(response=>{

                if(response.status==200)
setInfoMessage('Changes saved successfully');
else 
setErrorMessage('Error saving changes. Please try again later.');

fetchOrders();
            }).catch(error=>{
                setErrorMessage('Error saving changes. Please try again later.');

            });

        } catch (error) {
            setErrorMessage('Error saving changes. Please try again later.');

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
                                                min={0}
                                                style={{ width: '100%', boxSizing: 'border-box' }}
                                                onChange={(e) => handleQuantityChange(item.id,e.target.value)}
                                            />
                                        </td>
                                       
                                    </tr>
                                ))}
                                {
                                    orderItems &&(
                                        
                                        <>
                                                        {
                                                            
                                                        orderItems.map(item => (
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
                                                min={0}
                                                style={{ width: '100%', boxSizing: 'border-box' }}
                                                onChange={(e) => handleQuantityChange(item.id,e.target.value)}
                                            />
                                        </td>
                                       
                                    </tr>
                                ))}
                                        </>
                                    )
                                }
                            </tbody>
                        </table>
                        <button onClick={handleAddItemsClick} style={{ float: 'right' }}>Add Items</button>
                    </div>
                    <br />
                    <button onClick={() => handleSaveChangesClick(order)}>Save Changes</button>
                    <button onClick={()=>{setInfoMessage('');setErrorMessage('');onRequestClose();}} className='cancel-button'>Cancel</button>
                </div>
            )}
            {isAddingItems && (
                <ModalAddItem
                    isOpen={true} 
                    onRequestClose={() => setIsAddingItems(false)} 
                    setOrderItems={setOrderItems}
                    order={order}
                />
            )}
        </Modal>
    );
};

export default ModalEditOrder;
