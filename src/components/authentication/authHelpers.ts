import { useEffect, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

// Authentication Response interface
export interface AuthResponse {
  status: boolean;
  message: string;
}

// Generic forms input handler
export function handleInputChange<T>(
  e: ChangeEvent<HTMLInputElement>,
  setState: React.Dispatch<React.SetStateAction<T>>
) {
  const { name, value } = e.target;
  setState((prev) => ({ ...prev, [name]: value }));
}

// Custom redirection hook
export function useRedirect(condition: boolean, path: string, delay = 1200) {
  const navigate = useNavigate();

  useEffect(() => {
    if (condition) {
      const timer = setTimeout(() => {
        navigate(path);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [condition, path, delay, navigate]);
}
