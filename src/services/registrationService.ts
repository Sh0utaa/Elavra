const api = import.meta.env.VITE_BACKEND_API;

export async function sendVerificationCode(email: string): Promise<void> {
  const res = await fetch(`${api}/email/send-verification-code`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || "Failed to send verification code");
  }
}

export async function verifyCode(email: string, code: string): Promise<void> {
  const res = await fetch(`${api}/email/verify-code`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, code }),
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || "Invalid verification code");
  }
}

export async function registerUser(userData: {
  userName: string;
  dateOfBirth: string;
  email: string;
  password: string;
}): Promise<void> {
  const res = await fetch(`${api}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || "Registration failed");
  }
}
