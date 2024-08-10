import React from 'react';
import styles from './Staff.module.css';

interface StaffListProps {
  staff: Staff[];
  onEdit: (staff: Staff) => void;
}

interface Staff {
  name: string;
  position: string;
}

const StaffList: React.FC<StaffListProps> = ({ staff, onEdit }) => {
  return (
    <div className={styles.staffList}>
      {staff.map((member, index) => (
        <div key={index} className={styles.staffCard}>
          <div>
            <div className={styles.staffName}>{member.name}</div>
            <div className={styles.staffPosition}>{member.position}</div>
          </div>
          <button onClick={() => onEdit(member)} className={styles.editButton}>
            Edit
          </button>
        </div>
      ))}
    </div>
  );
};

export default StaffList;
