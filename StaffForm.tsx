import React, { useState, useEffect } from 'react';
import styles from './Staff.module.css';

interface StaffFormProps {
  initialData?: Staff;
  onSave: (staff: Staff) => void;
}

interface Staff {
  name: string;
  position: string;
  department: string;
  dateOfHire: string;
  salary: number;
}

// Predefined salary set to 30,000 XAF
const predefinedSalary = 30000; 

const StaffForm: React.FC<StaffFormProps> = ({ initialData = {}, onSave }) => {
  const [name, setName] = useState<string>(initialData.name || '');
  const [position, setPosition] = useState<string>(initialData.position || 'Receptionist');
  const [department, setDepartment] = useState<string>(initialData.department || 'Front Desk');
  const [dateOfHire, setDateOfHire] = useState<string>(initialData.dateOfHire || '');
  const [salary, setSalary] = useState<number>(initialData.salary || predefinedSalary);
  const [submitMessage, setSubmitMessage] = useState<string>(''); // Message for submission

  useEffect(() => {
    if (!initialData.dateOfHire) {
      const today = new Date().toISOString().split('T')[0];
      setDateOfHire(today);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave({ name, position, department, dateOfHire, salary });
    setSubmitMessage('Please review the details and confirm the submission.');
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

      <select
        value={position}
        onChange={(e) => setPosition(e.target.value)}
        className={styles.input}
        required
      >
        <option value="General Manager">General Manager</option>
        <option value="Sales and Marketing Manager">Sales and Marketing Manager</option>
        <option value="Receptionist">Receptionist</option>
        <option value="Accountant">Accountant</option>
        <option value="Security Officer">Security Officer</option>
        <option value="Security Manager">Security Manager</option>
        <option value="Housekeeping">Housekeeping</option>
        <option value="Restaurant Manager">Restaurant Manager</option>
        <option value="Waiter / Waitress">Waiter / Waitress</option>
        <option value="Chef">Chef</option>
        <option value="Spa Manager">Spa Manager</option>
        <option value="Massage Therapist">Massage Therapist</option>
        <option value="Fitness Trainer">Fitness Trainer</option>
        <option value="Pool Attendant / Lifeguard">Pool Attendant / Lifeguard</option>
        {/* More positions as needed */}
      </select>

      <select
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
        className={styles.input}
        required
      >
        <option value="Administration">Administration</option>
        <option value="Front Desk">Front Desk</option>
        <option value="HR">Human Resources (HR)</option>
        <option value="Security">Security</option>
        <option value="Housekeeping">Housekeeping</option>
        <option value=" Food and Beverage"> Food and Beverage</option>
        <option value="Spa and Recreation">Spa and Recreation</option>

        {/* Add more departments as needed */}
      </select>

      <input
        type="date"
        value={dateOfHire}
        onChange={(e) => setDateOfHire(e.target.value)}
        className={styles.input}
        required
        readOnly
      />

      <input
        type="number"
        placeholder="Salary (XAF)"
        value={salary}
        onChange={(e) => setSalary(Number(e.target.value))}
        className={styles.input}
        required
      />

      <button type="submit" className={styles.button}>
        {initialData.name ? 'Edit Staff' : 'Add Staff'}
      </button>

      {submitMessage && <p className={styles.submitMessage}>{submitMessage}</p>}
    </form>
  );
};

export default StaffForm;
