import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./css/index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
import Navbar from "./components/Navbar.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/auth/login",
    element: <Login />,
  },
  {
    path: "/auth/register",
    element: <Register />,
  },
  {
    path: "/documentation",
    element: <Documentation />,
  },
  {
    path: "/profile",
    element: (
      <PrivateRoute>
        <Profile />,
      </PrivateRoute>
    ),
  },
  {
    path: "/leaderboards",
    element: <Leaderboards />,
  },
  {
    path: "/exam",
    element: (
      <PrivateRoute>
        <Exam />
      </PrivateRoute>
    ),
  },
  {
    path: "/forgot-password",
    element: <Password />,
  },
  {
    path: "/change-password",
    element: <Password />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Navbar />
    <AuthProvider>
      <RegistrationProvider>
        <RouterProvider router={router} />
      </RegistrationProvider>
    </AuthProvider>
  </StrictMode>
);
