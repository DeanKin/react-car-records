import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [records, setRecords] = useState({
    "Car 1": null,
    "Car 2": null,
    "Car 3": null,
    "Car 4": null,
    "Car 5": null,
    "Car 6": null,
  });

  // Function to fetch the latest records
  const fetchRecords = async () => {
    try {
      const response = await fetch('/latest_record.json');
      const data = await response.json();
      setRecords(data);
    } catch (error) {
      console.error('Error fetching records:', error);
    }
  };

  // Fetch records on component mount and every 10 seconds
  useEffect(() => {
    fetchRecords(); // Initial fetch
    const interval = setInterval(fetchRecords, 10000); // Fetch every 10 seconds
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <div className="App">
      <h1>Car Records Dashboard</h1>
      <div className="records-container">
        {Object.entries(records).map(([car, record]) => (
          <div key={car} className="record-card">
            <h2>{car}</h2>
            {record ? (
              <div>
                <p><strong>Timestamp:</strong> {record.timestamp}</p>
                <p><strong>Location:</strong> {record.location}</p>
                <p><strong>Button ID:</strong> {record.buttonId}</p>
                <p><strong>State:</strong> {record.state}</p>
                <p><strong>Total:</strong> {record.total}</p>
              </div>
            ) : (
              <p>No record available</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;