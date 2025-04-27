import React from "react";
import StartMoodieNavbar from "../components/navbar/StartMoodieNavbar.jsx"
import Footer from "../components/Footer.jsx"
import ChoosePath from "../components/ChoosePath.jsx";

function StartMoodie() {
   return (
      <>
         <StartMoodieNavbar />
         <ChoosePath/>
         <Footer/>
      </>
   );
};

export default StartMoodie;
