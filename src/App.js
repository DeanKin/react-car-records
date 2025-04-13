import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [records, setRecords] = useState({
    "Car 1": null,
    "Car 2": null,
    "Car 3": null,
    "Car 4": null,
    "Car 5": null,
    "Car 6": null,
  });

  // Function to fetch the latest records from localhost:3000
  const fetchRecords = async () => {
    try {
      const response = await fetch("http://localhost:3000/output/latest_record.json");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Fetched data:", data); // Log the fetched data
      setRecords(data);
    } catch (error) {
      console.error("Error fetching records:", error);
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
              <>
                <p>Time: {record.timestamp.split("T=")[1]}</p>
                <p>Location: {record.location}</p>
                <p>Button ID: {record.buttonId}</p>
                <p>State: {record.state}</p>
                <p>Total: {record.total}</p>
              </>
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