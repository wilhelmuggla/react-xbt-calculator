import React  from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import logo from "../logo.png";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="container">
      <nav className="navbar navbar-light justify-content-between">
        <Link to="/" className="navbar-brand">
          <img src={logo} alt="logo" className="d-inline-block align-top" />
          XBT Calculator
        </Link>
        <div className="form-inline">
          <Link to="/settings">
          <FontAwesomeIcon icon={faCog} />
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Header;
