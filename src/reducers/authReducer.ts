export type User = {
  id: string;
  name: string;
  email: string;
};

export type AuthState = {
  user: User | null;
  loading: boolean;
  error: string | null;
  isInitialized: boolean;
};

export type AuthAction =
  | { type: "LOGIN_START" }
  | { type: "LOGIN_SUCCESS"; payload: User }
  | { type: "LOGIN_ERROR"; payload: string }
  | { type: "LOGOUT" }
  | { type: "VALIDATION_START" }
  | { type: "VALIDATION_SUCCESS"; payload: User }
  | { type: "VALIDATION_ERROR"; payload: string };

export const initialAuthState: AuthState = {
  user: null,
  loading: false,
  error: null,
  isInitialized: false,
};

export function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "LOGIN_START":
    case "VALIDATION_START":
      return { ...state, loading: true, error: null };

    case "LOGIN_SUCCESS":
    case "VALIDATION_SUCCESS":
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: null,
        isInitialized: true,
      };

    case "LOGIN_ERROR":
    case "VALIDATION_ERROR":
      return {
        ...state,
        loading: false,
        user: null,
        error: action.payload,
        isInitialized: false,
      };

    case "LOGOUT":
      return {
        ...state,
        user: null,
        loading: false,
        error: null,
        isInitialized: false,
      };

    default:
      return state;
  }
}
