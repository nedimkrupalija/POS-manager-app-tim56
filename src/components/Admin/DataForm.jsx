import React, { useState, useEffect } from 'react';
import DataRow from './DataRow';

function DataForm({onCreate, onCancel= update=false}) {

    const[username, setUsername]=useState("")
    const[phoneNumber, setPhoneNumber]=useState("")
    const[password, setPassword]=useState("")

    const onSubmitCallback = function(e) {
        e.preventDefault()
        onCreate({username, phoneNumber, password})
    }

    return (
    <div className="data-form">
        <form onSubmit={onSubmitCallback} >
        <div>
             <label htmlFor="name">Username</label>
             <input type="text" name="name" id="name" value={username} onChange={e=>setUsername(e.target.value)}/>
        </div>
        
        <div>
             <label htmlFor="number">Phone Number</label>
             <input type="number" name="number" id="number" value={phoneNumber} onChange={e=>setPhoneNumber(e.target.value)}/>
        </div>
   
        <div>
             <label htmlFor="password">Password</label>
             <input type="text" name="pass" id="pass" value={password} onChange={e=>setPassword(e.target.value)} />
        </div>

        <div className='button-container'>
           <button type="submit">{
           update ? "Update" : "Add"
            }</button> 

          {
               update ?
               <button onClick={onCancel}>Cancel</button>
          :null
          }

        </div>

        </form>
    </div>
    );
  }
  
  export default DataForm;