import { useReducer } from "react";
import { useAuth } from "../context/AuthContext";
import {
  sendPasswordResetCode,
  verifyPasswordResetCode,
  changePassword,
} from "../services/passwordService";
import {
  passwordReducer,
  initialPasswordState,
} from "../context/passwordReducer";

export function Profile() {
  const { user, logout } = useAuth();
  const [state, dispatch] = useReducer(passwordReducer, initialPasswordState);

  if (!user) {
    return <div>Error: User not found</div>;
  }

  async function handleLogout() {
    await logout();
  }

  async function handleSendCode() {
    try {
      if (user) await sendPasswordResetCode(user.email);
      dispatch({ type: "PASSWORD_CODE_SENT" });
    } catch {
      dispatch({
        type: "PASSWORD_ERROR",
        payload: { error: "Failed to send reset code" },
      });
    }
  }

  async function handleVerifyCode() {
    if (!state.email || !state.confirmationCode) return;
    try {
      const valid = await verifyPasswordResetCode(
        state.email,
        state.confirmationCode
      );
      if (valid) {
        dispatch({ type: "PASSWORD_VERIFY_SUCCESS" });
      } else {
        dispatch({
          type: "PASSWORD_ERROR",
          payload: { error: "Invalid code" },
        });
      }
    } catch {
      dispatch({
        type: "PASSWORD_ERROR",
        payload: { error: "Verification failed" },
      });
    }
  }

  async function handleChangePassword() {
    if (
      !state.email ||
      !state.confirmationCode ||
      !state.newPassword ||
      !state.confirmPassword
    ) {
      return;
    }

    if (state.newPassword !== state.confirmPassword) {
      dispatch({
        type: "PASSWORD_ERROR",
        payload: { error: "Passwords do not match" },
      });
      return;
    }

    try {
      await changePassword(
        state.email,
        state.newPassword,
        state.confirmationCode
      );
      alert("Password changed successfully!");
      dispatch({ type: "PASSWORD_RESET" });
    } catch (err) {
      dispatch({
        type: "PASSWORD_ERROR",
        payload: { error: (err as Error).message },
      });
    }
  }

  return (
    <>
      {state.isResetting ? (
        <>
          <h1>Reset Password</h1>
          {state.error && <p style={{ color: "red" }}>{state.error}</p>}

          {state.step === "request" && (
            <>
              <p>We’ll send a reset code to your email: {user.email}</p>
              <button onClick={handleSendCode}>Send Reset Code</button>
            </>
          )}

          {state.step === "verify" && (
            <>
              <input
                type="text"
                placeholder="Enter confirmation code"
                value={state.confirmationCode ?? ""}
                onChange={(e) =>
                  dispatch({
                    type: "PASSWORD_SET_CODE",
                    payload: { confirmationCode: e.target.value },
                  })
                }
              />
              <br />
              <button onClick={handleVerifyCode}>Verify Code</button>
            </>
          )}

          {state.step === "change" && (
            <>
              <input
                type="password"
                placeholder="New password"
                value={state.newPassword ?? ""}
                onChange={(e) =>
                  dispatch({
                    type: "PASSWORD_UPDATE",
                    payload: {
                      newPassword: e.target.value,
                      confirmPassword: state.confirmPassword ?? "",
                    },
                  })
                }
              />
              <br />
              <input
                type="password"
                placeholder="Confirm password"
                value={state.confirmPassword ?? ""}
                onChange={(e) =>
                  dispatch({
                    type: "PASSWORD_UPDATE",
                    payload: {
                      newPassword: state.newPassword ?? "",
                      confirmPassword: e.target.value,
                    },
                  })
                }
              />
              <br />
              <button onClick={handleChangePassword}>
                Submit New Password
              </button>
            </>
          )}
        </>
      ) : (
        <>
          <h1>Hello, {user.name}</h1>
          <p>Email: {user.email}</p>
          <p>ID: {user.id}</p>
          <button
            onClick={() =>
              dispatch({
                type: "PASSWORD_INIT",
                payload: { email: user.email },
              })
            }
          >
            Change password
          </button>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </>
  );
}
