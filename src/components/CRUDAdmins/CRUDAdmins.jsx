import React, { useState } from 'react';
import './CRUDAdmins.css';
import edit_icon from '../../assets/edit.png';
import delete_icon from '../../assets/delete.png';

const CRUDAdmins = () => {
  const [view, setView] = useState('table'); 

  const handleSwitchView = (view) => {
    setView(view);
  };

  const fetchAdmins = async () => {
    try {
      const response = await fetch('http://localhost:3000/admin/administators', {
        headers: {
          Authorization: `${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Error fetching administators');
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
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
                    <tr>
                        <td>
                            <div className='actions-containter'>
                                <img src={edit_icon} alt="Edit" className='edit-icon' />
                                <img src={delete_icon} alt="Delete" className='delete-icon' />
                            </div>
                        </td>
                    </tr>
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
          <button className='button2'>Create</button>
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
