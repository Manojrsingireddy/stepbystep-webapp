import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoePrints } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="bg-blue-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-semibold no-underline">
          <FontAwesomeIcon icon={faShoePrints} /> Step By Step
        </Link>
        <div className="space-x-4">
          {/* Add any navigation links here */}
          {/* <Link to="/" className="text-teal-300 hover:text-teal-100">Home</Link> */}
          <Link to="/login" className="text-teal-300 hover:text-teal-100">
            Login/Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
