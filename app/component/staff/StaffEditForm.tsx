"use client"
import React, { useState } from 'react';
import styles from './Staff.module.css';
import { StaffDetails } from '../interface/staffDetails';
interface StaffFormProps {
  onEdit: (staff: StaffDetails) => void;
  staff: StaffDetails;
}



const StaffForm: React.FC<StaffFormProps> = ({ staff, onEdit }) => {
 const [updateStaff,setStaff] =  useState<StaffDetails>(staff)
 const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
   const {name, value} = e.target
   setStaff({...updateStaff, [name]:value})
 }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onEdit(updateStaff);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        placeholder="Name"
        name='name'
        value={updateStaff.name}
        onChange={handleChange}
        className={styles.input}
        required
      />
      <input
        type="text"
        placeholder="Email"
        name='email'
        value={updateStaff.email}
        onChange={handleChange}
        className={styles.input}
        required
      />
      <input
        type="text"
        placeholder="Position"
        value={updateStaff.position}
        name='position'
        onChange={handleChange}
        className={styles.input}
        required
      />
      <input
        type="text"
        placeholder="Department"
        value={updateStaff.department}
        name='department'
        onChange={handleChange}
        className={styles.input}
        required
      />
      <input
        type="text"
        placeholder="Contact"
        name='contact'
        value={updateStaff.contact}
        onChange={handleChange}
        className={styles.input}
        required
      />
      <input
        type="date"
        placeholder="Date of Hire"
        name='dateOfHire'
        value={updateStaff.dateOfHire}
        onChange={handleChange}
        className={styles.input}
        required
      />
      <input
        type="number"
        placeholder="Salary"
        name='salary'
        value={updateStaff.salary}
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
