import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../styles/QuizResults.css";
import StartAgainNavbar from "../components/navbar/StartAgainNavbar";
import Footer from "../components/Footer";
import popcornLogo from "../assets/logos/moodie-popcorn.png";

const API_KEY = "39b6478c947539cc4929cc5746e3fd48";

const QuizResults = ({ quizAnswers }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const movieIdParam = new URLSearchParams(location.search).get("movieId");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);

        if (movieIdParam) {
          const res = await fetch(
            `https://api.themoviedb.org/3/movie/${movieIdParam}?api_key=${API_KEY}&language=en-US`
          );
          const data = await res.json();
          if (data && data.id) {
            setMovies([data]);
          } else {
            setError("Movie not found.");
          }
          return;
        }

        if (!quizAnswers) {
          setError("No quiz data or movie provided.");
          return;
        }

        const genreInput = [quizAnswers.eveningGenre, quizAnswers.endingGenre].join("|");
        const params = new URLSearchParams({
          api_key: API_KEY,
          with_genres: genreInput,
          "primary_release_date.gte": quizAnswers.filmReleaseDate.start,
          "primary_release_date.lte": quizAnswers.filmReleaseDate.end,
          "with_runtime.gte": quizAnswers.runTime,
          "with_runtime.lte": quizAnswers.runTime + 60,
          "with_vote_count.gte": quizAnswers.voteCount,
          include_adult: false,
        });

        const url = `https://api.themoviedb.org/3/discover/movie?${params.toString()}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.results?.length > 0) {
          const shuffled = [...data.results].sort(() => 0.5 - Math.random());
          setMovies(shuffled.slice(0, 1));
        } else {
          setError("No matching movies found. Try adjusting your answers.");
        }
      } catch (err) {
        console.error(err);
        setError("Something went wrong. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [quizAnswers, movieIdParam]);

  return (
    <>
      <StartAgainNavbar />
      <div className="quiz-results-container">
        <img src={popcornLogo} alt="Popcorn" className="popcorn-bg" />
        <h1 className="quiz-results-heading">Moodie Recommends</h1>

        {loading && <p>Loading...</p>}
        {error && <p className="error-message">{error}</p>}

        {movies.map((movie) => (
          <div className="movie-card" key={movie.id}>
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
                <div className="detail-box">N/A</div>
              </div>
              <div className="detail-row">
                <span className="detail-label">Mood Match:</span>
                <div className="detail-box">Humour, Action and Heartwarming</div>
              </div>
              <div className="detail-row synopsis-row">
                <span className="detail-label">Synopsis:</span>
                <div className="detail-box">{movie.overview}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default QuizResults;