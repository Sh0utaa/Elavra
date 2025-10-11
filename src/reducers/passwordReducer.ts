// passwordReducer.ts
export type ResetPasswordState = {
  isResetting: boolean;
  step: "request" | "verify" | "change";
  email: string | null;
  confirmationCode: string | null;
  newPassword: string | null;
  confirmPassword: string | null;
  error: string | null;
  success: string | null;
};

export type PasswordAction =
  | { type: "PASSWORD_INIT"; payload: { email: string } }
  | { type: "PASSWORD_CODE_SENT" }
  | { type: "PASSWORD_SET_CODE"; payload: { confirmationCode: string } }
  | { type: "PASSWORD_VERIFY_SUCCESS" }
  | {
      type: "PASSWORD_SUCCESS";
    }
  | { type: "PASSWORD_ERROR"; payload: { error: string } }
  | { type: "PASSWORD_RESET" };

export const initialPasswordState: ResetPasswordState = {
  isResetting: false,
  step: "request",
  email: null,
  confirmationCode: null,
  newPassword: null,
  confirmPassword: null,
  error: null,
  success: null,
};

export function passwordReducer(
  state: ResetPasswordState,
  action: PasswordAction
): ResetPasswordState {
  switch (action.type) {
    case "PASSWORD_INIT":
      return {
        ...state,
        isResetting: true,
        step: "request",
        email: action.payload.email,
        error: null,
      };
    case "PASSWORD_CODE_SENT":
      return { ...state, step: "verify", error: null };
    case "PASSWORD_SET_CODE":
      return { ...state, confirmationCode: action.payload.confirmationCode };
    case "PASSWORD_VERIFY_SUCCESS":
      return { ...state, step: "change", error: null };
    case "PASSWORD_SUCCESS":
      return {
        ...state,
        success: "password reset successfully",
      };
    case "PASSWORD_ERROR":
      return { ...state, error: action.payload.error };
    case "PASSWORD_RESET":
      return initialPasswordState;
    default:
      return state;
  }
}
