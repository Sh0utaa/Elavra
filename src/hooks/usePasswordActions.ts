import { useReducer } from "react";
import {
  initialPasswordState,
  passwordReducer,
} from "../reducers/passwordReducer";
import {
  changePassword,
  sendPasswordResetCode,
  verifyPasswordResetCode,
} from "../services/passwordService";

export function usePasswordHook() {
  const [state, dispatch] = useReducer(passwordReducer, initialPasswordState);

  async function handleSendCode(email: string) {
    if (!validateEmail(email)) {
      return dispatch({
        type: "PASSWORD_ERROR",
        payload: { error: "Invalid email" },
      });
    }

    dispatch({ type: "PASSWORD_INIT", payload: { email: email } });
    await sendPasswordResetCode(email);
    dispatch({ type: "PASSWORD_CODE_SENT" });
    try {
    } catch (error) {
      alert(error);
    }
  }

  async function handleConfrimCode(code: string) {
    try {
      var answer = false;
      if (code.length !== 6) {
        return dispatch({
          type: "PASSWORD_ERROR",
          payload: { error: "incorrect code" },
        });
      }
      if (state.email) {
        answer = await verifyPasswordResetCode(state.email, code);
      }
      if (!answer) {
        console.log(state);
        return dispatch({
          type: "PASSWORD_ERROR",
          payload: { error: "incorrect code" },
        });
      }

      dispatch({
        type: "PASSWORD_SET_CODE",
        payload: { confirmationCode: code },
      });
      dispatch({
        type: "PASSWORD_VERIFY_SUCCESS",
      });
    } catch (error) {}
  }

  async function handlePasswordChange(
    newPassword: string,
    confirmPassword: string
  ) {
    var valid = validatePassword(newPassword);
    if (!valid.status) {
      return dispatch({
        type: "PASSWORD_ERROR",
        payload: { error: valid.message },
      });
    } else if (newPassword !== confirmPassword) {
      return dispatch({
        type: "PASSWORD_ERROR",
        payload: { error: "Passwords don't match" },
      });
    }

    await changePassword(state.email!, newPassword, state.confirmationCode!);
    dispatch({ type: "PASSWORD_SUCCESS" });
    alert("password reset successfull");
    dispatch({ type: "PASSWORD_RESET" });
  }

  return {
    state,
    handleSendCode,
    handleConfrimCode,
    handlePasswordChange,
  };
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

type ValidationResponse = {
  status: boolean;
  message: string;
};

function validatePassword(password: string): ValidationResponse {
  if (password.length < 8) {
    return { status: false, message: "Password must be at least 8 characters" };
  }

  const requirements = [
    { test: /[0-9]/, message: "Password must contain at least one digit" },
    {
      test: /[a-z]/,
      message: "Password must contain at least one lowercase letter",
    },
    {
      test: /[A-Z]/,
      message: "Password must contain at least one uppercase letter",
    },
    {
      test: /[^a-zA-Z0-9]/,
      message: "Password must contain at least one non-alphanumeric character",
    },
  ];

  for (const req of requirements) {
    if (!req.test.test(password)) {
      return { status: false, message: req.message };
    }
  }

  return { status: true, message: "Password is valid" };
}
