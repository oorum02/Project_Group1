import React from "react";
import { useLocation } from "react-router-dom";
import "../styles/QuizResults.css";
import StartAgainNavbar from "../components/navbar/StartAgainNavbar";
import Footer from "../components/Footer";

const QuizResults = () => {
  const location = useLocation();
  const movie = location.state?.movie;

  return (
    <>
      <StartAgainNavbar />
      <div className="quiz-results-container">
        <h1 className="quiz-results-heading">Moodie Recommends</h1>

        {movie ? (
          <div className="movie-card">
            <img
              className="movie-image"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />

            <div className="movie-details">
              <div className="detail-row">
                <span className="detail-label">Title:</span>
                <div className="detail-box">{movie.title}</div>
              </div>
              <div className="detail-row">
                <span className="detail-label">Genre:</span>
                <div className="detail-box">{movie.genre || "N/A"}</div>
              </div>
              <div className="detail-row">
                <span className="detail-label">Mood Match:</span>
                <div className="detail-box">Humour, Action and Heartwarming</div>
              </div>
              <div className="detail-row">
                <span className="detail-label">Synopsis:</span>
                <div className="detail-box">{movie.overview}</div>
              </div>
            </div>
          </div>
        ) : (
          <p style={{ color: "var(--soft-beige)" }}>No movie found.</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default QuizResults;