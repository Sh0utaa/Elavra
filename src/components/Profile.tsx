import { useAuth } from "../context/AuthContext";

export function Profile() {
  const { user, logout } = useAuth();

  if (!user) {
    return <div>Error: User not found</div>;
  }

  async function handleLogout() {
    await logout();
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
