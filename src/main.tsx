import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./css/index.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login.tsx";
import Register from "./components/Register.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { RegistrationProvider } from "./context/RegistrationContext.tsx";
import { Exam } from "./components/Exam.tsx";
import { PrivateRoute } from "./pages/PrivateRoute.tsx";
import { Leaderboards } from "./components/Leaderboards.tsx";
import Password from "./components/Password.tsx";
import Profile from "./components/Profile.tsx";
import Documentation from "./pages/Documentation.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <RegistrationProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
            <Route path="/documentation" element={<Documentation />} />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route path="/leaderboards" element={<Leaderboards />} />
            <Route
              path="/exam"
              element={
                <PrivateRoute>
                  <Exam />
                </PrivateRoute>
              }
            />
            <Route path="/forgot-password" element={<Password />} />
            <Route path="/change-password" element={<Password />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </HashRouter>
      </RegistrationProvider>
    </AuthProvider>
  </StrictMode>
);
