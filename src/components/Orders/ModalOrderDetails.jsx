import React from 'react';
import Modal from 'react-modal';
import './Orders.css';

const ModalOrderDetails = ({ isOpen, onRequestClose, order }) => {
    function formatDate(inputDate) {
        const date = new Date(inputDate);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Order Details"
        >
            {order && (
                <div className='order-details'>
                    <h2>Order Details</h2>
                    <p><strong>Date:</strong> {formatDate(order.date)}</p>
                    <p><strong>Status:</strong> {order.status}</p>
                    <p><strong>Storage:</strong> {order.storage.status}</p>
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
                                    <td>{item.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    </div>
                    {order.status === 'placed' && ( 
            <button onClick={() => handleCancelOrder(order.id)} className='cancel-button' style={{marginRight:'100px'}}>Cancel Order</button>
        )}
                    <button onClick={onRequestClose} className='close-button'>Close</button>
                </div>
            )}
        </Modal>
    );
};

export default ModalOrderDetails;
