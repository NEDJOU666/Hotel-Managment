import React, { useState } from 'react';
import Expenses from './Expenses';
import Invoices from './Invoices';
import Payment from './Payment';
import Taxes from './Taxes';
import ProvidentFund from './ProvidentFund';

interface AccountProps {
  index: number;
}

const Account: React.FC<AccountProps> = ({ index }) => {
  const [payments, setPayments] = useState<{ id: number, amount: number, date: string, description: string, method: string, reference: string }[]>([]);
  const [invoices, setInvoices] = useState<{ id: number, details: string, amount: number, date: string, method: string, reference: string }[]>([]);
  const [selectedInvoice, setSelectedInvoice] = useState<null | { id: number, details: string, amount: number, date: string, method: string, reference: string }>(null);

  const handleAddPayment = (amount: number, description: string, method: string, reference: string) => {
    const newPayment = {
      id: payments.length + 1,
      amount,
      date: new Date().toLocaleDateString(),
      description,
      method,
      reference
    };
    setPayments([...payments, newPayment]);
    addToInvoice(newPayment);
  };

  const addToInvoice = (payment: { id: number, amount: number, date: string, description: string, method: string, reference: string }) => {
    const newInvoice = {
      id: invoices.length + 1,
      details: `Payment received for ${payment.description}`,
      amount: payment.amount,
      date: payment.date,
      method: payment.method,
      reference: payment.reference
    };
    setInvoices([...invoices, newInvoice]);
  };

  const headerStyle: React.CSSProperties = {
    fontSize: '36px',
    color: 'green',
    textAlign: 'center',
    marginBottom: '20px',
  };

  return (
    <div>
      <h1 style={headerStyle}>Account Management</h1>
      {index === 2 && <Expenses />}
      {index === 0 && <Invoices invoices={invoices} />}
      {index === 1 && <Payment handleAddPayment={handleAddPayment} />}
      {index === 3 && <Taxes />}
      {index === 4 && <ProvidentFund />}
    </div>
  );
};

export default Account;
