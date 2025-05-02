import { useEffect } from "react";
import StartMoodieNavbar from "../components/navbar/StartMoodieNavbar";
import Footer from "../components/Footer";
import ChoosePath from "../components/ChoosePath";

function StartMoodie() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <StartMoodieNavbar />
      <ChoosePath />
      <Footer />
    </>
  );
}

export default StartMoodie;
