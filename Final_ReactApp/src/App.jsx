import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "./index.css";
import moodie_logo from "../moodie_logo.png";

// Please put your name and favourite films here so that it shows up in the carousel!
const teamMembers = [
  {
    name: "🎬 Danni",
    films: "Loves Inception and/or Tangled!",
    avatar: "",
  },
  {
    name: "🍿 Lizzie",
    films: "My favourite film is The Royal Tenenbaums but honerable mention to Encanto!",
    avatar: "",
  },
  {
    name: "🎞 Lisa",
    films: "I have too many favourite films so I selected 2 random ones: Avengers Age of Ultron and Disney's Hercules :D",
    avatar: "",
  },
  {
    name: "🎥 Osayi",
    films: "I genuinely can't pick just one — so here are three heavy hitters that I absolutely love 🥰: The Book of Life, Mulan I & II, and Turning Red.",
    avatar: "",
  },
  {
    name: " 🎟️ Gabriella",
    films: "I love Spirited Away, The Blair Witch Project and Texas Chainsaw Massacre! One is very much not like the others 👻 ",
    avatar: "",
  },
  {
    name: " 📽️ Rima",
    films: "My favourite go to movie is Harry Potter and the Philosopher's Stone, also love the Fast and Furious franchise! I know, I know, but I love the action and the cars! 🚗💨",
    avatar: "",
},
];
function App() {
  const [count, setCount] = useState(0);
  const [currentMember, setCurrentMember] = useState(0);
  
  const nextMember = () =>
    setCurrentMember((prev) => (prev + 1) % teamMembers.length);
  const prevMember = () =>
    setCurrentMember((prev) =>
      prev === 0 ? teamMembers.length - 1 : prev - 1
    );

  return (
    <>
     <div className="app-container">
      <header className="header">
        <img src={moodie_logo} className="header-logo" alt="Moodie Logo" />
      <h1>🎬Group 1 Introduction🍿</h1>
      </header>

      <main className="main-content">
        <section className="intro-section">
        <h1>Welcome to Moodie!</h1>
        <h3>
        We're building an app that recommends movies based on your mood and preferences.
        <br />
        It's powered by a fun little quiz 😉
        </h3>
        <button onClick={() => setCount((count) => count + 1)}>
          Count is {count}
        </button>
        </section>
        
        <section className="team-carousel">
        <h2>🎉 Meet the Team 🎉</h2>
          <h3>Here is a quick intro to the team and our favourite film (or two!)</h3>
        <div className="carousel-card">
          <img
          src={teamMembers[currentMember].avatar}
          alt={`${teamMembers[currentMember].name} avatar`}
          className="avatar-img"
          />
          <h3>{teamMembers[currentMember].name}</h3>
          <p>{teamMembers[currentMember].films}</p>
          <div className="carousel-buttons"></div>
          <button onClick={prevMember}>Prev</button>
          <button onClick={nextMember}>Next</button>
        </div>
      </section>
    </main>

    <footer className="footer">
      <p>&copy; 2025 Moodie Movie Picker | Group 1 </p>
    </footer>
     </div>
    </>
  );
}

export default App;
