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
import { Profile } from "./components/Profile.tsx";
import { Exam } from "./components/Exam.tsx";
import { PrivateRoute } from "./pages/PrivateRoute.tsx";
import { Leaderboards } from "./components/Leaderboards.tsx";

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
    path: "*",
    element: <NotFoundPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <RegistrationProvider>
        <RouterProvider router={router} />
      </RegistrationProvider>
    </AuthProvider>
  </StrictMode>
);
