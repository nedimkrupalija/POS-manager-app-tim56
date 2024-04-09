import Modal from 'react-modal';
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
const ModalListTables = ({ isOpen, onRequestClose,  tables}) => {
 
    const [stations, setStation] = useState([]);
    const [infoMessage, setInfoMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
  
  
    const token =()=>{
     return Cookies.get("jwt");
  } 
 
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Order Details"
        >
            {
                tables &&(
             <div className='list'>
        <h2 className='users-title'>"Table/Station"</h2>
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
                                <th>ID</th>
                                <th>Table name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tables.map(station => (
                                <tr key={station.id}>
                                    <td>{station.id}</td>
                                    <td>                                       
                                          {station.name}                                    
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div> 
                <button onClick={onRequestClose} className='close-button'>Close</button>
                </>
    </div>   
    
    
    )}
        </Modal>
    );
};

export default ModalListTables;
