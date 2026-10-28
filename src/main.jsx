import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router";
import App from "./App.jsx";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import ListPlans from "./components/ListPlans";
import { ROUTES } from "./consts.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={`/${ROUTES.register}`} replace />}
        />

        <Route path={ROUTES.register} element={<RegisterForm />} />
        <Route path={ROUTES.login} element={<LoginForm />} />

        <Route path={ROUTES.home}>
          <Route index element={<App />} />
          <Route path={ROUTES.plans} element={<ListPlans />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
