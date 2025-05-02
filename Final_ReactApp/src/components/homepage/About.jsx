import React from "react";

const About = () => {
  return (
    <>
      <div id="about-section" className="about-container">
        <h1 className="about-title">About Moodie</h1>
        <div className="about-content-container">
          <div className="about-content">
            <p className="about-text">
              Moodie is a movie recommendation platform designed to help you
              discover a film that fits your current state of mind. It's the
              antidote to endless scrolling on streaming platforms and the
              decision fatigue that comes along with it. Let Moodie help you
              decide what to watch tonight!
            </p>{" "}
            <br />
            <p className="about-text">
              If you want some quick suggestions, try the Random Movie
              Generator. Pick a genre and spin the wheel for a random film
              recommendation. If you'd like a more tailored suggestion, take our
              quiz, and based on your answers, Moodie will recommend
              a film for you to watch.
            </p>{" "}
            <br />
            <p className="about-text">
              "This product uses the TMDB API (The Movie Database API) but is
              not endorsed or certified by TMDB."
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
