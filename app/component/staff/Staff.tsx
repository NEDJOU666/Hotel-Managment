import React, { useEffect, useState } from 'react';
import StaffForm from './StaffForm';
import StaffList from './StaffList';
import styles from './Staff.module.css';

interface Staff {
  name: string;
  position: string;
}

const Staff = ({index}:any) => {
  const [Index ,setIndex] = useState(index)
  useEffect(()=>{
    setIndex(index)
  },[index])
  
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
    console.log(editingStaff)
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Staff Management</h1>
      {Index == 0 && (
        <StaffList staff={staff} onEdit={handleEditStaff} setIndex={setIndex} />
      ) 
     }
     { Index == 1 && (
        <>
          {
            editingStaff && (
              <StaffForm initialData={editingStaff} onSave={handleSaveStaff} />
            )
          }
        </>
      )}
      {
        Index == 2 && (
          <StaffForm onSave={handleSaveStaff} />
  )
      }
    </div>
  );
};

export default Staff;
