const api = import.meta.env.VITE_BACKEND_API;

export async function sendPasswordResetCode(email: string): Promise<void> {
  try {
    const res = await fetch(`${api}/email/send-password-reset-code`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText || "Failed to send reset code");
    }
  } catch (error) {
    console.error("sendPasswordResetCode error:", error);
    throw error;
  }
}

export async function verifyPasswordResetCode(
  email: string,
  code: string
): Promise<boolean> {
  try {
    const res = await fetch(`${api}/email/verify-password-reset-code`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, code }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText || "Failed to verify reset code");
    }

    // assuming API returns JSON like { valid: true/false }
    const data = await res.json();
    return data.isValid;
  } catch (error) {
    console.error("verifyPasswordResetCode error:", error);
    throw error;
  }
}

export async function changePassword(
  email: string,
  newPassword: string,
  code: string
): Promise<void> {
  try {
    const res = await fetch(`${api}/auth/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, code, newPassword }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText || "Failed to change password");
    }
  } catch (error) {
    console.error("changePassword error:", error);
    throw error;
  }
}
