const axios = require("axios");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();

app.use(cors());
app.use(express.json());

// ===============================
// MySQL Connection
// ===============================
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

// ===============================
// Test Route
// ===============================
app.get("/", (req, res) => {
  res.json({ message: "Node backend is running" });
});

// ===============================
// TRIAGE ROUTE
// ===============================
app.post("/api/triage", async (req, res) => {
  try {
    const {
      age,
      temperature,
      pain_level,
      breathing_difficulty,
      heart_rate,
    } = req.body;

    // Convert values to numbers
    const numericAge = Number(age);
    const numericTemp = Number(temperature);
    const numericPain = Number(pain_level);
    const numericBreathing = Number(breathing_difficulty);
    const numericHeart = Number(heart_rate);

    // ===============================
    // 1️⃣ Call ML Service (Flask)
    // ===============================
    const mlResponse = await axios.post(
      "http://127.0.0.1:5001/predict",
      {
        age: numericAge,
        temperature: numericTemp, // ✅ send temperature
        pain_level: numericPain,
        breathing_difficulty: numericBreathing,
        heart_rate: numericHeart,
      }
    );

    const { prediction, confidence } = mlResponse.data;

    // ===============================
    // 2️⃣ Convert temperature → fever for DB
    // ===============================
    const fever = numericTemp > 37.5 ? 1 : 0;

    // ===============================
    // 3️⃣ Insert into MySQL
    // ===============================
    const query = `
  INSERT INTO triage_records
  (age, temperature, pain_level, breathing_difficulty, heart_rate, prediction, confidence)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`;

    const values = [
      numericAge,
      fever,
      numericPain,
      numericBreathing,
      numericHeart,
      prediction,
      confidence,
    ];

    db.query(query, values, (err, result) => {
      if (err) {
        console.error("Insert error:", err);
        return res.status(500).json({ error: "Database insert failed" });
      }

      res.json({
        message: "Record inserted successfully",
        prediction,
        confidence,
        recordId: result.insertId,
      });
    });

  } catch (error) {
    console.error("ML service error:", error.message);

    if (error.response) {
      console.error("Flask response data:", error.response.data);
    }

    res.status(500).json({ error: "ML service failed" });
  }
});
// ===============================
// GET ALL TRIAGE RECORDS
// ===============================
app.get("/api/patients", (req, res) => {
  const sql = "SELECT * FROM triage_records ORDER BY created_at DESC";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching records:", err);
      return res.status(500).json({ error: "Database error" });
    }

    res.json(results);
  });
});
// ===============================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});