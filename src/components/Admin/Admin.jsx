import React, { useState, useEffect } from 'react';
import './Admin.css';
import DataForm from './DataForm';
import DataRow from './DataRow';

const rawData = [
    {
    id: 1,
    username: "Azra",
    phoneNumber: 258,
    password: "Grdonj",
    },
    {
    id: 2,
    username: "Faris",
    phoneNumber: 258,
    password: "Grdonj",
    },
    {
    id: 3,
    username: "Azra",
    phoneNumber: 258,
    password: "Grdonj",
    }
]

export default function Admin(){
    const[tableData, setTableData]=useState(rawData)
    const[editing, setEditing]=useState(false)

    const onSave=({username, phoneNumber, password}) =>{
       const newData=tableData.slice(0, tableData.length)
       newData.push({
        username, phoneNumber, password
       })
       setTableData(newData)
    }

    const onDelete = (index)=> {
        const newData=tableData.slice(0, tableData.length)
        newData.splice(index, 1)
        setTableData(newData)
    }

    const onEdit=(index) =>{
        setEditing(index)
    }

    const onCancel=()=>{
        setEditing(false)
    }

    return(
        <>
        <table>
            <thead>
               <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>PhoneNumber</th>
                    <th>Password</th>
                    <th>Actions</th>
                </tr> 
            </thead>

            <tbody>
                {tableData.map( (rowData, index)=> (
                   <DataRow rowData={rowData} key={index} index={index} onDelete={onDelete} onEdit={onEdit}/>
                ))}
            </tbody>
        </table>
        <DataForm onCreate={onSave} update={editing}/>
        </>
    )
}
