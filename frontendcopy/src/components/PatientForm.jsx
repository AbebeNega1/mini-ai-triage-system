import { useState } from "react";

function PatientForm({ onResult }) {
  const [formData, setFormData] = useState({
    age: "",
    temperature: "",
    pain_level: "",
    breathing_difficulty: "",
    heart_rate: "",
  });
const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
setLoading(true);
  try {
    const response = await fetch("https://mini-ai-triage-system-production.up.railway.app/api/triage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Server error");
    }

    onResult(result);
  } catch (error) {
    console.error(error);
    alert("Backend connection failed");
    setLoading(false);
  }
};

  return (
    <div style={{ padding: "20px" }}>
      <h3>Patient Information</h3>

      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          type="number"
          name="temperature"
          placeholder="Temperature (°C)"
          value={formData.temperature}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          type="number"
          name="pain_level"
          placeholder="Pain Level (1-10)"
          value={formData.pain_level}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          type="number"
          name="breathing_difficulty"
          placeholder="Breathing Difficulty (0 or 1)"
          value={formData.breathing_difficulty}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          type="number"
          name="heart_rate"
          placeholder="Heart Rate"
          value={formData.heart_rate}
          onChange={handleChange}
          required
        />
        <br /><br />

        <button type="submit" disabled={loading}>
  {loading ? "Predicting..." : "Predict Priority"}
</button>
      </form>
    </div>
  );
}

export default PatientForm;