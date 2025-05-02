import React, { useState, useEffect } from "react";
import '../styles/QuizResults.css'

const API_KEY = "39b6478c947539cc4929cc5746e3fd48"


const QuizResults = ({ quizAnswers }) => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {

        console.log(quizAnswers)

        //combining multiple genre filters
        const genre1 = quizAnswers.eveningGenre;
        const genre2 = quizAnswers.endingGenre;
        const genreInput = [genre1, genre2].join("|")

        console.log(genreInput)
        // Set up parameters that match question filters
        const params = new URLSearchParams({
            api_key: API_KEY,
            with_genres: genreInput, //Genres listed in number codes on TMDB
            "primary_release_date.gte": quizAnswers.filmReleaseDate.start, //Release date range
            "primary_release_date.lte": quizAnswers.filmReleaseDate.end,
            "with_runtime.gte": quizAnswers.runTime, //Runtime upper and lower limits
            "with_runtime.lte": quizAnswers.runTime + 60,
            include_adult: false //Filter to exclude adult content - added standard so results are suitable for groups/age ranges
        });

        console.log(params)


        const url = `https://api.themoviedb.org/3/discover/movie?${params.toString()}`;

         console.log(url)

        // API call with URL that updates based on input params
        const fetchMovies = async () => {
            try {
                setLoading(true);
                const response = await fetch(url);
                const data = await response.json();
        
                if (data.results?.length > 0) {
                  const shuffled = [...data.results].sort(() => 0.5 - Math.random());
                  setMovies(shuffled.slice(0, 1)); // Get 1 random movie
                } else {
                  setError("No matching movies found. Try adjusting your answers.");
                }
              } catch (err) {
                setError("Something went wrong. Please try again later.");
              } finally {
                setLoading(false);
              }
            };        
            console.log(movies)

        fetchMovies();
    }, [quizAnswers]); //Quiz Answers as dependency 

    return (
        <>
           <div className="quiz-results-container fade-in">
      <h1 className="quiz-results-heading">🎬 Your Movie Matches</h1>

      {loading && <p>Loading recommendations...</p>}
      {error && <p className="error-message">{error}</p>}

      <div className="movie-grid">
        {movies.map((movie) => (
          <div className="movie-card" key={movie.id}>
            <img
              className="movie-image"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <div className="movie-stats">
              <h2>{movie.title}</h2>
              <p><strong>Overview:</strong> {movie.overview}</p>
              <p><strong>Release Date:</strong> {movie.release_date}</p>
              <p><strong>Rating:</strong> {movie.vote_average} / 10</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};
export default QuizResults;