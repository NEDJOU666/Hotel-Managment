import React, { useState } from 'react';
import AddCustomersForm from './AddCustomersForm';
import EditCustomersForm from './EditCustomersForm';
import AllCustomersForm from './AllCustomers';

interface CustomerDetails {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
}

interface CustomerProps {
  index: number;
}

const Customer: React.FC<CustomerProps> = ({ index }) => {
  const [customers, setCustomers] = useState<CustomerDetails[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerDetails | null>(null);

  const handleAddCustomer = (newCustomer: CustomerDetails) => {
    setCustomers([...customers, newCustomer]);
  };

  const handleUpdateCustomer = (updatedCustomer: CustomerDetails) => {
    setCustomers(customers.map(customer => (customer.id === updatedCustomer.id ? updatedCustomer : customer)));
    setSelectedCustomer(null);
  };

  const handleDeleteCustomer = (customerId: number) => {
    setCustomers(customers.filter(customer => customer.id !== customerId));
  };

  const handleEditClick = (customer: CustomerDetails) => {
    setSelectedCustomer(customer);
  };

  const headerStyle: React.CSSProperties = {
    fontSize: '36px',
    color: 'green',
    textAlign: 'center',
    marginBottom: '20px',
  };

  return (
    <div>
      <h1 style={headerStyle}>Customer Management</h1>
      {index === 0 && <AddCustomersForm onAddCustomer={handleAddCustomer} />}
      {index === 1 && selectedCustomer && (
        <EditCustomersForm customer={selectedCustomer} onUpdate={handleUpdateCustomer} />
      )}
      {index === 2 && (
        <AllCustomersForm
          customers={customers}
          onEditClick={handleEditClick}
          onDeleteClick={handleDeleteCustomer}
        />
      )}
    </div>
  );
};

export default Customer;
