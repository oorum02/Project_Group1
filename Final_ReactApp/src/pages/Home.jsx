import React, { useState, useEffect } from "react";
import HomeNavbar from "../components/navbar/HomeNavbar";
import "../styles/homepage.css";

import Footer from "../components/Footer"
import Heroes from "../components/Heroes";
import About from "../components/About";
import Creators from "../components/Creators";
import StartMoodieHomeButton from "../components/StartMoodieHomeButton";

function Home() {
   return (
      <>
         <HomeNavbar />
         <Heroes/>
         <About/>
         <StartMoodieHomeButton/>
         <Creators/>
         <Footer/>
      </>
   );
};

export default Home;
