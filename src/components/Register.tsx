import { useState } from "react";
import { useRegistration } from "../context/RegistrationContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Registration() {
  const {
    formData,
    dispatch,
    sendVerificationCode,
    verifyCode,
    register,
    step,
    verification,
    isLoading,
    error,
  } = useRegistration();

  const { user } = useAuth();
  const navigate = useNavigate();
  const [localErrors, setLocalErrors] = useState<Record<string, string>>({});
  const [verificationCode, setVerificationCode] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  if (user) {
    navigate("/", { replace: true });
    return null;
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors: Record<string, string> = {};
    if (!formData.email) errors.email = "Email is required";
    if (!formData.userName) errors.userName = "Username is required";

    if (!formData.password) {
      errors.password = "Password is required";
    } else {
      const passwordErrors = await validatePassword(formData.password);
      if (passwordErrors.length > 0) {
        errors.password = passwordErrors.join(" ");
      } else if (formData.password !== repeatPassword) {
        errors.password = "Passwords don't match";
      }
    }

    if (!formData.dateOfBirth) errors.dateOfBirth = "Date of birth is required";

    if (Object.keys(errors).length > 0) {
      setLocalErrors(errors);
      return;
    }

    try {
      await sendVerificationCode(formData.email);
    } catch (err) {
      // Error is handled in context
    }
  };

  const handleVerificationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await verifyCode(verificationCode);
      await register();
    } catch (err) {
      // Error is handled in context
    }
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    dispatch({ type: "UPDATE_FORM_DATA", payload: { field, value } });
    if (localErrors[field]) {
      setLocalErrors({ ...localErrors, [field]: "" });
    }
  };

  const goBackToForm = () => {
    dispatch({ type: "PREV_STEP" });
    setVerificationCode("");
  };

  if (step === "form") {
    return (
      <div>
        <h2>Create Account</h2>
        <form onSubmit={handleFormSubmit}>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            placeholder="Email"
          />
          <br />
          <input
            type="text"
            value={formData.userName}
            onChange={(e) => handleInputChange("userName", e.target.value)}
            placeholder="Username"
          />
          <br />
          <input
            type="password"
            value={formData.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
            placeholder="Password"
          />{" "}
          <br />
          <input
            type="password"
            value={repeatPassword}
            onChange={(e) => {
              setRepeatPassword(e.target.value);
            }}
            placeholder="Repeat password"
          />
          <br />
          <input
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
          />
          <br />
          {error && <div className="error">{error}</div>}
          <button type="submit" disabled={verification.isSending}>
            {verification.isSending ? "Sending Code..." : "Register"}
          </button>
        </form>
        {localErrors.email && (
          <span className="error">{localErrors.email}</span>
        )}{" "}
        <br />
        {localErrors.userName && (
          <span className="error">{localErrors.userName}</span>
        )}
        <br />
        {localErrors.password && (
          <span className="error">{localErrors.password}</span>
        )}
        <br />
        {localErrors.dateOfBirth && (
          <span className="error">{localErrors.dateOfBirth}</span>
        )}
      </div>
    );
  }

  if (step === "verification") {
    return (
      <div>
        <h2>Verify Your Email</h2>
        <p>We sent a verification code to {formData.email}</p>

        <form onSubmit={handleVerificationSubmit}>
          <input
            type="text"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            placeholder="Enter verification code"
            disabled={isLoading}
          />

          {error && <div className="error">{error}</div>}

          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <button type="button" onClick={goBackToForm} disabled={isLoading}>
              Back
            </button>
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Verifying..." : "Verify & Register"}
            </button>
          </div>
        </form>
      </div>
    );
  }

  if (step === "complete") {
    return (
      <div>
        <h2>Registration Complete!</h2>
        <p>You're being logged in automatically...</p>
      </div>
    );
  }

  return null;
}

async function validatePassword(password: string): Promise<string[]> {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push("Passwords must be at least 8 characters.");
  }
  if (!/[!@#$%^&*(),.?":{}|<>_\-\\[\]]/.test(password)) {
    errors.push("Passwords must have at least one non alphanumeric character.");
  }
  if (!/[a-z]/.test(password)) {
    errors.push("Passwords must have at least one lowercase ('a'-'z').");
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("Passwords must have at least one uppercase ('A'-'Z').");
  }

  return errors;
}

export default Registration;
