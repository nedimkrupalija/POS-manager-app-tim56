import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import edit_icon from '../../assets/edit.png'
import delete_icon from '../../assets/delete.png'
import confirm_icon from '../../assets/confirm.png'
import close_icon from '../../assets/close.png'
import info_icon from '../../assets/info.png'
import error_icon from '../../assets/error.png'
import Home from '../Home/Home';
import './VATgroups.css'

const VATgroups = () => {
    //const ROUTE = 'https://pos-app-backend-tim56.onrender.com/'
    const ROUTE = 'http://localhost:3000/'

    const [tableVisible, settableVisible] = useState(true);
    const [infoMessage, setInfoMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [editingGroup, setEditingGroup] = useState(null);
    const [VATgroups, setVATgroups] = useState([]);

    const token =()=>{
      return  Cookies.get("jwt");
    } 

    useEffect(() => {
        fetchGroups();
    }, []);

    const fetchGroups = async () => {
        try {
            const headers = {
                'Authorization': token()
            };
            const data = await fetchData('GET', `${ROUTE}vat`, null, headers);
            setVATgroups(data);
        } catch (error) {
            setErrorMessage(error.message)
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
            const extendedToken=response.headers.get('Authorization');
            console.log(extendedToken);
            if(extendedToken){
                Cookies.set(jwt,extendedToken,{expires:1/48});
         
            }
            return data;
        } catch (error) {
            throw new Error(error.message || 'Error fetching data');
        }
    };

    const confirmDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            await deleteGroup(id);
        }
    };

    const deleteGroup = async (id) => {
        try {
            const headers = {
                'Authorization': token()
            };
            await fetchData('DELETE', `${ROUTE}vat/${id}`, null, headers);
            setErrorMessage('')
            fetchGroups();
        } catch (error) {
            setErrorMessage(error.message)
        }
    };

    const isDataValid = (name, percent) => {
        if (name == '' || percent == '') {
            setErrorMessage('All fields must be filled!')
            setInfoMessage('')
            return false;
        }
        //Ne bi se trebalo nikad dogoditi jer je input type number
        if (isNaN(percent)) { 
            setErrorMessage('VAT must be a number!');
            setInfoMessage('');
            return false;
        }
        if(percent < 0) {
            setErrorMessage('VAT must be greater than 0')
            setInfoMessage('')
            return false;
        }
        return true;

    }

    const handleSaveClick = async () => {
        try {
            if (editingGroup) {
                const id = editingGroup.id;
                const name = document.getElementById('nameEdit').value;
                const percent = document.getElementById('percentEdit').value;
                if (isDataValid(name, percent)) {
                    const requestData = { name, percent };
                    const headers = {
                        'Authorization': `${Cookies.get('jwt')}`,
                    };

                    await fetchData('PUT', `${ROUTE}vat/${id}`, requestData, headers);
                    setErrorMessage('')
                    fetchGroups();
                    setEditingGroup(null);
                }
            }
        } catch (error) {
            setErrorMessage(error.message)
        }
    };

    const createGroup = async () => {
        const name = document.getElementById('nameCreate').value;
        const percent = document.getElementById('percentCreate').value;
        try {
            if (isDataValid(name, percent)) {
                const requestData = { name,percent };
                const headers = {
                    'Authorization': token()
                };
                await fetchData('POST', `${ROUTE}vat`, requestData, headers);
                setInfoMessage('User created')
                document.getElementById('nameCreate').value = ''
                document.getElementById('percentCreate').value = ''
                setErrorMessage('')
                fetchGroups();
                settableVisible(true)
            }
        } catch (error) {
            setErrorMessage(error.message)
        }
    };

    return (
        <Home>
        <>
            <div className='list'>
                <h2 className='users-title'>{tableVisible ? "VAT groups" : "CREATE NEW GROUP"}</h2>
                <div className="buttons-container">
                    <button disabled={tableVisible} className={tableVisible ? 'buttons' : 'buttons1'} onClick={() => { settableVisible(true); fetchGroups(); setInfoMessage(''); setErrorMessage('') }}>LIST VAT GROUPS</button>
                    <button disabled={!tableVisible} className={tableVisible ? 'buttons1' : 'buttons'} onClick={() => { settableVisible(false); setErrorMessage('') }}>CREATE NEW</button>
                </div>
                
                {tableVisible && (
                    <>
                        {errorMessage && (
                            <div className="error-message-users">
                                <img src={error_icon} alt='error' className='error-icon' />
                                <span>{errorMessage}</span>
                            </div>
                        )}
                        <div className='table'>
                            <table border="1">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Group name</th>
                                        <th>VAT (%)</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {VATgroups.map(group => (
                                        <tr key={group.id}>
                                            <td>{group.id}</td>
                                            <td className="editable-cell">
                                                {editingGroup === group ? (
                                                    <input id="nameEdit" type="text" defaultValue={group.name} className="editable-input" />
                                                ) : (
                                                    group.name
                                                )}
                                            </td>
                                            <td className="editable-cell">
                                                {editingGroup === group ? (
                                                    <input id="percentEdit" type="number" defaultValue={group.percent} className="editable-input" />
                                                ) : (
                                                    group.percent
                                                )}
                                            </td>                                            
                                            <td>
                                                <div className='actions-containter'>
                                                    {
                                                        editingGroup === group
                                                            ? <img onClick={() => handleSaveClick()} src={confirm_icon} alt="Confirm" className='confirm-icon' />
                                                            : <img onClick={() => setEditingGroup(group)} src={edit_icon} alt="Edit" className='edit-icon' />
                                                    }
                                                    {
                                                        editingGroup === group
                                                            ? <img onClick={() => { setEditingGroup(null); setErrorMessage(''); }} src={close_icon} alt="Close" className='close-icon' />
                                                            : <img onClick={() => confirmDelete(group.id)} src={delete_icon} alt="Delete" className='delete-icon' />
                                                    }
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div> </>
                )}
            </div>

            {!tableVisible && <div className='create'>
                {infoMessage && (
                    <div className="info-message-users">
                        <img src={info_icon} alt='info' className='info-icon' />
                        <span>{infoMessage}</span>
                    </div>
                )}
                {errorMessage && (
                    <div className="error-message-users">
                        <img src={error_icon} alt='error' className='error-icon' />
                        <span>{errorMessage}</span>
                    </div>
                )}
                <div className='createFields'>
                    <label htmlFor="username" className='fields'>Name:</label>
                    <input type="text" id="nameCreate" className="username-input" placeholder="Name" onChange={() => { setInfoMessage('') }} />
                    <br />
                    <label htmlFor="phone" className='fields'>VAT (%):</label>
                    <input type="number" id="percentCreate" className="phone-input" placeholder="VAT" onChange={() => { setInfoMessage('') }} />
                </div>
                <button className='button2' onClick={createGroup}>CREATE</button>
            </div>
            }
        </>
        </Home>
    );
}

export default VATgroups



