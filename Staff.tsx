import React, { useEffect, useState } from 'react';
import StaffForm from './StaffForm';
import StaffList from './StaffList';
import styles from './Staff.module.css';

// Define the Staff interface for staff properties
interface Staff {
  name: string;
  position: string;
  department: string;
  dateOfHire: string;
  salary: number;
}

const Staff = ({ index }: any) => {
  const [Index, setIndex] = useState(index);

  useEffect(() => {
    setIndex(index);
  }, [index]);

  // Initial staff data with salary in XAF
  const [staff, setStaff] = useState<Staff[]>([
    {
      name: 'John Doe',
      position: 'Manager',
      department: 'Administration',
      dateOfHire: '2021-06-01',
      salary: 50000, // XAF
    },
    {
      name: 'Jane Smith',
      position: 'Receptionist',
      department: 'Front Desk',
      dateOfHire: '2020-09-15',
      salary: 30000, // XAF
    },
  ]);

  const [editingStaff, setEditingStaff] = useState<Staff | null>(null);

  // Handle saving staff (either new or edited)
  const handleSaveStaff = (newStaff: Staff) => {
    if (editingStaff) {
      setStaff(staff.map((s) => (s === editingStaff ? newStaff : s)));
      setEditingStaff(null);
    } else {
      setStaff([...staff, newStaff]);
    }
    setIndex(0); // Switch back to staff list view after saving
  };

  // Handle editing a staff member
  const handleEditStaff = (staffMember: Staff) => {
    setEditingStaff(staffMember);
    setIndex(1); // Switch to edit form view
  };

  // **Handle deleting a staff member**
  const handleDeleteStaff = (staffMember: Staff) => {
    // Confirm the deletion before proceeding
    if (window.confirm(`Are you sure you want to delete ${staffMember.name}?`)) {
      // Remove the staff member from the list
      setStaff(staff.filter((s) => s !== staffMember));
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Staff Management</h1>

      {/* Display the staff list */}
      {Index === 0 && (
        <StaffList 
          staff={staff} 
          onEdit={handleEditStaff} 
          onDelete={handleDeleteStaff} 
          setIndex={setIndex} 
        />
      )}

      {/* Display the edit form if index is 1 and there is an editing staff member */}
      {Index === 1 && editingStaff && (
        <>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Position</th>
                <th>Department</th>
                <th>Date of Hire</th>
                <th>Salary (XAF)</th>
              </tr>
            </thead>
            <tbody>
              {staff.map((member, i) => (
                <tr key={i}>
                  <td>{member.name}</td>
                  <td>{member.position}</td>
                  <td>{member.department}</td>
                  <td>{member.dateOfHire}</td>
                  <td>{member.salary} XAF</td>
                </tr>
              ))}
            </tbody>
          </table>
          <StaffForm initialData={editingStaff} onSave={handleSaveStaff} />
        </>
      )}

      {/* Display the new staff form */}
      {Index === 2 && <StaffForm onSave={handleSaveStaff} />}
    </div>
  );
};

export default Staff;
