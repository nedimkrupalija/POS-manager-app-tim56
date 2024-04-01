import React, { useState, useEffect } from 'react';
import './CRUDAdmins.css';
import edit_icon from '../../assets/edit.png';
import delete_icon from '../../assets/delete.png';

const CRUDAdmins = () => {
  const [view, setView] = useState('table'); 

  const handleSwitchView = (view) => {
    setView(view);
  };

  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    fetchAdmins();
}, []);

  const fetchAdmins = async () => {
    try {
        const headers = {
            'Authorization': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJ1c2VybmFtZSI6ImFtaW5hIiwiaWF0IjoxNzExOTI5MDQ4LCJleHAiOjE3MTE5MzA4NDh9.AG6q-SVM0Eb3UpqDEPf4lbyRErpZNTdcOzw0ZJ-9HkI`
        };
        const data = await fetchData('GET', 'http://localhost:3000/admin/administators', null, headers);
        setAdmins(data);
    } catch (error) {
        console.error(error);
    }
  };

  const createAdmin = async () => {
    const username = document.getElementById('usernameCreate').value;
    const password = document.getElementById('passwordCreate').value;
    const phoneNumber = document.getElementById('phoneCreate').value;
    const role = 'admin';

    try {
        const requestData = { username, password, phoneNumber, role };
        const headers = {
            'Authorization': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJ1c2VybmFtZSI6ImFtaW5hIiwiaWF0IjoxNzExOTI5MDQ4LCJleHAiOjE3MTE5MzA4NDh9.AG6q-SVM0Eb3UpqDEPf4lbyRErpZNTdcOzw0ZJ-9HkI`
        };
        await fetchData('POST', 'http://localhost:3000/admin/administators', requestData, headers);
        fetchAdmins(); 
    } catch (error) {
        console.error(error);
    }
};

const confirmDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this admin?")) {
        await deleteAdmin(id);
    }
};
const deleteAdmin = async (id) => {
    try {
        const headers = {
            'Authorization': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJ1c2VybmFtZSI6ImFtaW5hIiwiaWF0IjoxNzExOTI5MDQ4LCJleHAiOjE3MTE5MzA4NDh9.AG6q-SVM0Eb3UpqDEPf4lbyRErpZNTdcOzw0ZJ-9HkI`
        };
        await fetchData('DELETE', `http://localhost:3000/admin/administators/${id}`, null, headers);
        fetchAdmins();
    } catch (error) {
        console.error(error);
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
    <>
      <div className='list'>
        <h2 className='users-title'>
          {view === 'table'
            ? 'Admins'
            : view === 'create'
            ? 'Create new admin'
            : 'Edit admin'}
        </h2>
        <div className='buttons-container'>
          <button
            className={view === 'table' ? 'buttons' : 'buttons1'}
            onClick={() => {handleSwitchView('table') ; fetchAdmins();}}
          >
            List admins
          </button>
          <button
            className={view === 'create' ? 'buttons1' : 'buttons'}
            onClick={() => handleSwitchView('create')}
          >
            Create new
          </button>
          <button
            className={view === 'edit' ? 'buttons2' : 'buttons'}
            onClick={() => handleSwitchView('edit')}
          >
            Edit
          </button>
        </div>
        {view === 'table' && (
          <div className='table'>
            <table border='1'>
                <thead>
                <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Phone Number</th>
                <th>Password</th>
                <th>Role</th>
                <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {admins.map(admin => (
                             <tr key={admin.id}>
                                <td>{admin.id}</td>
                                <td>{admin.username}</td>
                                <td>{admin.phoneNumber}</td>
                                <td>{admin.password}</td>
                                <td>{admin.role}</td>
                                <td>
                                    <div className='actions-containter'>
                                        <img src={edit_icon} alt="Edit" className='edit-icon' />
                                        <img onClick={() => confirmDelete(admin.id)} src={delete_icon} alt="Delete" className='delete-icon' />
                                    </div>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
          </div>
        )}


        {view === 'create' && (
          <div className='create'>
  
            <div className='createFields'>
            <label htmlFor='username' className='fields'>
              Username:
            </label>
            <input type='text' id='usernameCreate' className='username-input' placeholder='Username' />
            <br />
            <label htmlFor='password' className='fields'>
              Password:
            </label>
            <input type='password' id='passwordCreate' className='password-input' placeholder='Password' />
            <br />
            <label htmlFor='phone' className='fields'>
              Phone Number:
            </label>
            <input type='text' id='phoneCreate' className='phone-input' placeholder='Phone Number' />
          </div>
          <button className='button2' onClick={createAdmin}>Create</button>
          </div>
        )}

        {view === 'edit' && (
          <div className='edit'>
          <div className='createFields'>
            <label htmlFor='username' className='fields'>
              Username:
            </label>
            <input type='text' id='usernameEdit' className='username-input' placeholder='Username' />
            <br />
            <label htmlFor='password' className='fields'>
              Password:
            </label>
            <input type='password' id='passwordEdit' className='password-input' placeholder='Password' />
            <br />
            <label htmlFor='phone' className='fields'>
              Phone Number:
            </label>
            <input type='text' id='phoneEdit' className='phone-input' placeholder='Phone Number' />
          </div>
          <button className='button2'>Edit</button>
          </div>
        )}
      </div>
    </>
  );
};

export default CRUDAdmins;
