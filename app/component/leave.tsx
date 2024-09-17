'use client';
import { useState } from 'react';
import { StaffDetails } from './interface/staffDetails';
import './leave.css';

const Leave = ({ sheetParams, data }: { sheetParams: any; data: StaffDetails[] }) => {
  // State for filter inputs
  const [filterId, setFilterId] = useState('');
  const [filterName, setFilterName] = useState('');
  const [filterEmail, setFilterEmail] = useState('');
  const [filterFrom, setFilterFrom] = useState('');
  const [filterTo, setFilterTo] = useState('');

  // Filtering the data based on input values
  const filteredData = data.filter((staff,key) => {
    return (
      (!filterId || `EMP-${key}`.includes(filterId)) &&
      (!filterName || staff.name.toLowerCase().includes(filterName.toLowerCase())) &&
      (!filterEmail || staff.email.toLowerCase().includes(filterEmail.toLowerCase())) &&
      (!filterFrom || new Date(staff.dateOfHire) >= new Date(filterFrom)) &&
      (!filterTo || new Date(staff.dateOfHire) <= new Date(filterTo))
    );
  });

  return (
    <div className='page'>
      <h1 className='header'>{sheetParams.title}</h1>

      {/* Labels Section */}
      <div className='labels'>
        <div className='label1'>
          <label>{sheetParams.tableParams[0]}</label>
          <label>{sheetParams.tableParams[1]}</label>
          <label>{sheetParams.tableParams[2]}</label>
        </div>
        <div className='label2'>
          <label>{sheetParams.tableParams[3]}</label>
          <label>{sheetParams.tableParams[4]}</label>
        </div>
      </div>

      {/* Input Section */}
      <div className='input'>
        <div className='input1'>
          <input 
            type='text' 
            placeholder='Enter ID' 
            value={filterId} 
            onChange={(e) => setFilterId(e.target.value)}
          />
          <input 
            type='text' 
            placeholder='Enter Name' 
            value={filterName} 
            onChange={(e) => setFilterName(e.target.value)}
          />
          <input 
            type='text' 
            placeholder='Enter Email' 
            value={filterEmail} 
            onChange={(e) => setFilterEmail(e.target.value)}
          />
        </div>
        <div className='input2'>
          <input 
            type='date' 
            value={filterFrom} 
            onChange={(e) => setFilterFrom(e.target.value)} 
          />
          <input 
            type='date' 
            value={filterTo} 
            onChange={(e) => setFilterTo(e.target.value)} 
          />
        </div>
      </div>

      
      

      {/* Table Section */}
      <div className='App'>
        <table className='table'>
          <thead>
            <tr className='head'>
              {sheetParams.tableParams.map((ti: any, i: number) => (
                <th key={i}>{ti}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((val, key) => (
              <tr className='body' key={key}>
                <td>{`EMP-${key}`}</td>
                <td>{val.name}</td>
                <td className='truncate'>{val.email}</td>
                <td>{val.dateOfHire}</td>
                <td>{val.dateOfHire}</td>
                <td>{val.position}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leave;
