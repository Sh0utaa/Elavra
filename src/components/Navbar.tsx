import classes from "../css/navbar.module.css";

export default function Navbar() {
  return (
    <>
      <div className={`${classes.navbarContainer}`}>
        <a href="/">Home</a>
      </div>
    </>
  );
}
