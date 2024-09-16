import React, { useState } from 'react';

interface CustomerDetails {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  picture?: string; // Optional field for storing the picture URL or base64 string
  birthday?: string;
  favoriteAmenities?: string;
  roomPreferences?: string;
  Nationality?: string;
}

interface AllCustomersFormProps {
  customers: CustomerDetails[];
  onEditClick: (customer: CustomerDetails) => void;
  onDeleteClick: (customerId: number) => void;
}

const AllCustomersForm: React.FC<AllCustomersFormProps> = ({ customers, onEditClick, onDeleteClick }) => {
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerDetails | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>(''); // State for search term

  const handleViewDetailsClick = (customer: CustomerDetails) => {
    if (selectedCustomer && selectedCustomer.id === customer.id) {
      // If the same customer is clicked again, hide the details
      setSelectedCustomer(null);
    } else {
      setSelectedCustomer(customer);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Filter customers based on search term
  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Styling
  const containerStyle: React.CSSProperties = {
    backgroundColor: 'white',
    color: 'green',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '1200px',
    margin: '0 auto',
  };

  const searchBarStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px',
    marginBottom: '20px',
    borderRadius: '5px',
    border: '1px solid #ddd',
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

  const customerDetailsStyle: React.CSSProperties = {
    marginTop: '20px',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };

  return (
    <div style={containerStyle}>
      <h2>All Customers</h2>
      
      {/* Search Bar */}
      <input 
        type="text" 
        placeholder="Search by name..." 
        value={searchTerm} 
        onChange={handleSearchChange} 
        style={searchBarStyle} 
      />

      <ul>
        {filteredCustomers.map((customer) => (
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
        <div style={customerDetailsStyle}>
          <h3>Customer Details</h3>
          <p>
            <strong>Name:</strong> {selectedCustomer.name}
          </p>
          <p>
            <strong>Email:</strong> {selectedCustomer.email}
          </p>
          <p>
            <strong>Phone Number:</strong> {selectedCustomer.phoneNumber}
          </p>
          {selectedCustomer.picture && (
            <div>
              <strong>Picture:</strong>
              <img src={selectedCustomer.picture} alt="Customer" style={{ width: '100px', borderRadius: '10px' }} />
            </div>
          )}
          {selectedCustomer.birthday && (
            <p>
              <strong>Birthday:</strong> {selectedCustomer.birthday}
            </p>
          )}
          {selectedCustomer.favoriteAmenities && (
            <p>
              <strong>Favorite Amenities:</strong> {selectedCustomer.favoriteAmenities}
            </p>
          )}
          {selectedCustomer.roomPreferences && (
            <p>
              <strong>Room Preferences:</strong> {selectedCustomer.roomPreferences}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default AllCustomersForm;
