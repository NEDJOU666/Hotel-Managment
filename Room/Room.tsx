import React, { useState } from 'react';
import AllRoomsForm from './AllRooms';
import AddRoomsForm from './AddRoomsForm';
import EditRoomsForm from './EditRoomsForm';

interface RoomDetails {
  id: number;
  roomNumber: string;
  roomType: string;
  status: string;
}

const Room: React.FC = ({index}:any) => {
  const [rooms, setRooms] = useState<RoomDetails[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<RoomDetails | null>(null);
  const [viewMode, setViewMode] = useState<'all' | 'add' | 'edit'>('all');

  const handleAddRoom = (room: Omit<RoomDetails, 'id'>) => {
    setRooms(prevRooms => [
      ...prevRooms,
      { id: Date.now(), ...room },
    ]);
    setViewMode('all');
  };

  const handleEditRoom = (updatedRoom: RoomDetails) => {
    setRooms(prevRooms =>
      prevRooms.map(room =>
        room.id === updatedRoom.id ? updatedRoom : room
      )
    );
    setViewMode('all');
  };

  const handleDeleteRoom = (roomId: number) => {
    setRooms(prevRooms => prevRooms.filter(room => room.id !== roomId));
  };

  const handleEditClick = (room: RoomDetails) => {
    setSelectedRoom(room);
    setViewMode('edit');
  };

  const handleAddClick = () => {
    setViewMode('add');
  };

  const handleBackClick = () => {
    setViewMode('all');
    setSelectedRoom(null);
  };

  const containerStyle: React.CSSProperties = {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '40px 20px',
    fontFamily: 'Arial, sans-serif',
  };

  const buttonStyle: React.CSSProperties = {
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    padding: '12px 20px',
    cursor: 'pointer',
    transition: 'background-color 0.3s, transform 0.3s',
    fontSize: '16px',
    textTransform: 'uppercase',
    margin: '20px 0',
  };

  const backButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: '#95a5a6',
  };

  return (
    <div style={containerStyle}>
      {viewMode === 'all' && (
        <>
          <button onClick={handleAddClick} style={buttonStyle}>Add New Room</button>
          <AllRoomsForm
            rooms={rooms}
            onEditClick={handleEditClick}
            onDeleteClick={handleDeleteRoom}
          />
        </>
      )}
      {viewMode === 'add' && (
        <>
          <AddRoomsForm onAddRoom={handleAddRoom} />
          <button onClick={handleBackClick} style={backButtonStyle}>Back to List</button>
        </>
      )}
      {viewMode === 'edit' && selectedRoom && (
        <>
          <EditRoomsForm
            room={selectedRoom}
            onEditRoom={handleEditRoom}
          />
          <button onClick={handleBackClick} style={backButtonStyle}>Back to List</button>
        </>
      )}
    </div>
  );
};

export default Room;
