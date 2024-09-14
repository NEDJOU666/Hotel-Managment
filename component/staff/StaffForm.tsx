"use client"
import React, { useState } from 'react';
import styles from './Staff.module.css';
import { StaffDetails } from '../interface/staffDetails';
interface StaffFormProps {
  onSave: (staff: StaffDetails) => void;
}



const StaffForm: React.FC<StaffFormProps> = ({  onSave }) => {
 const [newStaff,setStaff] =  useState<StaffDetails>({
  name:'',
  email:'',
  position: '',
  department: '',
  contact: '',
  dateOfHire: '',
  salary: 0
 })
 const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
   const {name, value} = e.target
   setStaff({...newStaff, [name]:value})
 }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave( newStaff);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        placeholder="Name"
        name='name'
        value={newStaff.name}
        onChange={handleChange}
        className={styles.input}
        required
      />
      <input
        type="text"
        placeholder="Email"
        name='email'
        value={newStaff.email}
        onChange={handleChange}
        className={styles.input}
        required
      />
      <input
        type="text"
        placeholder="Position"
        value={newStaff.position}
        name='position'
        onChange={handleChange}
        className={styles.input}
        required
      />
      <input
        type="text"
        placeholder="Department"
        value={newStaff.department}
        name='department'
        onChange={handleChange}
        className={styles.input}
        required
      />
      <input
        type="text"
        placeholder="Contact"
        name='contact'
        value={newStaff.contact}
        onChange={handleChange}
        className={styles.input}
        required
      />
      <input
        type="date"
        placeholder="Date of Hire"
        name='dateOfHire'
        value={newStaff.dateOfHire}
        onChange={handleChange}
        className={styles.input}
        required
      />
      <input
        type="number"
        placeholder="Salary"
        name='salary'
        value={newStaff.salary}
        onChange={handleChange}
        className={styles.input}
        required
      />
      <button type="submit" className={styles.button}>
        Add Staff
      </button>
    </form>
  );
};

export default StaffForm;
