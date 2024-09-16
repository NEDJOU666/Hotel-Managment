import React, { useState } from 'react';

interface RoomDetails {
  id: number;
  roomNumber: string;
  roomType: string;
  status: string;

}

interface AllRoomsFormProps {
  rooms: RoomDetails[];
  onEditClick: (room: RoomDetails) => void;
  onDeleteClick: (roomId: number) => void;
}

const AllRoomsForm: React.FC<AllRoomsFormProps> = ({ rooms, onEditClick, onDeleteClick }) => {
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
              <strong style={{ fontSize: '18px', color: '#555' }}>Room {room.roomNumber}</strong> - {room.roomType} - {room.status}
            </div>
            <div style={buttonContainerStyle}>
              <button
                onClick={() => handleViewDetailsClick(room)}
                style={buttonStyle}
              >
                View Details
              </button>
              <button
                onClick={() => onEditClick(room)}
                style={{ ...buttonStyle, backgroundColor: '#2ecc71' }}
              >
                Edit
              </button>
              <button
                onClick={() => onDeleteClick(room.id)}
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
          <p style={detailItemStyle}><strong>Room Number:</strong> {selectedRoom.roomNumber}</p>
          <p style={detailItemStyle}><strong>Room Type:</strong> {selectedRoom.roomType}</p>
          <p style={detailItemStyle}><strong>Status:</strong> {selectedRoom.status}</p>
        </div>
      )}
    </div>
  );
};

export default AllRoomsForm;
