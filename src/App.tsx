import { Link } from "react-router-dom";
import "./css/App.css";

function App() {
  return (
    <>
      <h1>Hello</h1>
      <Link to={"/exam"}>Start exam</Link>
    </>
  );
}

export default App;
