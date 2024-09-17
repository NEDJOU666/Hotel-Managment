'use client';

import { useEffect, useState } from 'react';
import { ObjectiveDetails } from './interface/objectiveDetails';

const Settings = ({objectives,onSave}:{objectives:ObjectiveDetails[],onSave:any}) => {
  const [Objectives, setObjectives] = useState({
      customer: 0,
      booking: 0,
      room: 0,
      employee: 0,
  });
  useEffect(()=>{
    setObjectives({
      customer: objectives.length > 0 ? objectives[0].customerObjective : 0,
      booking: objectives.length > 0 ? objectives[0].bookingObjective : 0,
      room: objectives.length > 0 ? objectives[0].roomObjective : 0,
      employee: objectives.length > 0 ? objectives[0].employeeObjective : 0,
    })
  },[objectives])

  // Handler to update the objectives state
  const handleInputChange =  (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setObjectives((prevObjectives) => ({
      ...prevObjectives,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const newData = {
            bookingObjective:Objectives.booking,
            customerObjective:Objectives.customer,
            roomObjective:Objectives.room,
            employeeObjective:Objectives.employee,
    }
    // Here, you would typically call an API to save the objectives
    onSave(newData) 
    console.log('Yearly Objectives:', newData);
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6">Yearly Objectives Settings</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label className="text-lg font-medium mb-2" htmlFor="customer">Customer Objective:</label>
          <input
            id="customer"
            type="number"
            name="customer"
            value={Objectives.customer}
            onChange={handleInputChange}
            placeholder="Enter customer objective"
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-lg font-medium mb-2" htmlFor="booking">Booking Objective:</label>
          <input
            id="booking"
            type="number"
            name="booking"
            value={Objectives.booking}
            onChange={handleInputChange}
            placeholder="Enter booking objective"
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-lg font-medium mb-2" htmlFor="staff">Staff Objective:</label>
          <input
            id="staff"
            type="number"
            name="room"
            value={Objectives.room}
            onChange={handleInputChange}
            placeholder="Enter staff objective"
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-lg font-medium mb-2" htmlFor="employee">Employee Objective:</label>
          <input
            id="employee"
            type="number"
            name="employee"
            value={Objectives.employee}
            onChange={handleInputChange}
            placeholder="Enter employee objective"
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-green-400 text-white font-semibold rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Save Objectives
        </button>
      </form>
    </div>
  );
};

export default Settings;
