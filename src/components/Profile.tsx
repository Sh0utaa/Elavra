import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user, logout } = useAuth();

  return (
    <>
      <h1>PROFILE</h1>
      <p>{user?.id}</p>
      <p>{user?.name}</p>
      <p>{user?.email}</p>
      <a href="/change-password">change password</a>
      <br />
      <br />
      <button onClick={logout}>logout</button>
    </>
  );
}
