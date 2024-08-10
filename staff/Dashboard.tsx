import React, { useState } from 'react';
import StaffForm from './StaffForm';
import StaffList from './StaffList';
import styles from './Staff.module.css';

interface Staff {
  name: string;
  position: string;
}

const Dashboard: React.FC = () => {
  const [staff, setStaff] = useState<Staff[]>([
    { name: 'John Doe', position: 'Manager' },
    { name: 'Jane Smith', position: 'Receptionist' },
  ]);

  const [editingStaff, setEditingStaff] = useState<Staff | null>(null);

  const handleSaveStaff = (newStaff: Staff) => {
    if (editingStaff) {
      setStaff(staff.map((s) => (s === editingStaff ? newStaff : s)));
      setEditingStaff(null);
    } else {
      setStaff([...staff, newStaff]);
    }
  };

  const handleEditStaff = (staffMember: Staff) => {
    setEditingStaff(staffMember);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Staff Management</h1>
      {editingStaff ? (
        <StaffForm initialData={editingStaff} onSave={handleSaveStaff} />
      ) : (
        <>
          <StaffForm onSave={handleSaveStaff} />
          <StaffList staff={staff} onEdit={handleEditStaff} />
        </>
      )}
    </div>
  );
};

export default Dashboard;
