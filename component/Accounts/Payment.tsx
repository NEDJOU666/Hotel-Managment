import React, { useState } from 'react';

const Payment: React.FC<{ handleAddPayment: (amount: number, description: string, method: string, reference: string) => void }> = ({ handleAddPayment }) => {
  const [amount, setAmount] = useState<number>(0);
  const [description, setDescription] = useState<string>('');
  const [method, setMethod] = useState<string>('Credit Card');
  const [reference, setReference] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  const handleSubmit = () => {
    if (amount > 0 && description && reference) {
      handleAddPayment(amount, description, method, reference);
      setAmount(0);
      setDescription('');
      setMethod('Credit Card');
      setReference('');
      setSuccessMessage('Payment added successfully!');
      setTimeout(() => setSuccessMessage(''), 3000); // Hide message after 3 seconds
    } else {
      setSuccessMessage('Please fill in all fields.');
      setTimeout(() => setSuccessMessage(''), 3000); // Hide message after 3 seconds
    }
  };

  return (
    <div style={{ marginTop: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '1500px', margin: '0 auto', padding: '60px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
      <h2 style={{ color: 'green', textAlign: 'center' }}>Payment</h2>

      {successMessage && (
        <div style={{ marginBottom: '20px', padding: '10px', backgroundColor: successMessage.includes('successfully') ? '#d4edda' : '#f8d7da', color: successMessage.includes('successfully') ? '#155724' : '#721c24', borderRadius: '4px', textAlign: 'center' }}>
          {successMessage}
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
          placeholder="Amount"
          style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
        />
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
        >
          <option value="Credit Card">Credit Card</option>
          <option value="Bank Transfer">Bank Transfer</option>
          <option value="Cash">Cash</option>
        </select>
        <input
          type="text"
          value={reference}
          onChange={(e) => setReference(e.target.value)}
          placeholder="Reference Number"
          style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
        />
        <button
          onClick={handleSubmit}
          style={{ padding: '10px 20px', backgroundColor: 'green', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}
        >
          Add Payment
        </button>
      </div>
    </div>
  );
};

export default Payment;
