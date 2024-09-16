import React, { useState } from 'react';

interface CustomerDetails {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  picture?: string; // Optional field for storing the picture URL or base64 string
  birthday: string;
  favoriteAmenities: string;
  roomPreferences: string;
  Nationality: string;
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
    picture: '',
    birthday: '',
    favoriteAmenities: '',
    roomPreferences: '',
    Nationality: '',
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null); // State for image preview

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewCustomer({ ...newCustomer, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
        setNewCustomer({ ...newCustomer, picture: reader.result as string });
      };

      reader.readAsDataURL(file); // Convert image file to base64 string
    }
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
      picture: '',
      birthday: '',
      favoriteAmenities: '',
      roomPreferences: '',
      Nationality: '',
    });
    setPreviewImage(null);
  };

  // Styling
  const formStyle: React.CSSProperties = {
    display: 'flex',
    backgroundColor: 'white',
    color: 'green',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '1200px',
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

  const imageBoxStyle: React.CSSProperties = {
    width: '30%',
    marginRight: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px dashed green',
    borderRadius: '10px',
    padding: '10px',
  };

  const imagePreviewStyle: React.CSSProperties = {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '10px',
    marginBottom: '10px',
  };

  const formSectionStyle: React.CSSProperties = {
    width: '70%',
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <div style={imageBoxStyle}>
        {previewImage ? (
          <img src={previewImage} alt="Customer Preview" style={imagePreviewStyle} />
        ) : (
          <p>No Image Selected</p>
        )}
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </div>
      <div style={formSectionStyle}>
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
        <div>
          <label style={labelStyle}>Birthday:</label>
          <input
            type="date"
            name="birthday"
            value={newCustomer.birthday}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Favorite Amenities:</label>
          <input
            type="text"
            name="favoriteAmenities"
            value={newCustomer.favoriteAmenities}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Room Preferences:</label>
          <input
            type="text"
            name="roomPreferences"
            value={newCustomer.roomPreferences}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
        <button type="submit" style={buttonStyle}>Add Customer</button>
      </div>
    </form>
  );
};

export default AddCustomerForm;
