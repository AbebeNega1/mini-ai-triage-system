import { useState } from "react";
import Navbar from "../components/Navbar";
import PatientForm from "../components/PatientForm";
import ResultCard from "../components/ResultCard";

function Home() {
  const [result, setResult] = useState(null);

  return (
    <div>
      <Navbar />
      <div className="container">
  <PatientForm onResult={setResult} />
  <ResultCard result={result} />
</div>
    </div>
  );
}

export default Home;