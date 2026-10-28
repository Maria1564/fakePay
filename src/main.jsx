import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router";
import App from "./App.jsx";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import ListPlans from "./components/ListPlans";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/register" replace />} />

        <Route path="register" element={<RegisterForm />} />
        <Route path="login" element={<LoginForm />} />

        <Route path="home">
          <Route index element={<App />} />
          <Route path="plans" element={<ListPlans />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
