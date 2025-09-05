import { useAuth } from "./context/AuthContext";
import "./css/App.css";

function App() {
  const { logout } = useAuth();

  async function handleLogout() {
    try {
      await logout();
      console.log("Logout successful");
    } catch (error) {
      console.error("Logout failed: ", error);
    }
  }
  return (
    <>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}

export default App;
