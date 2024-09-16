// components/HelpButton.js
import React from 'react';

const HelpButton = () => {
  const handleHelpClick = () => {
    alert('How can we assist you?');
  };

  return (
    <button onClick={handleHelpClick} style={buttonStyle}>
      Help
    </button>
  );
};

const buttonStyle = {
  padding: '10px 20px',
  backgroundColor: '#28a745', // Green color
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

export default HelpButton;