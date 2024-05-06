import React, { useState, useEffect } from 'react'; 
import './Orders.css';
import Home from '../Home/Home';
import edit_icon from '../../assets/edit.png';
import delete_icon from '../../assets/delete.png';
import placed_icon from '../../assets/placed.png';
import processed_icon from '../../assets/processed.jpeg';
import error_icon from '../../assets/error.png';
import ModalOrderDetails from './ModalOrderDetails';
import ModalEditOrder from './ModalEditOrder';
import Cookies from 'js-cookie';

const apiUrl = import.meta.env.VITE_REACT_API_URL;

const Orders = () => {
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

    const token =()=>{
        return Cookies.get("jwt");
    } 
    const search = () => {
        const filteredResults = items.filter(item =>
            item.name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.id.toString().includes(searchText.toLowerCase())
        );
        setSearchResults(filteredResults);
    };
    const getStorages = async () => {
        try {
           
             fetch(
                `${apiUrl}/storage/`,
                {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token()
                }
            }).then(response => response.json()) 
            .then(data => {
                setStorages(data); 
                setStorage(data[0]);

            }).catch(error=>{
                setErrorMessage(error.message);

             })
        } catch (error) {
            setErrorMessage(error.message);
        }
    };
   useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {           
           const response= await  fetch(
                `${apiUrl}/orders/`,
                {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token()
                    
                }
            })  ;
            const authHeader = response.headers;

               const data= await response.json()
               setOrders(data);  
                const extendedToken=response.headers.get('Authorization');
               console.log("extended header: ",extendedToken);
               if(extendedToken){
                   Cookies.set("jwt",extendedToken,{expires:1/48});
            
               }
        } catch (error) {
            setErrorMessage(error.message);
        }
    };
    const fetchItems = async () => {
        try {
            const response = await fetch(`${apiUrl}/item/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token()
                }
            });   
            const data = await response.json();
            setItems(data);
            setSearchResults(data);
            const extendedToken=response.headers;
            console.log(extendedToken);
            if(extendedToken){
                Cookies.set("jwt",extendedToken,{expires:1/48});
         
            }

        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };
    const handleCreateOrder = async () => {
        try{
            const quantityList = selectedItems.map(selectedItem => {
                const existingItem = quantity.find(item => item.ItemId === selectedItem.id);
                if (existingItem) {
                    return existingItem;
                } else {
                    return { ItemId: selectedItem.id, quantity: 1 };
                }
            });
            console.log(storages);
            console.log(storage);
         const response=await   fetch(
               `${apiUrl}/orders/`,
               {
               method: 'POST',
               headers: {
                   'Content-Type': 'application/json',
                   'Authorization': token()
               },
               body: JSON.stringify({
                'storageId':storage.id,
                'items':   quantityList,
                'status':'placed'
           })})
             fetchOrders(); 
            settableVisible(true);

            const extendedToken=response.headers.get('Authorization');
            console.log(extendedToken);
            if(extendedToken){
                Cookies.set("jwt",extendedToken,{expires:1/48});
         
            }
          
       } catch (error) {
           setErrorMessage(error.message);
       }
    };
    const handleStatusChange = (id) => {
        setOrders(prevOrders => prevOrders.map(order => {
            if (order.id === id && order.status === 'placed') {
                return { ...order, status: 'processed' };
            }
            try {
                fetch(
                    `${apiUrl}/orders/finish/`+id,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': token()
                        }
                    }
                ).catch(error => {
                    setErrorMessage(error.message);
                });
            } catch (error) {
                setErrorMessage(error.message);
            }
            return order;
        }));
    };
    


    const openEditOrderModal = (order) => {
        setEditingOrder(order);

    };

    const closeEditOrderModal = () => {
        setEditingOrder(null);

    };

    const updateOrder = (orderData) => {
        setOrders(prevOrders => prevOrders.map(order => {
            if (order.id === orderData.id) {
                return { ...order, ...orderData };
            }
            return order;
        }));
        setEditingOrder(null);

    };
    function formatDate(inputDate) {
        const date = new Date(inputDate);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
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
    const handleDeleteOrder = async (itemId) => {
        try{           
            const response = await fetch(
                `${apiUrl}/orders/`+itemId,
               {
               method: 'DELETE',
               headers: {
                   'Content-Type': 'application/json',
                   'Authorization': token()
               }
           })
           fetchOrders();

           const extendedToken=response.headers.get('Authorization');
               console.log(extendedToken);
               if(extendedToken){
                   Cookies.set("jwt",extendedToken,{expires:1/48});
            
               }
       } catch (error) {
           setErrorMessage(error.message);
       }
    };

    const openOrderDetails = (order) => {
        setSelectedOrder(order);
    };

    const closeOrderDetails = () => {
        setSelectedOrder(null);
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
                <h2 className='users-title'>{"Orders" }</h2>
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
                                <th>ID</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                        {orders.map(order => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{formatDate(order.date)}</td>                               
                                <td>
                                <button onClick={() => handleStatusChange(order.id)} className={order.status=='placed'? 'Placed':'Processed'}>
                                        {
 order.status === 'placed' ? 
 <img src={placed_icon} alt="Placed" className='edit-icon' /> :
 <img src={processed_icon} alt="Processed" className='edit-icon' />
}
{order.status}                                        
                                    </button>
                                </td>
                                <td>
                                <div className='actions-containter'>
                {order.status === 'placed' && ( 
                    <img src={edit_icon} alt="Edit" className='edit-icon' onClick={() => openEditOrderModal(order)}/> 
                )}
                <img src={delete_icon} alt="Delete" className='delete-icon' onClick={() => handleDeleteOrder(order.id)}/> 
            </div>
                                    </td>
                                    <td><button className='details' onClick={()=>openOrderDetails(order)}>View details</button></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                

           
</div>
            </>
            <ModalOrderDetails 
                isOpen={selectedOrder !== null}
                onRequestClose={closeOrderDetails}
                order={selectedOrder}
                cancelOrder={handleDeleteOrder}
            />
            <ModalEditOrder 
                isOpen={editingOrder !== null}
                onRequestClose={closeEditOrderModal}
                order={editingOrder}
                updateOrder={updateOrder}
                fetchOrders={fetchOrders} 

            />
        </Home>
    );
};

export default Orders;

