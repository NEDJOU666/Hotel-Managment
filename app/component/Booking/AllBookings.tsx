"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { BookingDetails } from '../interface/bookingDetails';

interface AllBookingsProps {
  bookings: BookingDetails[];
  onDeleteClick: (bookingId: string) => void;
}

const AllBookings: React.FC<AllBookingsProps> = ({ bookings, onDeleteClick }) => {
  console.log(bookings)
  const [deleted,setDeleteds] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState<BookingDetails | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>(''); // State to track the search term

  const handleViewDetailsClick = (booking: BookingDetails) => {
    if (selectedBooking && selectedBooking.id === booking.id) {
      setSelectedBooking(null);
    } else {
      setSelectedBooking(booking);
    }
  };

  const handleDeleteClick = (bookingId: string) => {
    if (selectedBooking && selectedBooking.id === bookingId) {
      setSelectedBooking(null);
    }
    // onDeleteClick(bookingId);
  };

  const router = useRouter()
  const handleEdit = (id:string) =>{
       router.replace(`/booking/edit booking/${id}`)
  }

  const totalAmountPaid = bookings?.reduce((total, booking) => total + booking.totalAmountPaid*650, 0);

  // Filter bookings based on the search term
  const filteredBookings = bookings.filter(
    (booking) =>
      booking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.id.toString().includes(searchTerm)
  );

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
      
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '20px', padding: '10px', width: '100%', borderRadius: '5px', border: '1px solid #ddd' }}
      />
      
      <ul>
        {filteredBookings.map((booking) => (
          <li key={booking.id} style={listItemStyle}>
            <div>
              {booking.name} - {booking.roomType}
            </div>
            <div style={buttonContainerStyle}>
              <button onClick={() => handleViewDetailsClick(booking)} style={buttonStyle}>
                View Details
              </button>
              <button onClick={() => handleEdit(booking._id)} style={editButtonStyle}>
                Edit
              </button>
              <button onClick={() => {
                setDeleteds(true)
                onDeleteClick(booking._id)
                setDeleteds(false)
                }} style={deleteButtonStyle}>
                {deleted ? 'Deleting...' : 'Cancel'}
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
          <p><strong>Room Comfort:</strong> {selectedBooking.roomConfort}</p>
          <p><strong>Amount Paid:</strong> {(selectedBooking.totalAmountPaid*650).toLocaleString('en-US', { style: 'currency', currency: 'XAF' })}</p>
          <p><strong>Guests:</strong></p>
          <ul>
            {selectedBooking.guests && selectedBooking.guests.map((guest, index) => (
              <li key={index}>{guest.name} ({guest.age} years old)</li>
            ))}
          </ul>
        </div>
      )}

      <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#e9ecef', borderRadius: '10px' }}>
        <h3>Total Amount Paid: {totalAmountPaid.toLocaleString('en-US', { style: 'currency', currency: 'XAF' })}</h3>
      </div>
    </div>
  );
};

export default AllBookings;
