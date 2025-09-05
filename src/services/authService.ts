import type { User } from "../context/authReducer";

const api = import.meta.env.VITE_BACKEND_API;

export async function loginRequest(email: string, password: string) {
  const res = await fetch(`${api}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || "Login failed");
  }

  return res.json();
}

export async function logoutRequest() {
  const res = await fetch(`${api}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) throw new Error("Logout failed");

  return res;
}

export async function validateUser(): Promise<User> {
  const res = await fetch(`${api}/auth/get-current-user`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || "Validation failed");
  }

  const apiResponse = await res.json();

  return {
    id: apiResponse.userId,
    name: apiResponse.name,
    email: apiResponse.email,
  };
}
