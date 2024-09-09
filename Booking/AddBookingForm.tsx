import React, { useState, useEffect } from 'react';

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
  roomId: string;
  amountPaid: number;
  totalAmount: number;
  guests: Guest[];
  currency: string;
}

interface Room {
  id: string;
  type: string;
  comfort: string;
  price: number; // Price per day in XAF
  available: boolean;
}

interface AddBookingFormProps {
  onAddBooking: (newBooking: BookingDetails) => void;
}

// Mock data: list of available rooms with prices in XAF
const availableRooms: Room[] = [
  { id: 'RM1001', type: 'single', comfort: 'standard', price: 60000, available: true },
  { id: 'RM1002', type: 'single', comfort: 'Low-Cash', price: 90000, available: true },
  { id: 'RM2001', type: 'double', comfort: 'standard', price: 120000, available: false },
  { id: 'RM2002', type: 'double', comfort: 'luxury', price: 150000, available: true },
  { id: 'RM3001', type: 'suite', comfort: 'luxury', price: 550000, available: true },
  { id: 'RM3002', type: 'suite', comfort: 'VIP', price: 250000, available: true },
  { id: 'RM3003', type: 'single', comfort: 'luxury', price: 250000, available: true },
];

// Currency conversion rates (example values)
const currencyRates: { [key: string]: number } = {
  XAF: 1, // base currency
  USD: 0.0017,
  EUR: 0.0015,
  GBP: 0.0013,
};

const AddBookingForm: React.FC<AddBookingFormProps> = ({ onAddBooking }) => {
  const [newBooking, setNewBooking] = useState<BookingDetails>({
    id: Date.now(),
    name: '',
    email: '',
    checkInDate: '',
    checkOutDate: '',
    roomType: 'single',
    roomComfort: 'standard',
    roomId: '',
    amountPaid: 0,
    totalAmount: 0,
    guests: [{ name: '', age: 0 }, { name: '', age: 0 }],
    currency: 'XAF',
  });

  const [convertedAmount, setConvertedAmount] = useState<number>(0);

  // Calculate number of days between check-in and check-out
  const calculateDays = (checkIn: string, checkOut: string): number => {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const timeDifference = checkOutDate.getTime() - checkInDate.getTime();
    return timeDifference > 0 ? Math.ceil(timeDifference / (1000 * 3600 * 24)) : 0;
  };

  // Calculate total amount based on number of days and amount paid per day
  const updateTotalAmount = () => {
    const days = calculateDays(newBooking.checkInDate, newBooking.checkOutDate);
    const totalAmount = days * newBooking.amountPaid;
    setNewBooking({ ...newBooking, totalAmount });
  };

  // Update total amount and conversion whenever check-in, check-out, or room changes
  useEffect(() => {
    updateTotalAmount();
    convertCurrency(newBooking.currency);
  }, [newBooking.checkInDate, newBooking.checkOutDate, newBooking.amountPaid, newBooking.currency]);

  // Filter rooms based on the selected type and comfort
  const filteredRooms = availableRooms.filter(
    (room) =>
      room.type === newBooking.roomType &&
      room.comfort === newBooking.roomComfort &&
      room.available
  );

  const handleRoomChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRoom = availableRooms.find((room) => room.id === e.target.value);
    if (selectedRoom) {
      setNewBooking({
        ...newBooking,
        roomId: selectedRoom.id,
        amountPaid: selectedRoom.price,
      });
    } else {
      setNewBooking({ ...newBooking, roomId: '', amountPaid: 0 });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewBooking({ ...newBooking, [name]: value });
  };

  const handleCurrencyTabClick = (currency: string) => {
    setNewBooking({ ...newBooking, currency });
  };

  const handleGuestChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const guests = newBooking.guests.map((guest, i) =>
      i === index ? { ...guest, [name]: value } : guest
    );
    setNewBooking({ ...newBooking, guests });
  };

  const convertCurrency = (currency: string) => {
    const rate = currencyRates[currency];
    if (rate) {
      const convertedTotal = newBooking.totalAmount * rate;
      setConvertedAmount(convertedTotal);
    }
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
      roomComfort: 'standard',
      roomId: '',
      amountPaid: 0,
      totalAmount: 0,
      guests: [{ name: '', age: 0 }, { name: '', age: 0 }],
      currency: 'XAF',
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

  const tabStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  };

  const tabItemStyle: React.CSSProperties = {
    padding: '10px 20px',
    cursor: 'pointer',
    borderBottom: '2px solid transparent',
  };

  const activeTabStyle: React.CSSProperties = {
    ...tabItemStyle,
    borderBottom: '2px solid green',
    fontWeight: 'bold',
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h2>New Booking</h2>

      {/* Currency Tabs */}
      <div style={tabStyle}>
        {Object.keys(currencyRates).map((currency) => (
          <div
            key={currency}
            style={newBooking.currency === currency ? activeTabStyle : tabItemStyle}
            onClick={() => handleCurrencyTabClick(currency)}
          >
            {currency}
          </div>
        ))}
      </div>

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
          required
          style={inputStyle}
        >
          <option value="single">Single</option>
          <option value="double">Double</option>
          <option value="suite">Suite</option>
        </select>
      </div>
      <div>
        <label style={labelStyle}>Room Comfort:</label>
        <select
          name="roomComfort"
          value={newBooking.roomComfort}
          onChange={handleChange}
          required
          style={inputStyle}
        >
          <option value="standard">Standard</option>
          <option value="Low-Cash">Low-Cash</option>
          <option value="luxury">Luxury</option>
          <option value="VIP">VIP</option>
        </select>
      </div>
      <div>
        <label style={labelStyle}>Room ID:</label>
        <select
          name="roomId"
          value={newBooking.roomId}
          onChange={handleRoomChange}
          required
          style={inputStyle}
        >
          <option value="">Select Room ID</option>
          {filteredRooms.map((room) => (
            <option key={room.id} value={room.id}>
              {room.id} - {room.price.toLocaleString()} XAF
            </option>
          ))}
        </select>
      </div>
      <div>
        <label style={labelStyle}>Amount Paid (Per Day in XAF):</label>
        <input
          type="number"
          name="amountPaid"
          value={newBooking.amountPaid}
          readOnly
          style={inputStyle}
        />
      </div>
      <div>
        <label style={labelStyle}>Total Amount (in XAF):</label>
        <input
          type="number"
          name="totalAmount"
          value={newBooking.totalAmount}
          readOnly
          style={inputStyle}
        />
      </div>
      <div>
        <label style={labelStyle}>Total Amount (in {newBooking.currency}):</label>
        <input
          type="number"
          name="convertedAmount"
          value={convertedAmount.toFixed(2)}
          readOnly
          style={inputStyle}
        />
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
              onChange={(e) => handleGuestChange(index, e)}
              required
              style={inputStyle}
            />
            <input
              type="number"
              name="age"
              placeholder={`Guest ${index + 1} Age`}
              value={guest.age}
              onChange={(e) => handleGuestChange(index, e)}
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