import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import StartMoodie from "./pages/StartMoodie";
import QuizFlow from "./pages/QuizFlow";
import "./index.css";
import "./App.css";
import ErrorPage from "./pages/ErrorPage";
import ResultsPage from "./pages/ResultsPage";
import RandomRoulette from "./components/Roulette/RandomRoulette";
import GenreRoulette from "./components/Roulette/GenreRoulette";
import QuizResults from "./components/QuizResults";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<Home />} />
        <Route path="/thecreators" element={<Home />} />
        <Route path="/startmoodie" element={<StartMoodie />} />
        <Route path="/quizflow" element={<QuizFlow />} />
        <Route path="/genre" element={<GenreRoulette />} />
        <Route path="/randomise" element={<RandomRoulette />} />
        <Route path="/results" element={<QuizResults />} />

        {/* Catch-all route for unmatched URLs */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
