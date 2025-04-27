import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import '../styles/navbar.css';
import moodieLogo from "../assets/logos/moodie_logo.png"; // Import the logo image

const Navbar = () => {
   const navigate = useNavigate();

   const startMoodie = () => {
      navigate("/startmoodie"); // This takes the user to the Start Moodie page when they press the button
   };

   return (
      <>
         
         <div className="nav-container">
            <img id='moodie-logo' src={moodieLogo} />
            <nav>
               <ul>
                  <li>
                     <Link to="/">Home</Link>
                  </li>
                  <li>
                     <Link to="/about">About</Link>
                  </li>
                  <li>
                     <Link to="/thecreators">The Creators</Link>
                  </li>
                  <button id="start-moodie-btn" onClick={startMoodie}>Start Moodie</button>
               </ul>
            </nav>
         </div>
         
      </>
   );
};

export default Navbar;
