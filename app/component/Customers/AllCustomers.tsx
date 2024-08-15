import React, { useState } from 'react';

interface CustomerDetails {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
}

interface AllCustomersFormProps {
  customers: CustomerDetails[];
  onEditClick: (customer: CustomerDetails) => void;
  onDeleteClick: (customerId: number) => void;
}

const AllCustomersForm: React.FC<AllCustomersFormProps> = ({ customers, onEditClick, onDeleteClick }) => {
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerDetails | null>(null);

  const handleViewDetailsClick = (customer: CustomerDetails) => {
    if (selectedCustomer && selectedCustomer.id === customer.id) {
      // If the same customer is clicked again, hide the details
      setSelectedCustomer(null);
    } else {
      setSelectedCustomer(customer);
    }
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
      <h2>All Customers</h2>
      <ul>
        {customers.map(customer => (
          <li key={customer.id} style={listItemStyle}>
            <div>
              {customer.name} - {customer.email}
            </div>
            <div style={buttonContainerStyle}>
              <button onClick={() => handleViewDetailsClick(customer)} style={buttonStyle}>
                View Details
              </button>
              <button onClick={() => onEditClick(customer)} style={editButtonStyle}>
                Edit
              </button>
              <button onClick={() => onDeleteClick(customer.id)} style={deleteButtonStyle}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {selectedCustomer && (
        <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '10px' }}>
          <h3>Customer Details</h3>
          <p><strong>Name:</strong> {selectedCustomer.name}</p>
          <p><strong>Email:</strong> {selectedCustomer.email}</p>
          <p><strong>Phone Number:</strong> {selectedCustomer.phoneNumber}</p>
        </div>
      )}
    </div>
  );
};

export default AllCustomersForm;
