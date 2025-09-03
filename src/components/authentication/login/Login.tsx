import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import "../../../css/login.css";
import type { AuthResponse } from "../AuthResponse";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [authResult, setAuthResult] = useState<AuthResponse | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

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
      const response = await fetch("http://localhost:5279/api/auth/login", {
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

  useEffect(() => {
    if (authResult?.status) {
      const timer = setTimeout(() => {
        navigate("/");
      }, 1200);

      return () => clearTimeout(timer);
    }
  }, [authResult, navigate]);

  async function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  }

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
          onChange={handleChange}
          required
        />
        <br />

        <input
          id="password"
          name="password"
          type="password"
          placeholder="password"
          value={credentials.password}
          onChange={handleChange}
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
