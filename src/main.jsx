// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router";
import App from "./App.jsx";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import ListPlans from "./components/ListPlans";
import { ROUTES } from "./consts.js";
import Layout from "./Layout.jsx";
import AuthProvider from "./contexts/auth/AuthProvider.jsx";
import ToastProvider from "./contexts/toast/ToastProvider.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <BrowserRouter>
    <AuthProvider>
      <ToastProvider>
        <Routes>
          <Route
            path="/"
            element={<Navigate to={`/${ROUTES.home}`} replace />}
          />

          <Route path={ROUTES.register} element={<RegisterForm />} />
          <Route path={ROUTES.login} element={<LoginForm />} />

          <Route path={ROUTES.home} element={<Layout />}>
            <Route index element={<App />} />
            <Route path={ROUTES.plans} element={<ListPlans />} />
          </Route>
        </Routes>
      </ToastProvider>
    </AuthProvider>
  </BrowserRouter>,
  // </StrictMode>,
);
