import { useState, type FormEvent } from "react";
import "../../../css/login.css";
import type { AuthResponse } from "../authHelpers";
import { useNavigate } from "react-router-dom";
import { handleInputChange, useRedirect } from "../authHelpers";

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [authResult, setAuthResult] = useState<AuthResponse | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const backend_api = import.meta.env.VITE_BACKEND_API;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);

    const response = await authenticate(credentials);
    setAuthResult(response);

    setIsSubmitting(false);
  }

  async function authenticate(form: {
    email: string;
    password: string;
  }): Promise<AuthResponse> {
    try {
      const response = await fetch(`${backend_api}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        return {
          status: true,
          message: "successfully logged in",
        };
      }

      const errorText = await response.text();
      return { status: false, message: errorText || "Invalid credentials" };
    } catch (error) {}
    return {
      status: false,
      message: "failed to login, email or password incorrect",
    };
  }

  useRedirect(!!authResult?.status, "/");

  return (
    <>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="email"
          value={credentials.email}
          onChange={(e) => handleInputChange(e, setCredentials)}
          required
        />
        <br />

        <input
          id="password"
          name="password"
          type="password"
          placeholder="password"
          value={credentials.password}
          onChange={(e) => handleInputChange(e, setCredentials)}
          required
        />
        <br />

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Logging in..." : "Login"}
        </button>

        {authResult && (
          <p style={{ color: authResult.status ? "green" : "red" }}>
            {authResult.message}
          </p>
        )}
      </form>
    </>
  );
}
