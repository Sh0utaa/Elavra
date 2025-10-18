import { useState } from "react";
import "../css/login.css";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login, loading, error, user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  if (user) {
    navigate("/", { replace: true });
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const success = await login(email, password);
      if (success) {
        navigate("/", { replace: true });
      }
    } catch (error) {}
  }

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <h1>Login</h1>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={email}
              placeholder="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <br />
            <input
              type="text"
              value={password}
              placeholder="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <br />
            <a href="/forgot-password">forgot password?</a>
            <br />
            <br />
            <br />
            <button type="submit">Login</button>
          </form>

          {error && <p style={{ color: "red" }}>{error}</p>}
        </>
      )}
    </>
  );
}
