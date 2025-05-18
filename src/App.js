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
      <h1>MiniBus Record</h1>
      <h2><a href="https://www.16seats.net/chi/gmb/gh_62.html" target="_blank">62 Minibus information</a></h2>
      <div className="records-container">
        {Object.entries(records).map(([car, record]) => (
          <div
            key={car}
            className={`record-card ${
              record?.total === 19 ? "red" : record?.location === "Off" ? "gray" : ""
            }`}
          >
            <h2>{car}</h2>
            {record ? (
              <>
                
                <p><b>To: {record.location2}</b></p>
                <p>Car Location: {record.location}</p>
                <p>Total in car: {record.total}</p>
                <p>Vacant Seat: {19 - record.total}</p>
                <p>Record Time: {record.timestamp.split("T=")[1]}</p>
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