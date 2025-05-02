import { useEffect } from "react";
import StartMoodieNavbar from "../components/navbar/StartMoodieNavbar";
import Footer from "../components/Footer";
import ChoosePath from "../components/ChoosePath";
import popcornLogo from "../assets/logos/moodie-popcorn.png";

function StartMoodie() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <StartMoodieNavbar />
      <div className="choosepath-page">
        <div className="choosepath-wrapper">
        <img
          src={popcornLogo}
          alt="Moodie Popcorn Logo"
          className="choosepath-popcorn"
        />
        <ChoosePath />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default StartMoodie;
