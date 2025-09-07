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
