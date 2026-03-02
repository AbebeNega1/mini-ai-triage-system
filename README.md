🏥 Mini AI-Based Triage System
📌 Project Overview

The Mini AI-Based Triage System is a full-stack intelligent hospital triage application designed to classify patients into priority levels based on their vital signs and symptoms.

The system predicts whether a patient is:

🟢 Low Priority (Normal)

🟠 Medium Priority (Urgent)

🔴 High Priority (Emergency)

It integrates Machine Learning into a real-world microservice architecture.

🏗 System Architecture

This project includes two backend implementations:

🔹 Version 1 (Microservice Architecture)

React → Node.js → Flask ML Service → MySQL

React → User Interface

Node.js (Express) → Main backend & API coordinator

Flask (Python) → Machine Learning service

MySQL → Database storage

🔹 Version 2 (Flask Monolithic Architecture)

React → Flask → MySQL

Flask handles both:

API endpoints

ML model prediction

Database communication

This allows architectural comparison between microservice and monolithic approaches.

🧠 Machine Learning Model

Algorithm: RandomForestClassifier

Dataset: Synthetic dataset (200–300 records)

Model file: triage_model.pkl

🔎 Input Features

age

temperature

pain_level

breathing_difficulty

heart_rate

🎯 Output Classes
Value	Meaning
0	Low Priority (Normal)
1	Medium Priority (Urgent)
2	High Priority (Emergency)
📊 Evaluation Metrics

Accuracy

Precision

Recall

F1-Score

Confusion Matrix

🛠 Tech Stack
Frontend

React (Vite)

Axios

CSS

Backend (Two Versions)

Node.js

Express

MySQL2

dotenv

AND / OR

Python

Flask

mysql-connector

gunicorn

Machine Learning Service

Python

Flask

Scikit-learn

joblib

pandas

Database

MySQL

⚙️ How to Run the Project Locally
1️⃣ Setup Database

Create database:

CREATE DATABASE mini_triage_db;

Then create the triage_records table (see database/schema.sql).

🔹 Running Microservice Version (Node + Flask)
Step 1 — Start ML Service

Inside ml-service-python:

python app.py

Runs on:

http://127.0.0.1:5001
Step 2 — Start Node Backend

Inside backend-node:

node server.js

Runs on:

http://localhost:5000
Step 3 — Start Frontend

Inside frontend:

npm install
npm run dev

Runs on:

http://localhost:5173
🔹 Running Flask Monolithic Version

Inside backend-flask:

python app.py

Runs on:

http://localhost:5000

Then start frontend as usual.

🧪 Features

AI-based patient priority prediction

Confidence score display

Patient history table

Priority filtering (High / Medium / Low)

Timestamped records

Two backend architecture options

Shared MySQL database

🔬 Future Improvements

Add authentication (Admin login)

Deploy to cloud (Render / Railway / Vercel)

Improve dataset with real medical data

Add dashboard analytics

Performance comparison between Flask & Node

🎓 Academic & Technical Value

This project demonstrates:

Full-stack development

Integration of ML models into web systems

REST API design

Microservice communication

Database integration

Architecture comparison (Monolithic vs Microservice)