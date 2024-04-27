import Modal from 'react-modal';
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import items_icon from '../../assets/items.png';
import close_modal_icon from '../../assets/close-modal.png'


const ModalListTables = ({ isOpen, onRequestClose,  tables}) => {
    const [tableVisible, settableVisible] = useState(true);
    const [orders, setOrders] = useState([]);
    const [items, setItems] = useState([]);
    const [tables1, setTables1] = useState([]);
    const [itemsFromOrder, setItemsFromOrder] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [modalChooseItemsVisible, setModalChooseItemsVisible] = useState(false);
    const [modalTableVisible, setModalTableVisible] = useState(false);
    const [tableId, setTableId] = useState('');

    const [infoMessage, setInfoMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
  
    const token = () => {
        return Cookies.get("jwt");
    }

    useEffect(() => {
        fetchOrders();
        checkLocationStorage();
    }, []);

    const checkLocationStorage = async () => {
        try {
            const locationId = Cookies.get('location');
            const savedLocationId = Cookies.get('locationId');
            const hasStorage = Cookies.get('hasStorage');
            if (locationId && (hasStorage === null || locationId !== savedLocationId)) {
                const headers = {
                    Authorization: token()
                };
                const storages = await fetchData('GET', `https://pos-app-backend-tim56.onrender.com/storage`, null, headers);
                const matchingStorage = storages.find(storage => storage.LocationId === parseInt(locationId));
                const endOfToday = new Date();
                endOfToday.setHours(23, 59, 59, 999); 
                if (matchingStorage) {
                    Cookies.set('hasStorage', 'true',{ expires: endOfToday,path: '/' });
                   Cookies.set('storageId', matchingStorage.id,{ expires: endOfToday,path: '/' });
                   
                    Cookies.set('locationId', locationId,{ expires: endOfToday,path: '/' });
                } else {
                    Cookies.set('hasStorage', 'false',{ expires: endOfToday,path: '/' });
                    Cookies.set('locationId', locationId,{ expires: endOfToday,path: '/' });
                }
            }
        } catch (error) {
            console.error('Error checking location storage:', error);
        }
    };

    const fetchOrders = async () => {
        const locationId = Cookies.get('location');
        const userId = Cookies.get('userid');
        if (locationId && userId) {
            const headers = {
                Authorization: token()
            };
            fetchData('GET', `https://pos-app-backend-tim56.onrender.com/purchase-order`, null, headers)
                .then(response1 => {
                    fetchData('GET','https://pos-app-backend-tim56.onrender.com/location/'+Cookies.get('location')+'/tables',null,headers).then(response=>{
                       
                     const orders = response1.filter(order => {
                        return response.some(table => table.id === order.tableId) || order.tableId ===null ;
                    });
                    
                        setOrders(orders)
                    }).catch(error=>{
                        console.error('Error fetching purcshase orders:', error);

                    });
                })
                .catch(error => {
                    console.error('Error fetching purcshase orders:', error);
                });
        }
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

    const openModal = async (order) => {
        const locationId = Cookies.get('location');
        const userId = Cookies.get('userid');
        if (locationId && userId) {
            const headers = {
                Authorization: token()
            };
            const items = await fetchData('GET', `https://pos-app-backend-tim56.onrender.com/purchase-order/${order.id}`, null, headers)
            setSelectedOrder(items.items);
        }

        
        setModalVisible(true);
    }






 
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
                        { (
                <div className='list-orders'>
                    <div className='table1'>
                        <table border="1">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Totals</th>
                                    <th>VAT</th>
                                    <th>Grand total</th>
                                    <th>Table</th>
                                    <th>Location</th>
                                 
                                    <th>Items</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tables.filter(order => order.status=="pending").map(order => (
                                    <tr key={order.id}>
                                        <td>{order.id}</td>
                                        <td>{order.totals}</td>
                                        <td>{order.vat}</td>
                                     
                                        <td>{order.grandTotal}</td>
                                        <td>{order.TableId && order.Table.name|| 'Not assigned'}</td>
                                        <td>{order.LocationId && order.Location.name || 'No location'}</td>
                                        
                                        <td>
                                            <img src={items_icon} alt="Items" className='items_icon' onClick={() => openModal(order)} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {modalVisible && selectedOrder && (
                        <div className="modal-purchase-order">
                            <div className="modal-content-purchase-order">
                                <img src={close_modal_icon} onClick={() => setModalVisible(false)} alt="Close" className="close-modal-icon" />
                                <h2>ITEMS FOR ORDER #{selectedOrder.id}</h2>
                                <div className='table2'>
                                    <table border="1">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Name</th>
                                                <th>BAR-code</th>
                                                <th>Measurement</th>
                                                <th>Purchase price</th>
                                                <th>Selling price</th>
                                                <th>VAT Id</th>
                                                <th>Quantity</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            
                                            {selectedOrder.items.map(item => (
                                                <tr key={item.id}>
                                                    <td>{item.id}</td>
                                                    <td>{item.name}</td>
                                                    <td>{item.barCode}</td>
                                                    <td>{item.measurmentUnit}</td>
                                                    <td>{item.purchasePrice}</td>
                                                    <td>{item.sellingPrice}</td>
                                                    <td>{item.VATId}</td>
                                                    {console.log("item",item.PurchaseItem.quantity)}
                                                    <td>{item.PurchaseItem.quantity}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}
                </div>)}
                <button onClick={onRequestClose} className='close-button'>Close</button>
                </>

                
                <h2>Invoices</h2>
                <>
                {errorMessage && (
                    <div className="error-message">
                        <img src={error_icon} alt='error' className='error-icon' />
                        <span>{errorMessage}</span>
                    </div>
                )}
                        { (
                <div className='list-orders'>
                    <div className='table1'>
                        <table border="1">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Totals</th>
                                    <th>VAT</th>
                                    <th>Grand total</th>
                                    <th>Table</th>
                                    <th>Location</th>
                                  
                                    <th>Items</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tables.filter(order => order.status=="finished").map(order => (
                                    <tr key={order.id}>
                                        <td>{order.id}</td>
                                        <td>{order.totals}</td>
                                        <td>{order.vat}</td>
                                     
                                        <td>{order.grandTotal}</td>
                                        <td>{order.TableId && order.Table.name|| 'Not assigned'}</td>
                                        <td>{order.LocationId && order.Location.name || 'No location'}</td>
                                       
                                        <td>
                                            <img src={items_icon} alt="Items" className='items_icon' onClick={() => openModal(order)} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {modalVisible && selectedOrder && (
                        <div className="modal-purchase-order">
                            <div className="modal-content-purchase-order">
                                <img src={close_modal_icon} onClick={() => setModalVisible(false)} alt="Close" className="close-modal-icon" />
                                <h2>ITEMS FOR INVOICE #{selectedOrder.id}</h2>
                                <div className='table2'>
                                    <table border="1">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Name</th>
                                                <th>BAR-code</th>
                                                <th>Measurement</th>
                                                <th>Purchase price</th>
                                                <th>Selling price</th>
                                                <th>VAT Id</th>
                                                <th>Quantity</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {selectedOrder.items.map(item => (
                                                <tr key={item.id}>
                                                    <td>{item.id}</td>
                                                    <td>{item.name}</td>
                                                    <td>{item.barCode}</td>
                                                    <td>{item.measurmentUnit}</td>
                                                    <td>{item.purchasePrice}</td>
                                                    <td>{item.sellingPrice}</td>
                                                    <td>{item.VATId}</td>
                                                    <td>{item.PurchaseItem.quantity}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}
                </div>)}
                <button onClick={onRequestClose} className='close-button'>Close</button>
                </>
    </div>   
    
    
    ))}
        </Modal>
    );
};

export default ModalListTables;
