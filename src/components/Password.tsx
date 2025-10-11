import { useState } from "react";
import { usePasswordHook } from "../hooks/usePasswordActions";

export default function Password() {
  const { state, handleSendCode, handleConfrimCode, handlePasswordChange } =
    usePasswordHook();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <>
      {state.step === "request" && (
        <div>
          <h1>Request state</h1>
          <input
            type="email"
            placeholder="your email @"
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <button onClick={() => handleSendCode(email)}>
            send verification code
          </button>
        </div>
      )}
      {state.step === "verify" && (
        <div>
          <h1>Verification State</h1>
          <input
            type="number"
            maxLength={6}
            pattern="[0-9]*"
            inputMode="numeric"
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
          />
          <br />
          <button
            disabled={code.length !== 6}
            onClick={() => handleConfrimCode(code)}
          >
            Confirm
          </button>
        </div>
      )}
      {state.step === "change" && (
        <div>
          <h1>Change Password State</h1>
          <input
            type="text"
            placeholder="new password"
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <br />
          <input
            type="text"
            placeholder="repeat password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <br />
          <button
            onClick={() => handlePasswordChange(newPassword, confirmPassword)}
          >
            Change
          </button>
        </div>
      )}

      {state.error != null && <p>{state.error}</p>}
      {state.success != null && <p>{state.success}</p>}
    </>
  );
}
