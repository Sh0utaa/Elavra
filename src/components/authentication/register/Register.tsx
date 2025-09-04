import { useEffect, useState, type FormEvent } from "react";
import { handleInputChange, useRedirect } from "../authHelpers";
import type { AuthResponse } from "../authHelpers";

export default function Register() {
  const [credentials, setCredentials] = useState({
    userName: "",
    dateOfBirth: "",
    email: "",
    password: "",
  });

  const [authResult, setAuthResult] = useState<AuthResponse | null>(null);
  const [step, setStep] = useState<"form" | "verify">("form");
  const [verificationCode, setVerificationCode] = useState("");

  const backend_api = import.meta.env.VITE_BACKEND_API;

  async function sendVerificationCode(): Promise<AuthResponse> {
    try {
      const response = await fetch(
        `${backend_api}/email/send-verification-code`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: credentials.email }),
        }
      );

      if (response.ok) {
        return {
          status: true,
          message: `Verification code sent to ${credentials.email}`,
        };
      } else {
        return {
          status: false,
          message: `Couldn't send verification code to ${credentials.email}`,
        };
      }
    } catch (error) {
      return { status: false, message: "Something went wrong." };
    }
  }

  useEffect(() => {
    if (step === "verify" && verificationCode.length === 6) {
      verifyCode();
    }
  }, [verificationCode, step]);

  async function verifyCode(): Promise<AuthResponse> {
    try {
      const response = await fetch(`${backend_api}/email/verify-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: credentials.email,
          code: verificationCode,
        }),
      });

      if (response.ok) {
        registerUser();
        return {
          status: true,
          message: `Successfully verified ${credentials.email}`,
        };
      } else {
        return {
          status: false,
          message: `Couldn't verify ${credentials.email}`,
        };
      }
    } catch (error) {
      return { status: false, message: "Something went wrong." };
    }
  }

  async function registerUser(): Promise<AuthResponse> {
    try {
      const response = await fetch(`${backend_api}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        setAuthResult({ status: true, message: "Registration successful" });
        return { status: true, message: "Registration successful!" };
      } else {
        return { status: false, message: "Registration failed." };
      }
    } catch (error) {
      return { status: false, message: "Something went wrong." };
    }
  }

  // Redirect if successful
  useRedirect(!!authResult?.status, "/");

  return (
    <>
      <h2>Register</h2>

      {step === "form" && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setStep("verify");
            sendVerificationCode();
          }}
        >
          <input
            id="userName"
            name="userName"
            type="text"
            placeholder="username"
            value={credentials.userName}
            onChange={(e) => handleInputChange(e, setCredentials)}
            required
          />
          <br />

          <input
            id="dateOfBirth"
            name="dateOfBirth"
            type="text"
            placeholder="birthdate"
            value={credentials.dateOfBirth}
            onChange={(e) => handleInputChange(e, setCredentials)}
            required
          />
          <br />

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

          <button type="submit">Register</button>
        </form>
      )}

      {step === "verify" && (
        <div>
          <input
            type="number"
            placeholder="verfication code"
            value={verificationCode}
            onChange={(e) => {
              setVerificationCode(e.target.value);
            }}
            maxLength={6}
          />
        </div>
      )}

      {authResult && (
        <p style={{ color: authResult.status ? "green" : "red" }}>
          {authResult.message}
        </p>
      )}
    </>
  );
}
