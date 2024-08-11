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

const StaffList = ({ staff, onEdit,setIndex }:Readonly<{staff:Staff[];onEdit:any;setIndex:any}>) => {
  return (
    <div className={`${styles.staffList} overflow-y-auto !h-[290px] mb-1`}>
      {staff.map((member, index) => (
        <div key={index} className={styles.staffCard}>
          <div>
            <div className={styles.staffName}>{member.name}</div>
            <div className={styles.staffPosition}>{member.position}</div>
          </div>
          <button onClick={() => {onEdit(member);setIndex(1)}} className={styles.editButton}>
            Edit
          </button>
        </div>
      ))}
    </div>
  );
};

export default StaffList;
