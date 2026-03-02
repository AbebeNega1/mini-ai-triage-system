import { useEffect, useState } from "react";
import axios from "axios";
import "../Stayles.css";

function PatientTable() {
  const [filter, setFilter] = useState("all");
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
  try {
    const res = await axios.get(
      "https://mini-ai-triage-system-production.up.railway.app/api/patients"
    );
    setPatients(res.data);
  } catch (error) {
    console.error("Error fetching patients:", error);
  }
};
const getPriorityInfo = (prediction) => {
  switch (prediction) {
    case 0:
      return { label: "Low", className: "low" };
    case 1:
      return { label: "Medium", className: "medium" };
    case 2:
      return { label: "High", className: "high" };
    default:
      return { label: "Unknown", className: "" };
  }
};
  return (
    <div className="table-container">
      <h2>Patient Records</h2>
<div className="filter-buttons">
  <button onClick={() => setFilter("all")}>All</button>
  <button onClick={() => setFilter(2)}>High</button>
  <button onClick={() => setFilter(1)}>Medium</button>
  <button onClick={() => setFilter(0)}>Low</button>
</div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Age</th>
            <th>Temp</th>
            <th>Pain</th>
            <th>Breathing</th>
            <th>Heart Rate</th>
            <th>Priority</th>
            <th>Confidence</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {patients
  .filter((p) => filter === "all" || p.prediction === filter)
  .map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.age}</td>
              <td>{p.temperature}</td>
              <td>{p.pain_level}</td>
              <td>{p.breathing_difficulty}</td>
              <td>{p.heart_rate}</td>
              <td>
  <span className={`priority-badge ${getPriorityInfo(p.prediction).className}`}>
    {getPriorityInfo(p.prediction).label}
  </span>
</td>
              <td>{p.confidence}%</td>
              <td>{new Date(p.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PatientTable;