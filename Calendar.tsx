import React, { useState } from 'react';

interface Activity {
  id: number;
  date: string; // Format 'YYYY-MM-DD'
  title: string;
}

const SimpleCalendar: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([
    { id: 1, date: '2024-09-20', title: 'Conference in Main Hall' },
    { id: 2, date: '2024-09-21', title: 'VIP Room Cleaning' },
  ]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [newActivity, setNewActivity] = useState<string>('');
  const [currentMonth, setCurrentMonth] = useState<number>(9); // September
  const [currentYear, setCurrentYear] = useState<number>(2024);

  // Helper to get days in a month
  const daysInMonth = (month: number, year: number) => new Date(year, month, 0).getDate();

  const handleClick = (day: number) => {
    const date = `${currentYear}-${currentMonth.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    setSelectedDate(date);
  };

  // Add new activity to the selected day
  const handleAddActivity = () => {
    if (selectedDate && newActivity.trim()) {
      const newId = activities.length + 1;
      setActivities([...activities, { id: newId, date: selectedDate, title: newActivity }]);
      setNewActivity(''); // Clear the input
    }
  };

  // Delete an activity
  const handleDeleteActivity = (id: number) => {
    setActivities(activities.filter(activity => activity.id !== id));
  };

  // Render the calendar grid
  const renderCalendar = () => {
    const days = daysInMonth(currentMonth, currentYear);
    const firstDayOfMonth = new Date(currentYear, currentMonth - 1, 1).getDay();
    const rows = [];
    let cells = [];

    // Fill in empty cells before the start of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      cells.push(<td key={`empty-${i}`} style={emptyCellStyle}></td>);
    }

    for (let i = 1; i <= days; i++) {
      cells.push(
        <td key={i} onClick={() => handleClick(i)} style={cellStyle}>
          {i}
        </td>
      );

      if ((i + firstDayOfMonth) % 7 === 0 || i === days) {
        rows.push(<tr key={i}>{cells}</tr>);
        cells = [];
      }
    }

    return rows;
  };

  // Get activities for the selected date
  const renderActivities = () => {
    const activitiesForDay = activities.filter(activity => activity.date === selectedDate);
    return activitiesForDay.length ? (
      <ul>
        {activitiesForDay.map((activity) => (
          <li key={activity.id} style={activityItemStyle}>
            {activity.title}
            <button onClick={() => handleDeleteActivity(activity.id)} style={deleteButtonStyle}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    ) : (
      <p>No activities for this day.</p>
    );
  };

  // Move to the next month
  const handleNextMonth = () => {
    if (currentMonth === 12) {
      setCurrentMonth(1);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Move to the previous month
  const handlePrevMonth = () => {
    if (currentMonth === 1) {
      setCurrentMonth(12);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Hotel Activity Calendar</h2>
      <div style={navigationStyle}>
        <button onClick={handlePrevMonth} style={navButtonStyle}>Previous</button>
        <h3>{`${new Date(currentYear, currentMonth - 1).toLocaleString('default', { month: 'long' })} ${currentYear}`}</h3>
        <button onClick={handleNextMonth} style={navButtonStyle}>Next</button>
      </div>
      <table style={calendarStyle}>
        <thead>
          <tr>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
          </tr>
        </thead>
        <tbody>{renderCalendar()}</tbody>
      </table>

      {selectedDate && (
        <div style={activityBoxStyle}>
          <h3 style={{ color: 'green' }}>Activities for {selectedDate}</h3>
          {renderActivities()}

          {/* Input for adding a new activity */}
          <input
            type="text"
            value={newActivity}
            onChange={(e) => setNewActivity(e.target.value)}
            placeholder="Add new activity"
            style={inputStyle}
          />
          <button onClick={handleAddActivity} style={addButtonStyle}>
            Add Activity
          </button>
        </div>
      )}
    </div>
  );
};

// Styles
const containerStyle: React.CSSProperties = {
  padding: '20px',
  textAlign: 'center',
};

const titleStyle: React.CSSProperties = {
  fontSize: '28px',
  color: 'green',
};

const navigationStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  maxWidth: '400px',
  margin: '0 auto 20px',
};

const navButtonStyle: React.CSSProperties = {
  padding: '8px 15px',
  backgroundColor: 'green',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

const calendarStyle: React.CSSProperties = {
  width: '100%',
  maxWidth: '1000px',
  height:'500px',
  margin: '20px auto',
  borderCollapse: 'collapse',
  backgroundColor: '#f9f9f9',
  border: '1px solid #ddd',
};

const cellStyle: React.CSSProperties = {
  border: '1px solid #ddd',
  padding: '15px',
  textAlign: 'center',
  cursor: 'pointer',
  fontWeight: 'bold',
  color: '#333',
  backgroundColor: '#fff',
  transition: 'background-color 0.3s ease',
};

const emptyCellStyle: React.CSSProperties = {
  border: '1px solid #ddd',
  backgroundColor: '#f9f9f9',
};

const activityBoxStyle: React.CSSProperties = {
  marginTop: '20px',
  padding: '15px',
  border: '2px solid green',
  borderRadius: '8px',
  backgroundColor: 'white',
  maxWidth: '500px',
  margin: '20px auto',
};

const activityItemStyle: React.CSSProperties = {
  padding: '5px 0',
  listStyle: 'none',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const inputStyle: React.CSSProperties = {
  padding: '8px',
  width: '70%',
  borderRadius: '4px',
  border: '1px solid #ccc',
  marginRight: '10px',
};

const addButtonStyle: React.CSSProperties = {
  padding: '8px 15px',
  backgroundColor: 'green',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

const deleteButtonStyle: React.CSSProperties = {
  padding: '5px 10px',
  backgroundColor: 'red',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

export default SimpleCalendar;
