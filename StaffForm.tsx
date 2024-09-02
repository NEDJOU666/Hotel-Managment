import React, { useState } from 'react';
import styles from './Staff.module.css';

interface StaffFormProps {
  initialData?: Staff;
  onSave: (staff: Staff) => void;
}

interface Staff {
  name: string;
  position: string;
  department: string;
  contact: string;
  dateOfHire: string;
  salary: number;
}

const StaffForm: React.FC<StaffFormProps> = ({ initialData = {}, onSave }) => {
  const [name, setName] = useState<string>(initialData.name || '');
  const [position, setPosition] = useState<string>(initialData.position || '');
  const [department, setDepartment] = useState<string>(initialData.department || '');
  const [contact, setContact] = useState<string>(initialData.contact || '');
  const [dateOfHire, setDateOfHire] = useState<string>(initialData.dateOfHire || '');
  const [salary, setSalary] = useState<number>(initialData.salary || 0);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave({ name, position, department, contact, dateOfHire, salary });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={styles.input}
        required
      />
      <input
        type="text"
        placeholder="Position"
        value={position}
        onChange={(e) => setPosition(e.target.value)}
        className={styles.input}
        required
      />
      <input
        type="text"
        placeholder="Department"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
        className={styles.input}
        required
      />
      <input
        type="text"
        placeholder="Contact"
        value={contact}
        onChange={(e) => setContact(e.target.value)}
        className={styles.input}
        required
      />
      <input
        type="date"
        placeholder="Date of Hire"
        value={dateOfHire}
        onChange={(e) => setDateOfHire(e.target.value)}
        className={styles.input}
        required
      />
      <input
        type="number"
        placeholder="Salary"
        value={salary}
        onChange={(e) => setSalary(Number(e.target.value))}
        className={styles.input}
        required
      />
      <button type="submit" className={styles.button}>
        {initialData.name ? 'Edit Staff' : 'Add Staff'}
      </button>
    </form>
  );
};

export default StaffForm;
