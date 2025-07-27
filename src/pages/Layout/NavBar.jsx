import { Link } from "react-router-dom";
import "./Layout.css";

export default function NavBar() {
  return (
    <div className="navBar">
      <Link to="/get" className="navLink">
        <p className="navLink">
          <b>Get Pokemon</b>
        </p>
      </Link>

      <Link to="/" className="navLink">
        <h2>Surprise Party</h2>
      </Link>


     <Link to="/view" className="navLink">
        <p>
            <b>View Pokemon</b>
        </p>
     </Link>
    </div>
  );
}
