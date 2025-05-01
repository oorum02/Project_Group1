import React from "react";
import { Link, useNavigate } from "react-router-dom";
import moodieLogo from "../../assets/logos/moodie_logo.png";
import "../../styles/navbar.css";

const StartAgainNavbar = () => {
  const navigate = useNavigate();

  const handleStartAgain = () => {
    navigate("/startmoodie");
  };

  return (
    <div className="nav-container">
      {/* Logo */}
      <Link to="/" className="logo-link">
        <img id="moodie-logo" src={moodieLogo} alt="Moodie Logo" />
      </Link>

      {/* Navigation Links */}
      <nav>
        <ul>
          <li>
            <Link to="/#hero-section" className="nav-link">Home</Link>
          </li>
          <li>
            <Link to="/#about-section" className="nav-link">About</Link>
          </li>
          <li>
            <Link to="/#creators-section" className="nav-link">The Creators</Link>
          </li>
          <li>
            {/* Reusing existing CSS button style */}
            <button id="start-moodie-btn" onClick={handleStartAgain}>
              Start Again
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default StartAgainNavbar;
