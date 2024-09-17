"use client"
import React, { useState } from 'react';
import { Expense } from '../interface/expensesDetails';
import exp from 'constants';
// Define the expense type for better type safety

// List of common hotel expense categories
const expenseCategories = [
  'Housekeeping',
  'Maintenance',
  'Utilities',
  'Salaries',
  'Supplies',
  'Marketing',
  'Repairs',
  'Food & Beverage',
  'Admin Expenses',
  'Insurance',
  'Property Taxes',
];

const Expenses = ({expenses ,onAdd,onEdit,onDelete}:{expenses:Expense[],onAdd:any,onEdit:any,onDelete:any}) => {
  const [Expenses, setExpenses] = useState<Expense[]>([]);
  const [category, setCategory] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);
  const [editExpenseId, setEditExpenseId] = useState<string | null>(null);
  const [deleting,setDeleting] = useState(false)
  const handleAddExpense = async () => {
    if (category && amount > 0) {
    const  idEx = editExpenseId ? expenses.find(expense => expense._id == editExpenseId) : expenses[0]
      const newExpense = !editExpenseId ? {
          id:expenses.length + 1,
          category,
          amount,
          date: new Date().toLocaleDateString()
        
      }:{
        _id:idEx?._id,
        id:idEx?.id,
          category,
          amount,
          date: new Date().toLocaleDateString()
      }

      if (editExpenseId !== null) {
        onEdit(newExpense)
          
          setEditExpenseId(null);
        
      } else {
       await onAdd(newExpense)
      }

      setCategory('');
      setAmount(0);
    }
  };

  const handleEditExpense = async (_id: string) => {
    
    const expenseToEdit = expenses.find(expense => expense._id === _id);
    if (expenseToEdit) {
      
      setCategory(expenseToEdit.category);
      setAmount(expenseToEdit.amount);
      setEditExpenseId(_id);
    }
  };

  const handleDeleteExpense = async (_id: string) => {
    setDeleting(true)
    await onDelete(_id)
    setExpenses(expenses.filter(expense => expense._id !== _id));
    setDeleting(false)
  };

  const getTotalExpenses = () => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  };

  return (
    <div style={{ marginTop: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ color: 'green', textAlign: 'center' }}>Expenses</h2>
      <p style={{ textAlign: 'center' }}><strong>Total Expenditure:</strong> ${getTotalExpenses().toFixed(2)}</p>

      <div style={{ maxWidth: '1500px', margin: '0 auto', padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ padding: '10px', marginBottom: '10px', width: '450px', border: '1px solid #ccc', borderRadius: '4px' }}
          >
            <option value="" disabled>Select Category</option>
            {expenseCategories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value))}
            placeholder="Amount"
            style={{ padding: '10px', marginBottom: '10px', width: '450px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
          <button 
            onClick={handleAddExpense} 
            style={{ padding: '10px 20px', backgroundColor: 'green', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            {editExpenseId !== null ? 'Update Expense' : 'Add Expense'}
          </button>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f4f4f4' }}>Date</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f4f4f4' }}>Category</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f4f4f4' }}>Amount</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f4f4f4' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map(expense => (
              <tr key={expense.id}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{expense.date}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{expense.category}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>${expense.amount.toFixed(2)}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  <button 
                    onClick={() => handleEditExpense(expense._id ? expense._id : "")} 
                    style={{ marginRight: '10px', padding: '5px 10px', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDeleteExpense(expense._id ? expense._id : "")} 
                    style={{ padding: '5px 10px', backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    { deleting ? 'Deleting...': 'Delete'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Expenses;
