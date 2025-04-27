import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import moodieLogo from "../../assets/logos/moodie_logo.png";
import '../../styles/navbar.css';

const HomeNavbar = () => {
   const navigate = useNavigate();

   const startMoodie = () => {
      navigate("/startmoodie"); // This takes the user to the Start Moodie page when they press the button
   };
   return (
      <>
         <div className="nav-container">
            <Link to="/">
               <img id="moodie-logo" src={moodieLogo} />
            </Link>
            <nav>
               <ul>
                  <li>
                     <a href="#heroes" className="nav-link">Home</a>
                  </li>
                  <li>
                     <a href="#about" className="nav-link">About</a>
                  </li>
                  <li>
                     <a href="#creators" className="nav-link">The Creators</a>
                  </li>
                  <button id="start-moodie-btn" onClick={startMoodie}>
                     Start Moodie
                  </button>
               </ul>
            </nav>
         </div>
      </>
   );
};

export default HomeNavbar;
