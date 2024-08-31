'use client'
import React from 'react'
import './css/leave.css'
const Leave = () =>  {
    const data = [
        { employee: "Anom", leave: 19, from: "Male" , to: "", days:"", reason:"", },
        { employee: "Anom", leave: 19, from: "Male" , to: "", days:"", reason:"", },
        { employee: "Anom", leave: 19, from: "Male" , to: "", days:"", reason:"", },
        { employee: "Anom", leave: 19, from: "Male" , to: "", days:"", reason:"", },
    ]
    return (
        
    <div className='page'>
        <h1 className='header'>Leave Request</h1>  
        <div className='labels'>
            <div className='label1'>
            <label>Employee Name</label>
            <label>Leave Type</label>
            <label  className='status'>Leave Status</label>
            </div>
            <div className='label2'>
            <label>From</label>
            <label >To</label>       
            </div>
            </div>
            <div className='input'>
                <div className='input1'>
                    <input></input>
                    <input></input>
                    <input></input>
                </div>
                <div className='input2'>
                    <input type='date'></input>
                    <input type='date'></input>
                </div>
            </div>
            <div>
            <button className='submit' type='submit'>Search</button>
            </div>
            <div className='App'>
        <table className='table'>
        <thead>
            <tr className='head'>
            <th>Employee</th>
            <th>Leave Type</th>
            <th>From</th>
            <th>To</th>
            <th>No of days</th>
            <th>Reason</th>
        </tr>
        </thead>
        <tbody>
        {data.map((val, key) => (
            <tr className='body' key={key}>
            <td>{val.employee}</td>
            <td>{val.leave}</td>
            <td>{val.from}</td>
            <td>{val.to}</td>
            <td>{val.days}</td>
            <td>{val.reason}</td>
            </tr>
        )
        )
        };
        </tbody>
        </table>
    </div>
    </div>
        
    )
}

export default Leave