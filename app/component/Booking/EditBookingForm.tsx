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

interface EditBookingFormProps {
  booking: BookingDetails;
  onUpdate: (updatedBooking: BookingDetails) => void;
}

const EditBookingForm: React.FC<EditBookingFormProps> = ({ booking, onUpdate }) => {
  const [updatedBooking, setUpdatedBooking] = useState<BookingDetails>(booking);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUpdatedBooking({ ...updatedBooking, [name]: value });
  };

  const handleGuestChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const guests = updatedBooking.guests.map((guest, i) =>
      i === index ? { ...guest, [name]: value } : guest
    );
    setUpdatedBooking({ ...updatedBooking, guests });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(updatedBooking);
  };

  const formStyle: React.CSSProperties = {
    backgroundColor: 'white',
    color: 'green',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '1500px',
    margin: '0 auto',
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '5px',
    border: '1px solid green',
    boxSizing: 'border-box',
  };

  const labelStyle: React.CSSProperties = {
    marginBottom: '5px',
    display: 'block',
  };

  const buttonStyle: React.CSSProperties = {
    backgroundColor: 'green',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 15px',
    cursor: 'pointer',
    display: 'block',
    width: '100%',
    marginTop: '20px',
  };

  const guestContainerStyle: React.CSSProperties = {
    marginBottom: '20px',
  };

  const guestInputStyle: React.CSSProperties = {
    marginBottom: '10px',
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h2>Edit Booking</h2>
      <div>
        <label style={labelStyle}>Name:</label>
        <input type="text" name="name" value={updatedBooking.name} onChange={handleChange} required style={inputStyle} />
      </div>
      <div>
        <label style={labelStyle}>Email:</label>
        <input type="email" name="email" value={updatedBooking.email} onChange={handleChange} required style={inputStyle} />
      </div>
      <div>
        <label style={labelStyle}>Check-in Date:</label>
        <input type="date" name="checkInDate" value={updatedBooking.checkInDate} onChange={handleChange} required style={inputStyle} />
      </div>
      <div>
        <label style={labelStyle}>Check-out Date:</label>
        <input type="date" name="checkOutDate" value={updatedBooking.checkOutDate} onChange={handleChange} required style={inputStyle} />
      </div>
      <div>
        <label style={labelStyle}>Room Type:</label>
        <select name="roomType" value={updatedBooking.roomType} onChange={handleChange} style={inputStyle}>
          <option value="single">Single</option>
          <option value="double">Double</option>
          <option value="suite">Suite</option>
        </select>
      </div>
      <div style={guestContainerStyle}>
        <label style={labelStyle}>Guests:</label>
        {updatedBooking.guests.map((guest, index) => (
          <div key={index} style={guestInputStyle}>
            <input
              type="text"
              name="name"
              placeholder={`Guest ${index + 1} Name`}
              value={guest.name}
              onChange={e => handleGuestChange(index, e)}
              required
              style={inputStyle}
            />
            <input
              type="number"
              name="age"
              placeholder={`Guest ${index + 1} Age`}
              value={guest.age}
              onChange={e => handleGuestChange(index, e)}
              required
              style={inputStyle}
            />
          </div>
        ))}
      </div>
      <button type="submit" style={buttonStyle}>Update Booking</button>
    </form>
  );
};

export default EditBookingForm;
