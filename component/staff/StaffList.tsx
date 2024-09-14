"use client"
import React from 'react';
import styles from './Staff.module.css';
import { StaffDetails } from '../interface/staffDetails';
import { useRouter } from 'next/navigation';
interface StaffListProps {
  staff: StaffDetails[];
}


const StaffList = ({ staff }: Readonly<StaffListProps>) => {
  const router = useRouter()
  return (
    <div className={`${styles.staffList} overflow-y-auto h-full mb-1`}>
      {staff.map((member, index) => (
        <div key={index} className={styles.staffCard}>
          <div>
            <div className={styles.staffName}>{member.name}</div>
            <div className={styles.staffPosition}>{member.position}</div>
          </div>
          <button
            onClick={() => {
              router.push(`/staff/editstaff/${member._id}`)
            }}
            className={styles.editButton}
          >
            Edit
          </button>
        </div>
      ))}
    </div>
  );
};

export default StaffList;
