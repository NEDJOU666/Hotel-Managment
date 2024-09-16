import React, { useState } from 'react';

const ProvidentFund: React.FC = () => {
  const [contributions, setContributions] = useState<{ id: number, name: string, amount: number, date: string }[]>([]);
  const [name, setName] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);

  const handleAddContribution = () => {
    if (name && amount > 0) {
      const newContribution = {
        id: contributions.length + 1,
        name,
        amount,
        date: new Date().toLocaleDateString()
      };
      setContributions([...contributions, newContribution]);
      setName('');
      setAmount(0);
    }
  };

  const getTotalBalance = () => {
    return contributions.reduce((total, contribution) => total + contribution.amount, 0);
  };

  return (
    <div style={{ marginTop: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', backgroundColor: '#f9f9f9' }}>
      <h2 style={{ color: 'green', textAlign: 'center' }}>Provident Fund</h2>
      <p style={{ fontSize: '18px', textAlign: 'center' }}><strong>Total Balance:</strong> XAF{getTotalBalance().toFixed(2)}</p>
      <ul style={{ listStyleType: 'none', padding: '0' }}>
        {contributions.map(contribution => (
          <li key={contribution.id} style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
            <strong>{contribution.date}:</strong> {contribution.name} contributed XAF{contribution.amount.toFixed(2)}
          </li>
        ))}
      </ul>
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Contributor Name"
          style={{ padding: '10px', marginRight: '10px', width: '200px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
          placeholder="Contribution Amount"
          style={{ padding: '10px', marginRight: '10px', width: '200px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <button onClick={handleAddContribution} style={{ padding: '10px 20px', backgroundColor: 'green', color: 'white', border: 'none', borderRadius: '5px' }}>Add Contribution</button>
      </div>
    </div>
  );
};

export default ProvidentFund;
