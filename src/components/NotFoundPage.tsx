import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div>
      <h1>Page not found</h1>
      <Link to={"/"}>
        <button>Go back Home</button>
      </Link>
    </div>
  );
}
