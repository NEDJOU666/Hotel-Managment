"use client"
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { BookingDetails } from '../interface/bookingDetails';

interface EditBookingFormProps {
  booking: BookingDetails;
  onUpdate: (updatedBooking: BookingDetails) => void;
}

const EditBookingForm: React.FC<EditBookingFormProps> = ({ booking, onUpdate }) => {
  const [updatedBooking, setUpdatedBooking] = useState<BookingDetails>(booking);
  const [message, setMessage] = useState<string | null>(null); // For confirmation messages

  // Handle changes for booking details
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUpdatedBooking({ ...updatedBooking, [name]: value });
  };

  // Handle changes for each guest
  const handleGuestChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const guests = updatedBooking.guests.map((guest, i) =>
      i === index ? { ...guest, [name]: value } : guest
    );
    setUpdatedBooking({ ...updatedBooking, guests });
  };

  // Add a new guest
  const handleAddGuest = () => {
    if(updatedBooking.guests){
      setUpdatedBooking({
        ...updatedBooking,
        guests: [...updatedBooking.guests, { name: '', age: 0 }],
      });
    }
    else{
      setUpdatedBooking({
        ...updatedBooking,
        guests: [{ name: '', age: 0 }],
      });
    }
  };

  // Remove a guest
  const handleRemoveGuest = (index: number) => {
    const guests = updatedBooking.guests.filter((_, i) => i !== index);
    setUpdatedBooking({ ...updatedBooking, guests });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(updatedBooking);
    setMessage('Booking updated successfully!');
  };

  // Styling for the form
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

  const RemoveGuestbuttonStyle: React.CSSProperties = {
    backgroundColor: 'red',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 15px',
    cursor: 'pointer',
    display: 'block',
    width: '100%',
    marginTop: '20px',
  };

  const AddGuestbuttonStyle: React.CSSProperties = {
    backgroundColor: 'blue',
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
      {message && <p style={{ color: 'green' }}>{message}</p>}
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
      <div>
        <label style={labelStyle}>Room Comfort:</label>
        <select name="roomComfort" value={updatedBooking.roomConfort} onChange={handleChange} style={inputStyle}>
        <option value="standard">Standard</option>
          <option value="Low-Cash">Low-Cash</option>
          <option value="luxury">Luxury</option>
          <option value="VIP">VIP</option>
        </select>
      </div>
      <div>
        <label style={labelStyle}>Room ID:</label>
        <input type="text" name="roomId" value={updatedBooking.choosenRoom} onChange={handleChange} required style={inputStyle} />
      </div>
      <div>
        <label style={labelStyle}>Amount Paid:</label>
        <input type="number" name="amountPaid" value={updatedBooking.priceAnight} onChange={handleChange} required style={inputStyle} />
      </div>
      <div>
        <label style={labelStyle}>Total Amount:</label>
        <input type="number" name="totalAmount" value={updatedBooking.totalAmountPaid} onChange={handleChange} required style={inputStyle} />
      </div>
      <div>
        <label style={labelStyle}>Currency:</label>
        <select name="currency" value={updatedBooking.currency} onChange={handleChange} style={inputStyle}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          <option value="JPY">JPY</option>
        </select>
      </div>
      <div style={guestContainerStyle}>
        <label style={labelStyle}>Guests:</label>
        {updatedBooking.guests && updatedBooking.guests.map((guest, index) => (
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
            <button type="button" onClick={() => handleRemoveGuest(index)} style={{ ...RemoveGuestbuttonStyle, marginTop: '10px' }}>
              Remove Guest
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddGuest} style={AddGuestbuttonStyle}>
          Add Guest
        </button>
      </div>
      <button type="submit" style={buttonStyle}>Update Booking</button>
    </form>
  );
};

export default EditBookingForm;
