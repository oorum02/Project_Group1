import React, { useEffect, useState } from 'react';
import Spinny from './Spinny'; // Imports the main wheel component

const API_KEY = '577bc4c58ad0efe50eccb22d412606be'; // <-- API key for Gaby's account

function RandomRoulette() {
      //Creates variables which will hold the data for the movies and selected movie.
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  //Runs once when the compenent mounts.
  useEffect(() => {
    //Grabs popular movies from the TMDB APO
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`)
      .then(res => res.json())
      .then(data => {
        //Saves the full list of movie objects
        const movieTitles = data.results.map(movie => movie.title);
        setMovies(data.results); // full objects
      })
      .catch(err => console.error(err));
  }, []);

  //Runs when the wheel stops spinning`and a movie is selected.
  const handleFinished = (selectedTitle) => {
    //Finds the movie object taht was selected.
    const movie = movies.find((m) => m.title === selectedTitle);
    setSelectedMovie(movie);
  };

  return (
    <div style={{ textAlign: 'center', padding: 20 }}>
      <h1>🎬 Spin for a movie!</h1>
      {movies.length > 0 ? (
        <Spinny
          segments={movies.map(movie => movie.title)}
          onFinished={handleFinished}
          primaryColor="#372549"
          contrastColor="#eacdc2"
          buttonText="SPIN"
          size={400}
        />
      ) : (
        <p>Loading movies...</p>
      )}

      {selectedMovie && (
        <div style={{ marginTop: 40 }}>
            {/*Movie Poster`*/ }
          <h2>{selectedMovie.title}</h2>
          <img
            src={`https://image.tmdb.org/t/p/w300${selectedMovie.poster_path}`}
            alt={selectedMovie.title}
            style={{ borderRadius: '10px' }}
          />
            <h3>What's this film about?</h3>
            {/*Movie Overview*/}
          <p style={{ maxWidth: 600, margin: '20px auto' }}>{selectedMovie.overview}</p>
        </div>
      )}
    </div>
  );
}

export default RandomRoulette;