import React, { useState } from 'react';
import styles from './Staff.module.css';

interface StaffFormProps {
  initialData?: Staff;
  onSave: (staff: Staff) => void;
}

interface Staff {
  name: string;
  position: string;
}

const StaffForm: React.FC<StaffFormProps> = ({ initialData = {}, onSave }) => {
  const [name, setName] = useState<string>(initialData.name || '');
  const [position, setPosition] = useState<string>(initialData.position || '');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave({ name, position });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input 
        type="text"
        placeholder="Staff Name"
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
      <button type="submit" className={styles.button}>
        {initialData.name ? 'Edit Staff' : 'Add Staff'}
      </button>
    </form>
  );
};

export default StaffForm;
