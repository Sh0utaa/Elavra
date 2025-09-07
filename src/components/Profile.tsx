import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function Profile() {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    navigate("/auth/login", { replace: true });
    return null;
  }

  async function handleLogout() {
    await logout();
    navigate("/", { replace: true });
  }

  return (
    <>
      <h1>Hello, {user.name}</h1>
      <p>Email: {user.email}</p>
      <p>ID: {user.id}</p>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}
