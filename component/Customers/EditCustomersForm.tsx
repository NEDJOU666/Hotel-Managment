"use client"
import { urlFor } from '@/sanity/lib/image';
import React, { useState } from 'react';
import { client } from '@/sanity/lib/client';

interface CustomerDetails {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  address?: string;
  birthday?: string;
  favoriteAmenities?: string;
  roomPreferences?: string;
  nationality?: string;
  picture?: string; // Optional field for storing the picture URL or base64 string
}

interface EditCustomerFormProps {
  customer: CustomerDetails;
  onUpdate:any
}

const EditCustomerForm: React.FC<EditCustomerFormProps> = ({ customer, onUpdate }) => {
  const [updatedCustomer, setUpdatedCustomer] = useState<CustomerDetails>(customer);
  const [selectedImage, setSelectedImage] = useState<File>();
  const [imagePreview, setImagePreview] = useState(customer?.picture ? urlFor(customer.picture).url() : '');
  // State for image preview

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedCustomer({ ...updatedCustomer, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file)
      setImagePreview(URL.createObjectURL(file))
    }
  };
  const uploadImage = async (file: any) => {
    try {
    const formData = new FormData();
    formData.append('file', file);

    const uploadedImage = await client.assets.upload('image', file);
      // Return the image asset ID
      return uploadedImage._id;
    } catch (error) {
      console.error('Error uploading image:', error);
      return "bad request"; // Rethrow the error for handling elsewhere
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let imageToSave:any = customer.picture; // Default to the existing image

    if (selectedImage) {
      try {
        // Upload the new image to Sanity
        const uploadedImageID = await uploadImage(selectedImage);
        imageToSave = {
          _type: 'image',
          asset: { _ref: uploadedImageID},
        };
      } catch (error) {
        console.error('Image upload failed:', error);
        return;
      }
    }
    
    const newUpdatedCustomer = {...updatedCustomer, picture: imageToSave};
    onUpdate(newUpdatedCustomer);
    
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
        {imagePreview ? (
          <img src={imagePreview} alt="Customer Preview" style={imagePreviewStyle} />
        ) : (
          <p>No Image Selected</p>
        )}
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </div>
      <div style={formSectionStyle}>
        <h2>Edit Customer</h2>
        <div>
          <label style={labelStyle}>Name:</label>
          <input
            type="text"
            name="name"
            value={updatedCustomer.name}
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
            value={updatedCustomer.email}
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
            value={updatedCustomer.phoneNumber}
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
            value={updatedCustomer.birthday || ''}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Favorite Amenities:</label>
          <input
            type="text"
            name="favoriteAmenities"
            value={updatedCustomer.favoriteAmenities || ''}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Room Preferences:</label>
          <input
            type="text"
            name="roomPreferences"
            value={updatedCustomer.roomPreferences || ''}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
        <button type="submit" style={buttonStyle}>Update Customer</button>
      </div>
    </form>
  );
};

export default EditCustomerForm;
