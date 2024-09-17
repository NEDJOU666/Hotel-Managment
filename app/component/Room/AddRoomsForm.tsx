"use client"
import React, { useState } from 'react';
import { RoomDetails } from '../interface/roomDetails';
import { client } from '@/sanity/lib/client';
interface AddRoomsFormProps {
  onAddRoom: (room: RoomDetails) => void;
  newId : number,
}



const AddRoomsForm: React.FC<AddRoomsFormProps> = ({ onAddRoom,newId }) => {
  const [roomIndex, setRoomIndex] = useState(0);
  const [image,setImage] = useState<File>()
  const [newRoom, setNewRoom] = useState<RoomDetails>({
    id: `RM-${roomIndex < 10 ? "00" : roomIndex<100 ? "0":""}${roomIndex+1}`,
    type: 'single',
    confort: 'standard',
    mainImage: {
      asset: {
        _type : '',
        _ref:'',
      },
    },
    pricePerNight:0,
    status:'Available',
  });
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file)// Convert image file to base64 string
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
    const imageAssetId = image ? await uploadImage(image) : ""
    if(imageAssetId == "bad request") return;
    const newRoomWithImage:RoomDetails = {
      ...newRoom,
      mainImage:{
        asset:{
          _ref:imageAssetId,
          _type:"refrence"
        }
      }
     }
    onAddRoom( newRoomWithImage);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewRoom({ ...newRoom, [name]: value });
  };

  const containerStyle: React.CSSProperties = {
    backgroundColor: '#fdfdfd',
    padding: '40px',
    borderRadius: '16px',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
    maxWidth: '1500px',
    margin: '50px auto',
    fontFamily: 'Arial, sans-serif',
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '14px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    marginBottom: '20px',
    fontSize: '16px',
    boxSizing: 'border-box',
    transition: 'border-color 0.3s, box-shadow 0.3s',
  };

  const selectStyle: React.CSSProperties = {
    ...inputStyle,
  };

  const buttonStyle: React.CSSProperties = {
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    padding: '12px 20px',
    cursor: 'pointer',
    transition: 'background-color 0.3s, transform 0.3s',
    fontSize: '16px',
    width: '100%',
    textTransform: 'uppercase',
  };

  const buttonHoverStyle: React.CSSProperties = {
    backgroundColor: '#2980b9',
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#333', fontSize: '26px', fontWeight: 'bold' }}>Add New Room</h2>
      <form onSubmit={handleSubmit}>
      <div>
          <label style={{ marginBottom: '8px', display: 'block', color: '#555', fontSize: '16px' }}>Main Image:</label>
          {
            image ? (
              <img src={URL.createObjectURL(image)} className=' h-[200px] w-[400px] rounded-md mb-3' alt="" />
            ):(
              <div className=" w-[400px] h-[100px] border-[2px] rounded-md mb-3 flex items-center justify-center">No Image Selected</div>
            )
          }
          <input
            type="file"
            name='main Image'
            style={inputStyle}
            onChange={handleImageChange}
            placeholder="Main Image"
            required
          />
        </div>
        <div>
          <label style={{ marginBottom: '8px', display: 'block', color: '#555', fontSize: '16px' }}>Room Number:</label>
          <input
            type="text"
            name='id'
            value={newRoom.id}
            disabled
            style={inputStyle}
            placeholder=" Room Number"
            required
          />
        </div>
        
        <div>
        <label style={{ marginBottom: '8px', display: 'block', color: '#555', fontSize: '16px' }}>Room Type:</label>
        <select
          name="type"
          value={newRoom.type}
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
        <label style={{ marginBottom: '8px', display: 'block', color: '#555', fontSize: '16px' }}>Room Confort:</label>
        <select
          name="confort"
          value={newRoom.confort}
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
          <label style={{ marginBottom: '8px', display: 'block', color: '#555', fontSize: '16px' }}>Status:</label>
          <select
          name='status'
            value={newRoom.status}
            onChange={handleChange}
            style={selectStyle}
          >
            <option value="Available">Available</option>
            <option value="Occupied">Occupied</option>
            <option value="Maintenance">Maintenance</option>
          </select>
        </div>
        <div>
          <label style={{ marginBottom: '8px', display: 'block', color: '#555', fontSize: '16px' }}>Price Per Night:</label>
          <input
            type="text"
            name='pricePerNight'
            value={newRoom.pricePerNight}
            onChange={handleChange}
            style={inputStyle}
            placeholder=" Enter the price"
            required
          />
        </div>
        <button
          type="submit"
          style={buttonStyle}
        >
          Add Room
        </button>
      </form>
    </div>
  );
};

export default AddRoomsForm;
