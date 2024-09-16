import React from 'react';
import styles from './Staff.module.css';

interface Staff {
  name: string;
  position: string;
  department: string;
  dateOfHire: string;
  salary: number;
}

interface StaffListProps {
  staff: Staff[];
  onEdit: (staff: Staff) => void;
  onDelete: (staff: Staff) => void;  // Add delete handler
  setIndex: (index: number) => void;
}

const StaffList: React.FC<StaffListProps> = ({ staff, onEdit, onDelete, setIndex }) => {
  return (
    <div className={styles.staffList}>
      {staff.map((member, index) => (
        <div key={index} className={styles.staffCard}>
          <div>
            <p className={styles.staffName}>{member.name}</p>
            <p className={styles.staffPosition}>{member.position}</p>
            <p className={styles.staffDepartment}>{member.department}</p>
            <p className={styles.staffDetails}>Hired on: {member.dateOfHire}</p>
            <p className={styles.staffDetails}>Salary: {member.salary} XAF</p>
          </div>
          <div>
            <button 
              className={styles.editButton} 
              onClick={() => onEdit(member)}>
              Edit
            </button>
            <button 
              className={styles.deleteButton} 
              onClick={() => onDelete(member)}> {/* Delete button */}
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StaffList;
