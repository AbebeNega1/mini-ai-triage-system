import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
import joblib
import numpy as np

app = Flask(__name__)
CORS(app)

# ===============================
# Load ML Model
# ===============================
model = joblib.load("triage_model.pkl")

# ===============================
# Connect to MySQL
# ===============================
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="abebe@hu",  # 🔴 change this
    database="mini_triage_db"
)

cursor = db.cursor()

# ===============================
# API Route
# ===============================
@app.route("/api/triage", methods=["POST"])
def predict():
    try:
        data = request.json

        age = int(data["age"])
        temperature = int(data["temperature"])
        pain_level = int(data["pain_level"])
        breathing_difficulty = int(data["breathing_difficulty"])
        heart_rate = int(data["heart_rate"])

        features = pd.DataFrame([{
            "age": age,
            "temperature": temperature,
            "pain_level": pain_level,
            "breathing_difficulty": breathing_difficulty,
            "heart_rate": heart_rate
        }])

        prediction = int(model.predict(features)[0])
        probabilities = model.predict_proba(features)[0]
        confidence = round(float(max(probabilities)) * 100, 2)

        query = """
        INSERT INTO triage_records
        (age, temperature, pain_level, breathing_difficulty, heart_rate, prediction, confidence)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
        """

        values = (
            age,
            temperature,
            pain_level,
            breathing_difficulty,
            heart_rate,
            prediction,
            confidence
        )

        cursor.execute(query, values)
        db.commit()

        return jsonify({
            "prediction": prediction,
            "confidence": confidence
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 
@app.route("/api/patients", methods=["GET"])
def get_records():
    try:
        cursor.execute("SELECT * FROM triage_records ORDER BY id DESC")
        rows = cursor.fetchall()

        records = []
        for row in rows:
            records.append({
                "id": row[0],
                "age": row[1],
                "temperature": row[2],
                "pain_level": row[3],
                "breathing_difficulty": row[4],
                "heart_rate": row[5],
                "prediction": row[6],
                "confidence": row[7]
            })

        return jsonify(records)

    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(port=5000, debug=True)