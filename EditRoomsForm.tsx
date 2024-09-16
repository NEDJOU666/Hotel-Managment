import React, { useState, useEffect } from 'react';

interface RoomDetails {
  id: number;
  roomNumber: string;
  roomType: string;
  status: string;
}

interface EditRoomsFormProps {
  room: RoomDetails;
  onEditRoom: (room: RoomDetails) => void;
}

const EditRoomsForm: React.FC<EditRoomsFormProps> = ({ room, onEditRoom }) => {
  const [roomNumber, setRoomNumber] = useState(room.roomNumber);
  const [roomType, setRoomType] = useState(room.roomType);
  const [status, setStatus] = useState(room.status);

  useEffect(() => {
    setRoomNumber(room.roomNumber);
    setRoomType(room.roomType);
    setStatus(room.status);
  }, [room]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onEditRoom({ ...room, roomNumber, roomType, status });
  };

  const containerStyle: React.CSSProperties = {
    backgroundColor: '#fdfdfd',
    padding: '40px',
    borderRadius: '16px',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
    maxWidth: '1500px',
    margin: '50px auto',
    fontFamily: 'Arial, sans-serif',
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '14px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    marginBottom: '20px',
    fontSize: '16px',
    boxSizing: 'border-box',
    transition: 'border-color 0.3s, box-shadow 0.3s',
  };

  const selectStyle: React.CSSProperties = {
    ...inputStyle,
  };

  const buttonStyle: React.CSSProperties = {
    backgroundColor: '#2ecc71',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    padding: '12px 20px',
    cursor: 'pointer',
    transition: 'background-color 0.3s, transform 0.3s',
    fontSize: '16px',
    width: '100%',
    textTransform: 'uppercase',
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#333', fontSize: '26px', fontWeight: 'bold' }}>Edit Room</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label style={{ marginBottom: '8px', display: 'block', color: '#555', fontSize: '16px' }}>Room Number:</label>
          <input
            type="text"
            value={roomNumber}
            onChange={(e) => setRoomNumber(e.target.value)}
            style={inputStyle}
            placeholder="Enter Room Number"
            required
          />
        </div>
        <div>
          <label style={{ marginBottom: '8px', display: 'block', color: '#555', fontSize: '16px' }}>Room Type:</label>
          <input
            type="text"
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
            style={inputStyle}
            placeholder="Enter Room Type"
            required
          />
        </div>
        <div>
          <label style={{ marginBottom: '8px', display: 'block', color: '#555', fontSize: '16px' }}>Status:</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            style={selectStyle}
          >
            <option value="Available">Available</option>
            <option value="Occupied">Occupied</option>
            <option value="Maintenance">Maintenance</option>
          </select>
        </div>
        <button type="submit" style={buttonStyle}>
          Update Room
        </button>
      </form>
    </div>
  );
};

export default EditRoomsForm;
