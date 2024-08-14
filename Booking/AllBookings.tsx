import React, { useState } from 'react';

interface Guest {
  name: string;
  age: number;
}

interface BookingDetails {
  id: number;
  name: string;
  email: string;
  checkInDate: string;
  checkOutDate: string;
  roomType: string;
  guests: Guest[];
}

interface AllBookingsProps {
  bookings: BookingDetails[];
  onEditClick: (booking: BookingDetails) => void;
  onDeleteClick: (bookingId: number) => void;
}

const AllBookings: React.FC<AllBookingsProps> = ({ bookings, onEditClick, onDeleteClick }) => {
  const [selectedBooking, setSelectedBooking] = useState<BookingDetails | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleViewDetailsClick = (booking: BookingDetails) => {
    if (selectedBooking && selectedBooking.id === booking.id) {
      // If the same booking is clicked again, hide the details
      setSelectedBooking(null);
    } else {
      setSelectedBooking(booking);
      setIsEditing(false); // Ensure we exit edit mode when viewing details
    }
  };

  const handleEditClick = (booking: BookingDetails) => {
    setSelectedBooking(booking);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setSelectedBooking(null);
  };

  const handleUpdateBooking = (updatedBooking: BookingDetails) => {
    onEditClick(updatedBooking); // Trigger the parent update handler
    handleCancelEdit(); // Return to list view
  };

  const handleDeleteClick = (bookingId: number) => {
    if (selectedBooking && selectedBooking.id === bookingId) {
      setSelectedBooking(null); // Clear the selected booking if it's deleted
    }
    onDeleteClick(bookingId);
  };

  const containerStyle: React.CSSProperties = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '1500px',
    margin: '0 auto',
  };

  const listItemStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 0',
    borderBottom: '1px solid #ddd',
  };

  const buttonContainerStyle: React.CSSProperties = {
    display: 'flex',
    gap: '10px',
  };

  const buttonStyle: React.CSSProperties = {
    backgroundColor: 'blue',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '5px 10px',
    cursor: 'pointer',
  };

  const editButtonStyle: React.CSSProperties = {
    backgroundColor: 'green',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '5px 10px',
    cursor: 'pointer',
  };

  const deleteButtonStyle: React.CSSProperties = {
    backgroundColor: 'red',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '5px 10px',
    cursor: 'pointer',
  };

  return (
    <div style={containerStyle}>
      <h2>All Bookings</h2>
      <ul>
        {bookings.map(booking => (
          <li key={booking.id} style={listItemStyle}>
            <div>
              {booking.name} - {booking.roomType}
            </div>
            <div style={buttonContainerStyle}>
              <button onClick={() => handleViewDetailsClick(booking)} style={buttonStyle}>
                View Details
              </button>
              <button onClick={() => onEditClick(booking)} style={editButtonStyle}>
                Edit
              </button>
              <button onClick={() => onDeleteClick(booking.id)} style={deleteButtonStyle}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {selectedBooking && (
        <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '10px' }}>
          <h3>Booking Details</h3>
          <p><strong>Name:</strong> {selectedBooking.name}</p>
          <p><strong>Email:</strong> {selectedBooking.email}</p>
          <p><strong>Check-in Date:</strong> {selectedBooking.checkInDate}</p>
          <p><strong>Check-out Date:</strong> {selectedBooking.checkOutDate}</p>
          <p><strong>Room Type:</strong> {selectedBooking.roomType}</p>
          <p><strong>Guests:</strong></p>
          <ul>
            {selectedBooking.guests.map((guest, index) => (
              <li key={index}>{guest.name} ({guest.age} years old)</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AllBookings;
