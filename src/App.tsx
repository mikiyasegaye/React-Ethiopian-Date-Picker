import React from "react";
import FunctionalityTest from "./components/FunctionalityTest";

const App: React.FC = () => {
  return (
    <div>
      {/* Navigation */}
      <nav className="bg-ethiopian-green text-white p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold font-amharic">የኢትዮጵያ ቀን መምረጫ</h1>
          <div className="text-sm opacity-90">Ethiopian Date Picker Demo</div>
        </div>
      </nav>

      {/* Content */}
      <FunctionalityTest />
    </div>
  );
};

export default App;
