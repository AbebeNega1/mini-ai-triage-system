Mini AI-Based Triage System
📌 Project Overview

This project is a full-stack AI-based hospital triage system designed to classify patients into priority levels based on vital signs and symptoms.

The system predicts whether a patient is:

🟢 Normal (Low Priority)

🟠 Urgent (Medium Priority)

🔴 Emergency (High Priority)

It integrates Machine Learning with a microservice architecture.

🏗 Architecture

React → Node.js → Flask ML Service → MySQL Database

React handles UI

Node.js acts as system coordinator

Flask serves ML model

MySQL stores patient records

🧠 Machine Learning Model

Algorithm: RandomForestClassifier

Dataset: Synthetic dataset (200–300 records)

Features:

age

temperature / fever

pain_level

breathing_difficulty

heart_rate

Output:

0 = Normal

1 = Urgent

2 = Emergency

Evaluation metrics:

Accuracy

Precision

Recall

F1-score

Confusion Matrix

🛠 Tech Stack

Frontend:

React

Axios

CSS

Backend:

Node.js

Express

MySQL2

Axios

dotenv

ML Service:

Python

Flask

Scikit-learn

joblib

Database:

MySQL

⚙️ How to Run the Project

1️⃣ Start MySQL

Import schema.sql or run:

CREATE DATABASE mini_triage_db;
Then create triage_records table.

2️⃣ Start ML Service

Inside ml-service-python:

python app.py

Runs on:
http://127.0.0.1:5001

3️⃣ Start Node Backend

Inside backend-node:

node server.js

Runs on:
http://localhost:5000

4️⃣ Start React Frontend

Inside frontend-react:

npm run dev

Runs on:
http://localhost:5173

🧪 Features

AI-based patient classification

Confidence score display

Patient history table

Priority filtering (High / Medium / Low)

Timestamped records

Microservice communication

🔬 Future Improvements

Replace Node backend with Flask monolithic backend (architecture comparison)

Add authentication

Deploy to cloud

Improve dataset with real medical data

🎓 Why This Is Important

This project demonstrates:

Full-stack development

ML integration in production-like architecture

Microservices communication

Database design

UI/UX implementation