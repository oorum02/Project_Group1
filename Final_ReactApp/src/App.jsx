import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import StartMoodie from "./pages/StartMoodie";
import QuizFlow from "./pages/QuizFlow";
import Randomise from "./pages/Randomise";
import ResultsPage from "./pages/ResultsPage";
import ErrorPage from "./pages/ErrorPage";
import RandomRoulette from "./components/Roulette/RandomRoulette";
import QuizResults from "./components/QuizResults";

import "./index.css";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<Home />} />
        <Route path="/thecreators" element={<Home />} />
        <Route path="/startmoodie" element={<StartMoodie />} />
        <Route path="/quizflow" element={<QuizFlow />} />
        <Route path="/randomise" element={<Randomise />} />
        <Route path="/roulette/:genreId" element={<RandomRoulette />} />
        <Route path="/quizresults" element={<QuizResults />} /> {/* ✅ FIXED */}
        <Route path="/results" element={<ResultsPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
