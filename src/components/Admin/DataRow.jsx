import React, { useState, useEffect } from 'react';
import DataForm from './DataForm';


export default function DataRow(rowData, index, onDelete, onEdit){
    return(
        <tr>
        <td>{rowData.id}</td>
        <td>{rowData.username}</td>
        <td>{rowData.phoneNumber}</td>
        <td>{rowData.password}</td>
        <td>
            <button onClick={()=> {
            onEdit(index)
            }}>Edit</button>
            
            <button onClick={()=> {
                onDelete(index)
            }}>Delete</button>
        </td>
    </tr>
    )
}