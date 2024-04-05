import React, { useState, useEffect } from 'react';
import './CRUDAdmins.css';
import edit_icon from '../../assets/edit.png';
import delete_icon from '../../assets/delete.png';
import confirm_icon from '../../assets/confirm.png'
import close_icon from '../../assets/close.png'
import info_icon from '../../assets/info.png'
import Cookies from 'js-cookie';
import Home from '../Home/Home';
const CRUDAdmins = () => {

  const [admins, setAdmins] = useState([]);
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [tableVisible, settableVisible] = useState(true);
  const [infoMessage, setInfoMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic3VwZXJhZG1pbiIsInVzZXJuYW1lIjoibmVkYSIsImlhdCI6MTcxMjI3ODQ5NywiZXhwIjoxNzEyMjgwMjk3fQ.3T6B2XsLMXT9ldg_xGAUEZsILhn5leEkKYO5e4RLNoo";

  useEffect(() => {
    fetchAdmins();
}, []);

  const fetchAdmins = async () => {
    try {
        //const token=Cookies.get('jwt');
        const headers = {
            'Authorization': token
        };
        const data = await fetchData('GET', 'http://localhost:3000/admin/administrators', null, headers);
        setAdmins(data);
    } catch (error) {
        console.error(error);
    }
  };

//                                      CREATE
  const createAdmin = async () => {
    const username = document.getElementById('usernameCreate').value;
    const password = document.getElementById('passwordCreate').value;
    const phoneNumber = document.getElementById('phoneCreate').value;
    const role = 'admin';

    try {
        if (username == '' || password == '' || phoneNumber == '') {
            setErrorMessage('All fields must be filled!')
            setInfoMessage('')
        }
        else if (isNaN(phoneNumber)) {
            setErrorMessage('Phone number must be a number!');
            setInfoMessage('');
        }
        else{
        const requestData = { username, password, phoneNumber, role };
        const headers = {
            'Authorization': token
        };
        await fetchData('POST', 'http://localhost:3000/admin/administrators', requestData, headers);
        setInfoMessage('User created')
                document.getElementById('usernameCreate').value = ''
                document.getElementById('passwordCreate').value = ''
                document.getElementById('phoneCreate').value = ''
                setErrorMessage('')   
        fetchAdmins(); 
    }} catch (error) {
        console.error(error);
    }
};

//                                      DELETE
const confirmDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this admin?")) {
        await deleteAdmin(id);
    }
};
const deleteAdmin = async (id) => {
    try {
        const headers = {
            'Authorization': token
                };
        await fetchData('DELETE', `http://localhost:3000/admin/administrators/${id}`, null, headers);
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

//                                  UPDATE

const handleSaveClick = async () => {
  try {
      if (editingAdmin) {
          const id = editingAdmin.id;
          const username = document.getElementById('usernameEdit').value;
          const password = document.getElementById('passwordEdit').value;
          const phoneNumber = document.getElementById('phoneEdit').value;
          const role = document.getElementById('roleEdit').value;

          const requestData = { username, password, phoneNumber, role };
          const headers = {
              'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic3VwZXJhZG1pbiIsInVzZXJuYW1lIjoibmVkYSIsImlhdCI6MTcxMjE0OTYxMiwiZXhwIjoxNzEyMTg4Nzk5fQ.wqlAfxnFMUU8Ve5E1QpXNlC2_mRtTkW8V604UYZx16Y',
          };
          await fetchData('PUT', `http://localhost:3000/admin/administrators/${id}`, requestData, headers);
          fetchAdmins();
          setEditingAdmin(null);
      }
  } catch (error) {
      console.error(error);
  }
};

return (
    <Home>
  <>
      <div className='list'>
          <h2 className='users-title'>{tableVisible ? "Admins" : "Create new admin"}</h2>
          <div className="buttons-container">
              <button disabled={tableVisible} className={tableVisible ? 'buttons' : 'buttons1'} onClick={() => { settableVisible(true); fetchAdmins(); setInfoMessage(''); setErrorMessage('') }}>List admins</button>
              <button disabled={!tableVisible} className={tableVisible ? 'buttons1' : 'buttons'} onClick={() => { settableVisible(false); setErrorMessage('') }}>Create new</button>
          </div>
          {tableVisible && (
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
                                      <td className="editable-cell">
                                          {editingAdmin === admin ? (
                                              <input id="usernameEdit" type="text" defaultValue={admin.username} className="editable-input" />
                                          ) : (
                                              admin.username
                                          )}
                                      </td>
                                      <td className="editable-cell">
                                          {editingAdmin === admin ? (
                                              <input id="phoneEdit" type="text" defaultValue={admin.phoneNumber} className="editable-input" />
                                          ) : (
                                              admin.phoneNumber
                                          )}
                                      </td>
                                      <td className="editable-cell">
                                          {editingAdmin === admin ? (
                                              <input id="passwordEdit" type="text" defaultValue={admin.password} className="editable-input" />
                                          ) : (
                                              admin.password
                                          )}
                                      </td>
                                      <td className="editable-cell">
                                          {editingAdmin === admin ? (
                                              <select id="roleEdit" defaultValue={admin.role} className="editable-input">
                                                  <option value="admin">admin</option>
                                                  <option value="user">user</option>
                                              </select>
                                          ) : (
                                              admin.role
                                          )}
                                      </td>
                                      <td>
                                          <div className='actions-containter'>
                                              {
                                                  editingAdmin === admin
                                                      ? <img onClick={() => handleSaveClick()} src={confirm_icon} alt="Confirm" className='confirm-icon' />
                                                      : <img onClick={() => setEditingAdmin(admin)} src={edit_icon} alt="Edit" className='edit-icon' />
                                              }
                                              {
                                                  editingAdmin === admin
                                                      ? <img onClick={() => setEditingAdmin(null)} src={close_icon} alt="Close" className='close-icon' />
                                                      : <img onClick={() => confirmDelete(admin.id)} src={delete_icon} alt="Delete" className='delete-icon' />
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
          <div className='createFields'>
              <label htmlFor="username" className='fields'>Username:</label>
              <input type="text" id="usernameCreate" className="username-input" placeholder="Username" onChange={() => {setInfoMessage('')}}/>
              <br />
              <label htmlFor="password" className='fields'>Password:</label>
              <input type="text" id="passwordCreate" className="password-input" placeholder="Password" onChange={() => {setInfoMessage('')}}/>
              <br />
              <label htmlFor="phone" className='fields'>Phone Number:</label>
              <input type="text" id="phoneCreate" className="phone-input" placeholder="Phone Number" onChange={() => {setInfoMessage('')}}/>
          </div>
          <button className='button2' onClick={createAdmin}>Create</button>
      </div>
      }
  </>
  </Home>
);
};

export default CRUDAdmins;