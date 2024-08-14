import React, { useState } from 'react';
import AllBookings from './AllBookings';
import EditBookingForm from './EditBookingForm';
import AddBookingForm from './AddBookingForm';

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

interface BookingProps {
  index: number;
}

const Booking: React.FC<BookingProps> = ({ index }) => {
  const [bookings, setBookings] = useState<BookingDetails[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<BookingDetails | null>(null);

  const handleAddBooking = (newBooking: BookingDetails) => {
    setBookings([...bookings, newBooking]);
  };

  const handleUpdateBooking = (updatedBooking: BookingDetails) => {
    setBookings(bookings.map(booking => (booking.id === updatedBooking.id ? updatedBooking : booking)));
    setSelectedBooking(null);
  };

  const handleDeleteBooking = (bookingId: number) => {
    setBookings(bookings.filter(booking => booking.id !== bookingId));
  };

  const handleEditClick = (booking: BookingDetails) => {
    setSelectedBooking(booking);
  };

  const headerStyle: React.CSSProperties = {
    fontSize: '36px',
    color: 'green',
    textAlign: 'center',
    marginBottom: '20px',
  };

  return (
    <div>
      <h1 style={headerStyle}>Booking Management</h1>
      {index === 0 && <AddBookingForm onAddBooking={handleAddBooking} />}
      {index === 1 && selectedBooking && (
        <EditBookingForm booking={selectedBooking} onUpdate={handleUpdateBooking} />
      )}
      {index === 2 && (
        <AllBookings
          bookings={bookings}
          onEditClick={handleEditClick}
          onDeleteClick={handleDeleteBooking}
        />
      )}
    </div>
  );
};

export default Booking;
