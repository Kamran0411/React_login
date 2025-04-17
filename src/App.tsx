import React from "react";
import { Routes, Route } from "react-router-dom";
import PremiumLoginPage from "./components/PremiumLoginPage";
import WelcomePage from "./pages/WelcomePage";
import "./styles.css";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<PremiumLoginPage />} />
      <Route path="/welcome" element={<WelcomePage />} />
    </Routes>
  );
};

export default App;
