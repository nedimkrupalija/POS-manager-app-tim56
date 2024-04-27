import Modal from 'react-modal';
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import './ListOrder.css';
import items_icon from '../../assets/items.png';
import ModalListOrders from './ModalListOrders';
const ModalFilteredTables = ({ isOpen, onRequestClose,  tables,location}) => {
    const [tableVisible, settableVisible] = useState(true);
    const [orders, setOrders] = useState([]);
    const [items, setItems] = useState([]);
      const [infoMessage, setInfoMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [tables1, setTables1] = useState([]);
    const [itemsFromOrder, setItemsFromOrder] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [modalChooseItemsVisible, setModalChooseItemsVisible] = useState(false);
    const [modalTableVisible, setModalTableVisible] = useState(false);
    const [tableId, setTableId] = useState('');
const [purchaseOrder,setPurchaseOrder]=useState([]);
const [filteredPurchasedOrders,setFilteredPurchasedOrders]=useState([[]]);
const [closed,setClosed]=useState(true);
const [filteredTables,setFilteredTables]=useState([]);

    const token = () => {
        return Cookies.get("jwt");
    }
    useEffect(() => {
        const fetchDataAndUpdateState = async () => {
            const headers = {
                Authorization: token()
            };
            const fetchedPurchaseOrder = await fetchData('GET', `https://pos-app-backend-tim56.onrender.com/purchase-order/`, null, headers);
            setPurchaseOrder(fetchedPurchaseOrder);
            filterTables(fetchedPurchaseOrder);
        };
        fetchDataAndUpdateState();
    }, []);
    const closeModal = () => {
        setClosed(true);
        setFilteredTables([]);
        setFilteredPurchasedOrders([[]]);
    };
    

    const filterTables = async () => {
        const filteredWithTableId = tables.filter(order => {
            return purchaseOrder.find(table => table.tableId == order.id) !== undefined;
        });
        const hasOrderWithoutTable = purchaseOrder.filter(order => order.tableId === null && order.LocationId==location && order.LocationId!=null) ;
        if (hasOrderWithoutTable.lenght!=0) {
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
            const fetchedPurchaseOrder = await fetchData('GET', `https://pos-app-backend-tim56.onrender.com/purchase-order/`, null, headers);
            setPurchaseOrder(fetchedPurchaseOrder);
            filterTables(fetchedPurchaseOrder);
        };
        fetchDataAndUpdateState();
    }, [filteredTables]);

    const filterPurchaseOrders = async (tableId) => {
        setFilteredPurchasedOrders(purchaseOrder.filter(order => order.tableId == tableId));
        if(tableId==null)
        {
            const hasOrderWithoutTable = purchaseOrder.filter(order => order.tableId === null && order.LocationId==location && order.LocationId!=null ) ;

setFilteredPurchasedOrders(hasOrderWithoutTable);
        }

        open(tableId);
    };
    const open=(tableId)=>{
        filterPurchaseOrders(tableId);   
     }

    
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
            {
             (
                tables &&(
             <div className='list'>
        <h2 className='users-title'>Orders</h2>
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
                                <th>TableId</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTables.map(station => (
                                <tr key={station.id}>
                                    <td>{station.id}</td>
                                    <td>                                       
                                          {station.name}                                    
                                    </td>
                                   
                                    <td>           
                                 <button className='button2' onClick={() =>{filterPurchaseOrders(station.id); setClosed(false)}}>View Orders</button>
                                     </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div> 
              
                <button onClick={onRequestClose} className='close-button'>Close</button>
                </>
    </div>   


    
    ))}
{filteredPurchasedOrders[0]!=undefined && !closed&& filteredPurchasedOrders[0].length!=0 && (
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
