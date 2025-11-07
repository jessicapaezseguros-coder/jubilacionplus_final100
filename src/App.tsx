// src/App.tsx

import { useState } from "react";
import Header from "./components/Header";
import CalculatorTabs from "./components/CalculatorTabs";
import "./App.css";

function App() {
  const [calculationData, setCalculationData] = useState<any>(null);
  const [isCalculated, setIsCalculated] = useState(false);

  const handleCalculate = (data: any) => {
    setCalculationData(data);
    setIsCalculated(true);
  };

  return (
    <>
      <Header />
      <main className="main-container">
        <div className="calculator-wrapper">
          <CalculatorTabs
            onCalculate={handleCalculate}
            calculationData={calculationData}
            isCalculated={isCalculated}
          />
        </div>
      </main>
    </>
  );
}

export default App;
