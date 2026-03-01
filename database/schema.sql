-- Create Database
CREATE DATABASE IF NOT EXISTS mini_triage_db;

-- Use Database
USE mini_triage_db;

-- Create Table
CREATE TABLE IF NOT EXISTS triage_records (
    id INT AUTO_INCREMENT PRIMARY KEY,
    age INT NOT NULL,
    temperature FLOAT NOT NULL,
    pain_level INT NOT NULL,
    breathing_difficulty TINYINT NOT NULL,
    heart_rate INT NOT NULL,
    prediction INT NOT NULL,
    confidence FLOAT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);