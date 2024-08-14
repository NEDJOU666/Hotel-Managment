import React, { useState } from 'react';

interface CustomerDetails {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
}

interface AddCustomerFormProps {
  onAddCustomer: (newCustomer: CustomerDetails) => void;
}

const AddCustomerForm: React.FC<AddCustomerFormProps> = ({ onAddCustomer }) => {
  const [newCustomer, setNewCustomer] = useState<CustomerDetails>({
    id: Date.now(),
    name: '',
    email: '',
    phoneNumber: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCustomer({ ...newCustomer, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddCustomer(newCustomer);
    // Reset the form
    setNewCustomer({
      id: Date.now(),
      name: '',
      email: '',
      phoneNumber: '',
    });
  };

  // Styling
  const formStyle: React.CSSProperties = {
    backgroundColor: 'white',
    color: 'green',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '1500px',
    margin: 'auto',
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

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h2>Add New Customer</h2>
      <div>
        <label style={labelStyle}>Name:</label>
        <input
          type="text"
          name="name"
          value={newCustomer.name}
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
          value={newCustomer.email}
          onChange={handleChange}
          required
          style={inputStyle}
        />
      </div>
      <div>
        <label style={labelStyle}>Phone Number:</label>
        <input
          type="text"
          name="phoneNumber"
          value={newCustomer.phoneNumber}
          onChange={handleChange}
          required
          style={inputStyle}
        />
      </div>
      <button type="submit" style={buttonStyle}>Add Customer</button>
    </form>
  );
};

export default AddCustomerForm;
