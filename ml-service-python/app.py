from flask import Flask, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)

# Load trained model
model = joblib.load("model/triage_model.pkl")


@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ML service running"})


@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    print("Incoming request data:", data)   # 👈 ADD THIS LINE

    try:
        temperature = float(data["temperature"])
        fever = 1 if temperature > 37.5 else 0

        features = [
            float(data["age"]),
            fever,
            float(data["pain_level"]),
            float(data["breathing_difficulty"]),
            float(data["heart_rate"])
        ]

        features_array = np.array(features).reshape(1, -1)

        prediction = model.predict(features_array)[0]
        probabilities = model.predict_proba(features_array)[0]

        confidence = round(float(max(probabilities) * 100), 2)

        return jsonify({
            "prediction": int(prediction),
            "confidence": confidence
        })

    except Exception as e:
        print("ERROR:", e)
        return jsonify({"error": str(e)}), 400
        print("===== ERROR START =====")
        print(e)
        print("Received data:", data)
        print("===== ERROR END =====")
        return jsonify({"error": str(e)}), 400
if __name__ == "__main__":
    app.run(port=5001, debug=True)