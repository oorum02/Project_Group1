import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Spinny from "./Spinny";
import "../../styles/RandomRoulette.css";
import StartAgainNavbar from "../navbar/StartAgainNavbar";
import Footer from "../Footer";

const API_KEY = "577bc4c58ad0efe50eccb22d412606be";

function RandomRoulette() {
  const location = useLocation();
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const genreParam = new URLSearchParams(location.search).get("genre");

  useEffect(() => {
    if (!genreParam) return;

    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=${genreParam}&page=1`
    )
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.results.filter((movie) => movie.title && movie.poster_path);
        setMovies(filtered.slice(0, 20)); // Limit to 20 top results
      })
      .catch((err) => console.error("Failed to fetch movies", err));
  }, [genreParam]);

  const handleFinished = (title) => {
    const movie = movies.find((m) => m.title === title);
    if (movie) {
      setSelectedMovie(movie);
      navigate(`/results?movieId=${movie.id}`);
    }
  };

  return (
    <>
      <StartAgainNavbar />
      <div className="roulette-page">
        {!genreParam ? (
          <p style={{ textAlign: "center", color: "red" }}>No genre selected.</p>
        ) : (
          <>
            <h1 className="roulette-heading">Roulette Mode</h1>
            {movies.length > 0 ? (
              <Spinny
                segments={movies.map((movie) => movie.title)}
                onFinished={handleFinished}
                primaryColor="#372549"
                contrastColor="#eacdc2"
                buttonText="SPIN"
                size={500}
              />
            ) : (
              <p className="loading-msg">Loading movies...</p>
            )}
          </>
        )}
      </div>
      <Footer />
    </>
  );
}

export default RandomRoulette;
