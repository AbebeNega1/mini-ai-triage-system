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
const db = mysql.createConnection(process.env.MYSQL_URL);

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to Railway MySQL");
  }
});
const createTableQuery = `
CREATE TABLE IF NOT EXISTS triage_records (
  id INT AUTO_INCREMENT PRIMARY KEY,
  age INT NOT NULL,
  temperature FLOAT NOT NULL,
  pain_level INT NOT NULL,
  breathing_difficulty INT NOT NULL,
  heart_rate INT NOT NULL,
  prediction VARCHAR(100),
  confidence FLOAT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
`;

db.query(createTableQuery, (err) => {
  if (err) {
    console.error("Table creation error:", err);
  } else {
    console.log("Triage table ready");
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

    // Convert to numbers
    const numericAge = Number(age);
    const numericTemp = Number(temperature);
    const numericPain = Number(pain_level);
    const numericBreathing = Number(breathing_difficulty);
    const numericHeart = Number(heart_rate);

    // ===============================
    // 🔥 TEMPORARY FAKE ML RESPONSE
    // ===============================
    const prediction = numericTemp > 38 || numericHeart > 110
  ? "High"
  : "Low";

const confidence = 0.85;

    // ===============================
    // Insert into MySQL
    // ===============================
    const query = `
      INSERT INTO triage_records
      (age, temperature, pain_level, breathing_difficulty, heart_rate, prediction, confidence)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      numericAge,
      numericTemp,
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
    console.error("Server error:", error.message);
    res.status(500).json({ error: "Server failed" });
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