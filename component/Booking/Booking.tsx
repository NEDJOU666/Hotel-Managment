import React, { useState } from 'react';
import AllBookings from './AllBookings';
import EditBookingForm from './EditBookingForm';
import AddBookingForm from './AddBookingForm';

// Define interfaces for guest and booking details
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
  roomComfort: string;
  roomId: string;  // Ensure this matches with AllBookings
  amountPaid: number;  // Ensure this matches with AllBookings
  totalAmount: number;
  guests: Guest[];
  currency: string;  // Ensure this matches with AllBookings
}

interface BookingProps {
  index: number;
}

const Booking: React.FC<BookingProps> = ({ index }) => {
  const [bookings, setBookings] = useState<BookingDetails[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<BookingDetails | null>(null);

  // Function to handle adding a new booking
  const handleAddBooking = (newBooking: BookingDetails) => {
    setBookings([...bookings, newBooking]);
  };

  // Function to handle updating an existing booking
  const handleUpdateBooking = (updatedBooking: BookingDetails) => {
    setBookings(bookings.map((booking) => (booking.id === updatedBooking.id ? updatedBooking : booking)));
    setSelectedBooking(null); // Clear the selection after updating
  };

  // Function to handle deleting a booking
  const handleDeleteBooking = (bookingId: number) => {
    setBookings(bookings.filter((booking) => booking.id !== bookingId));
  };

  // Function to handle selecting a booking for editing
  const handleEditClick = (booking: BookingDetails) => {
    setSelectedBooking(booking);
  };

  // Styling for the header
  const headerStyle: React.CSSProperties = {
    fontSize: '36px',
    color: 'green',
    textAlign: 'center',
    marginBottom: '20px',
  };

  return (
    <div>
      <h1 style={headerStyle}>Booking Management</h1>
      {index === 2 && <AddBookingForm onAddBooking={handleAddBooking} />}
      {index === 1 && selectedBooking && (
        <EditBookingForm booking={selectedBooking} onUpdate={handleUpdateBooking} />
      )}
      {index === 0 && (
        <AllBookings
          bookings={bookings}
          onEditClick={handleEditClick}  // Pass the handler for edit
          onDeleteClick={handleDeleteBooking}
        />
      )}
    </div>
  );
};

export default Booking;
