"use client"
import React, { useState } from 'react';
import { RoomDetails } from '../interface/roomDetails';
import { useRouter } from 'next/navigation';

interface AllRoomsFormProps {
  rooms: RoomDetails[];
  onDeleteClick: (roomId: string) => void;
}



const AllRoomsForm: React.FC<AllRoomsFormProps> = ({ rooms, onDeleteClick }) => {
  const router = useRouter()
  const [selectedRoom, setSelectedRoom] = useState<RoomDetails | null>(null);

  const handleViewDetailsClick = (room: RoomDetails) => {
    setSelectedRoom(room);
  };

  const containerStyle: React.CSSProperties = {
    backgroundColor: '#ffffff',
    padding: '30px',
    borderRadius: '16px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    maxWidth: '1500px',
    margin: '40px auto',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
  };

  const listItemStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 0',
    borderBottom: '1px solid #ddd',
    backgroundColor: '#fff',
    transition: 'background-color 0.3s',
    cursor: 'pointer',
  };

  const buttonContainerStyle: React.CSSProperties = {
    display: 'flex',
    gap: '15px',
  };

  const buttonStyle: React.CSSProperties = {
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    padding: '10px 20px',
    cursor: 'pointer',
    transition: 'background-color 0.3s, transform 0.3s',
  };

  const detailsStyle: React.CSSProperties = {
    marginTop: '30px',
    padding: '25px',
    backgroundColor: '#fdfdfd',
    borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  };

  const detailItemStyle: React.CSSProperties = {
    marginBottom: '15px',
    fontSize: '16px',
    lineHeight: '1.5',
    color: '#333',
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ textAlign: 'center', color: '#444', marginBottom: '30px', fontSize: '24px', fontWeight: '600' }}>All Rooms</h2>
      <ul>
        {rooms.map(room => (
          <li
            key={room.id}
            style={listItemStyle}
          >
            <div>
              <strong style={{ fontSize: '18px', color: '#555' }}>Room {room.id}</strong> - {room.type} - {room.status}
            </div>
            <div style={buttonContainerStyle}>
              <button
                onClick={() => handleViewDetailsClick(room)}
                style={buttonStyle}
              >
                View Details
              </button>
              <button
                onClick={() => router.push(`/rooms/editrooms/${room._id}`)}
                style={{ ...buttonStyle, backgroundColor: '#2ecc71' }}
              >
                Edit
              </button>
              <button
                onClick={() => onDeleteClick(room._id ? room._id : "")}
                style={{ ...buttonStyle, backgroundColor: '#e74c3c' }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {selectedRoom && (
        <div style={detailsStyle}>
          <h3 style={{ marginBottom: '20px', fontSize: '20px', color: '#444' }}>Room Details</h3>
          <p style={detailItemStyle}><strong>Room Number:</strong> {selectedRoom.id}</p>
          <p style={detailItemStyle}><strong>Room Type:</strong> {selectedRoom.type}</p>
          <p style={detailItemStyle}><strong>Room Type:</strong> {selectedRoom.confort}</p>
          <p style={detailItemStyle}><strong>Room Type:</strong> {selectedRoom.pricePerNight} Xaf</p>
          <p style={detailItemStyle}><strong>Status:</strong> {selectedRoom.status}</p>
        </div>
      )}
    </div>
  );
};

export default AllRoomsForm;
