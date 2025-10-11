// RegistrationContext.tsx
import {
  createContext,
  useContext,
  useReducer,
  type ReactNode,
  type Dispatch,
} from "react";
import {
  registrationReducer,
  initialRegistrationState,
  type RegistrationState,
  type RegistrationAction,
} from "../reducers/registrationReducer";
import * as registrationService from "../services/registrationService";
import { useAuth } from "./AuthContext";

type RegistrationContextType = RegistrationState & {
  dispatch: Dispatch<RegistrationAction>;
  sendVerificationCode: (email: string) => Promise<void>;
  verifyCode: (code: string) => Promise<void>;
  register: () => Promise<void>;
};

const RegistrationContext = createContext<RegistrationContextType | undefined>(
  undefined
);

export function RegistrationProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(
    registrationReducer,
    initialRegistrationState
  );
  const { login } = useAuth();

  const sendVerificationCode = async (email: string) => {
    dispatch({ type: "SEND_VERIFICATION_CODE_START" });
    try {
      await registrationService.sendVerificationCode(email);
      dispatch({ type: "SEND_VERIFICATION_CODE_SUCCESS" });
    } catch (error) {
      dispatch({
        type: "SEND_VERIFICATION_CODE_ERROR",
        payload: (error as Error).message,
      });
    }
  };

  const verifyCode = async (code: string) => {
    dispatch({ type: "VERIFY_CODE_START" });
    try {
      await registrationService.verifyCode(state.formData.email, code);
      dispatch({ type: "VERIFY_CODE_SUCCESS" });
    } catch (error) {
      dispatch({
        type: "VERIFY_CODE_ERROR",
        payload: (error as Error).message,
      });
    }
  };

  const register = async () => {
    dispatch({ type: "REGISTER_START" });
    try {
      await registrationService.registerUser(state.formData);
      dispatch({ type: "REGISTER_SUCCESS" });

      // Auto-login after successful registration
      await login(state.formData.email, state.formData.password);
    } catch (error) {
      dispatch({
        type: "REGISTER_ERROR",
        payload: (error as Error).message,
      });
    }
  };

  return (
    <RegistrationContext.Provider
      value={{
        ...state,
        dispatch,
        sendVerificationCode,
        verifyCode,
        register,
      }}
    >
      {children}
    </RegistrationContext.Provider>
  );
}

export function useRegistration() {
  const context = useContext(RegistrationContext);
  if (!context) {
    throw new Error("useRegistration must be used within RegistrationProvider");
  }
  return context;
}
