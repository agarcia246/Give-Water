// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Donate from "./pages/Donate";
import DonationSuccess from "./pages/DonationSuccess";
import DonationCancel from "./pages/DonationCancel";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/donate" replace />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/donation/success" element={<DonationSuccess />} />
        <Route path="/donation/cancel" element={<DonationCancel />} />
        <Route path="*" element={<Navigate to="/donate" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
