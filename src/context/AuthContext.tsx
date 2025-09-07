import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  type Dispatch,
  type ReactNode,
} from "react";
import {
  initialAuthState,
  authReducer,
  type AuthAction,
  type AuthState,
} from "./authReducer";
import * as authService from "../services/authService";

type AuthContextType = AuthState & {
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  validateUser: () => Promise<void>;
  dispatch: Dispatch<AuthAction>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  async function login(email: string, password: string) {
    dispatch({ type: "LOGIN_START" });
    try {
      await authService.loginRequest(email, password);
      const user = await authService.validateUser();
      localStorage.setItem("user", JSON.stringify(user));
      dispatch({ type: "LOGIN_SUCCESS", payload: user });
      return true;
    } catch (error) {
      dispatch({
        type: "LOGIN_ERROR",
        payload: (error as Error).message,
      });
      return false;
    }
  }

  async function logout() {
    await authService.logoutRequest();
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
  }

  async function validateUser() {
    dispatch({ type: "VALIDATION_START" });
    try {
      const user = await authService.validateUser();
      dispatch({ type: "VALIDATION_SUCCESS", payload: user });
    } catch (error) {
      dispatch({
        type: "VALIDATION_ERROR",
        payload: "User couldn't be verified. Please log in again.",
      });
    }
  }

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      dispatch({ type: "LOGIN_SUCCESS", payload: JSON.parse(savedUser) });
    } else {
      validateUser();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        validateUser,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
