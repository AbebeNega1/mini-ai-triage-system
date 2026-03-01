function ResultCard({ result }) {
  if (!result) return null;

  const getPriorityInfo = (prediction) => {
    switch (prediction) {
      case 0:
        return { label: "Low Priority", color: "green" };
      case 1:
        return { label: "Medium Priority", color: "orange" };
      case 2:
        return { label: "High Priority", color: "red" };
      default:
        return { label: "Unknown", color: "gray" };
    }
  };

  const priority = getPriorityInfo(result.prediction);

  return (
    <div className="result-card">
      <h3>Prediction Result</h3>

      <p>
        <strong>Priority: </strong>
        <span style={{ color: priority.color }}>
          {priority.label}
        </span>
      </p>

      <p>
        <strong>Confidence:</strong> {result.confidence}%
      </p>
    </div>
  );
}

export default ResultCard;