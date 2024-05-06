import Modal from 'react-modal';
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import './ListOrder.css';
import items_icon from '../../assets/items.png';
import ModalListOrders from './ModalListOrders';
import { FaEraser } from 'react-icons/fa';

const apiUrl = import.meta.env.VITE_REACT_API_URL;
const ModalFilteredTables = ({ isOpen, onRequestClose, tables, location }) => {
    const [tableVisible, settableVisible] = useState(true);
    const [purchaseOrder, setPurchaseOrder] = useState([]);
    const [filteredPurchasedOrders, setFilteredPurchasedOrders] = useState([[]]);
    const [closed, setClosed] = useState(true);
    const [filteredTables, setFilteredTables] = useState([]);

    const token = () => {
        return Cookies.get("jwt");
    }

    const closeModal = () => {
        setFilteredPurchasedOrders([[]]);
        setClosed(true);
    };

    const filterTables = async () => {
       console.log("cc", tables)
       console.log("purchaseOrder", purchaseOrder)
        const filteredWithTableId = tables.filter(order => {
            return purchaseOrder.find(table => table.TableId == order.id) !== undefined;
        });
        const hasOrderWithoutTable = purchaseOrder.filter(order => order.TableId === null && order.LocationId == Cookies.get("location"));
        if (hasOrderWithoutTable.length !== 0) {
            
            const ordersWithoutTable = [{
                id: null,
                name: "Orders without tables"
            }];
            const updatedFilteredTables = [...filteredWithTableId, ...ordersWithoutTable];
            setFilteredTables(updatedFilteredTables);
        } else {
            setFilteredTables(filteredWithTableId);
        }
    };

    useEffect(() => {
        const fetchDataAndUpdateState = async () => {
            const headers = {
                Authorization: token()
            };
            const fetchedPurchaseOrder = await fetchData('GET', `${apiUrl}/purchase-order/`, null, headers);
           
            setPurchaseOrder(fetchedPurchaseOrder);
            filterTables();
        };
        fetchDataAndUpdateState();
    }, []); // Empty dependency array to run only once after mount

    useEffect(() => {
        filterTables();
    }, [purchaseOrder, tables]); // Dependencies added

    const filterPurchaseOrders = async (tableId) => {
       
        setFilteredPurchasedOrders(purchaseOrder.filter(order => order.TableId == tableId));
       
        if (tableId == null) {
            const hasOrderWithoutTable = purchaseOrder.filter(order =>
                order.TableId === null && order.LocationId == Cookies.get("location"));
            setFilteredPurchasedOrders(hasOrderWithoutTable);
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

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Order Details"
        >
            {tables && (
                <div className='list'>
                    <h2 className='users-title'>Orders</h2>
                    <div className='table'>
                        <table border="1">
                            <thead>
                                <tr>
                                    <th>TableId</th>
                                    <th>Table name</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredTables.map(station => (
                                    <tr key={station.id}>
                                        <td>{station.id}</td>
                                        <td>{station.name}</td>
                                     
                                        <td>
                                            <button className='button2' onClick={() => {
                                                filterPurchaseOrders(station.id);
                                                setClosed(false);
                                            }}>Orders/invoices</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <button onClick={onRequestClose} className='close-button'>Close</button>
                </div>
            )}
            {!closed && filteredPurchasedOrders[0] !== undefined && (
                <ModalListOrders
                    isOpen={true}
                    onRequestClose={closeModal}
                    tables={filteredPurchasedOrders}
                />
            )}
        </Modal>
    );
};

export default ModalFilteredTables;
