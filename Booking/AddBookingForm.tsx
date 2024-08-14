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

interface AddBookingFormProps {
  onAddBooking: (newBooking: BookingDetails) => void;
}

const AddBookingForm: React.FC<AddBookingFormProps> = ({ onAddBooking }) => {
  const [newBooking, setNewBooking] = useState<BookingDetails>({
    id: Date.now(),
    name: '',
    email: '',
    checkInDate: '',
    checkOutDate: '',
    roomType: 'single',
    guests: [{ name: '', age: 0 }, { name: '', age: 0 }],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewBooking({ ...newBooking, [name]: value });
  };

  const handleGuestChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const guests = newBooking.guests.map((guest, i) =>
      i === index ? { ...guest, [name]: value } : guest
    );
    setNewBooking({ ...newBooking, guests });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddBooking(newBooking);
    // Reset the form
    setNewBooking({
      id: Date.now(),
      name: '',
      email: '',
      checkInDate: '',
      checkOutDate: '',
      roomType: 'single',
      guests: [{ name: '', age: 0 }, { name: '', age: 0 }],
    });
  };

  const formStyle: React.CSSProperties = {
    backgroundColor: 'white',
    color: 'green',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '1500px',
    margin: '4px',
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
      <h2>New Booking</h2>
      <div>
        <label style={labelStyle}>Name:</label>
        <input
          type="text"
          name="name"
          value={newBooking.name}
          onChange={handleChange}
          required
          style={inputStyle}
        />
      </div>
      <div>
        <label style={labelStyle}>Email:</label>
        <input
          type="email"
          name="email"
          value={newBooking.email}
          onChange={handleChange}
          required
          style={inputStyle}
        />
      </div>
      <div>
        <label style={labelStyle}>Check-in Date:</label>
        <input
          type="date"
          name="checkInDate"
          value={newBooking.checkInDate}
          onChange={handleChange}
          required
          style={inputStyle}
        />
      </div>
      <div>
        <label style={labelStyle}>Check-out Date:</label>
        <input
          type="date"
          name="checkOutDate"
          value={newBooking.checkOutDate}
          onChange={handleChange}
          required
          style={inputStyle}
        />
      </div>
      <div>
        <label style={labelStyle}>Room Type:</label>
        <select
          name="roomType"
          value={newBooking.roomType}
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="single">Single</option>
          <option value="double">Double</option>
          <option value="suite">Suite</option>
        </select>
      </div>
      <div style={guestContainerStyle}>
        <label style={labelStyle}>Guests:</label>
        {newBooking.guests.map((guest, index) => (
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
      <button type="submit" style={buttonStyle}>Add Booking</button>
    </form>
  );
};

export default AddBookingForm;
