import React, { useState } from 'react';

// Define the tax entry type
interface Tax {
  id: number;
  type: string;
  amount: number;
  date: string;
}

// Define a type for tax categories and their details
interface TaxCategory {
  id: number;
  name: string;
  details: string;
}

// Sample tax categories
const taxCategories: TaxCategory[] = [
  { id: 1, name: 'Income Tax', details: 'Tax on earnings from employment or self-employment.' },
  { id: 2, name: 'Property Tax', details: 'Tax paid on property owned by an individual or entity.' },
  { id: 3, name: 'Sales Tax', details: 'Tax on sales of goods and services.' },
  { id: 4, name: 'Corporate Tax', details: 'Tax paid by corporations on their profits.' },
];

const Taxes: React.FC = () => {
  const [taxes, setTaxes] = useState<Tax[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);

  const handleAddTax = () => {
    if (selectedCategory && amount > 0) {
      const newTax = {
        id: taxes.length + 1,
        type: selectedCategory,
        amount,
        date: new Date().toLocaleDateString()
      };
      setTaxes([...taxes, newTax]);
      setSelectedCategory('');
      setAmount(0);
    }
  
    
  };

  return (
    <div style={{ marginTop: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto', padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
      <h2 style={{ color: 'green', textAlign: 'center' }}>Taxes</h2>

      <div style={{ marginBottom: '20px' }}>
        <ul style={{ listStyleType: 'none', padding: '0' }}>
          {taxes.map(tax => (
            <li key={tax.id} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', backgroundColor: '#f9f9f9' }}>
              <strong>{tax.date}:</strong> {tax.type} - <strong>Amount:</strong> ${tax.amount.toFixed(2)}
            </li>
          ))}
        </ul>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', width: 'calc(100% - 110px)', marginRight: '10px' }}
        >
          <option value="" disabled>Select Tax Category</option>
          {taxCategories.map(category => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
          placeholder="Amount"
          style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', width: 'calc(100% - 110px)', marginRight: '10px' }}
        />
        <button
          onClick={handleAddTax}
          style={{ padding: '10px 20px', backgroundColor: 'green', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Add Tax
        </button>
      </div>

      <h3 style={{ color: 'green' }}>Tax Categories</h3>
      <div>
        {taxCategories.map(category => (
          <div key={category.id} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', backgroundColor: '#f9f9f9' }}>
            <h4 style={{ margin: '0 0 5px', color: 'green' }}>{category.name}</h4>
            <p style={{ margin: '0' }}>{category.details}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Taxes;
