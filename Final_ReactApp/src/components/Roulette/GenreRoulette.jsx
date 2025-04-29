import React, { useEffect, useState } from 'react';
import Spinny from './Spinny'; // Imports the main wheel component

const API_KEY = '577bc4c58ad0efe50eccb22d412606be'; // <-- API key for Gaby's account

function GenreSpinny() {
  //Creates variables which will hold the data for the genres, selected genre, movies, and selected movie.
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState(null); // genre ID
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
  
    // Fetch genres when app loads
    useEffect(() => {
      fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`)
        .then(res => res.json())
        .then(data => setGenres(data.genres))
        .catch(err => console.error('Failed to fetch genres', err));
    }, []);
  
    // Fetch movies for selected genre
    useEffect(() => {
      if (!selectedGenre) return;
      fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${selectedGenre}`)
        .then(res => res.json())
        .then(data => {
          setMovies(data.results);
          setSelectedMovie(null); // Reset winner
        })
        .catch(err => console.error('Failed to fetch movies', err));
    }, [selectedGenre]);
  
    // Called after wheel stops spinning
    const handleFinished = (title) => {
      const movie = movies.find((m) => m.title === title);
      setSelectedMovie(movie);
    };
  
    return (
      <div style={{ textAlign: 'center', padding: 20 }}>
        <h1>🎬 Choose a Genre...</h1>
  
        {/* Genre buttons */}
        <div style={{ marginBottom: 30, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px' }}>
          {genres.map((genre) => (
            <button
              key={genre.id}
              onClick={() => setSelectedGenre(genre.id)}
              style={{
                padding: '10px 15px',
                borderRadius: '20px',
                border: '1px solid #999',
                backgroundColor: selectedGenre === genre.id ? '#372549' : '#eacdc2',
                color: selectedGenre === genre.id ? '#fff' : '#333',
                cursor: 'pointer',
                fontWeight: 'bold',
              }}
            >
              {genre.name}
            </button>
          ))}
        </div>
  
        {/* Wheel appears only after genre is selected */}
        {movies.length > 0 ? (
          <Spinny
            segments={movies.map((movie) => movie.title)}
            onFinished={handleFinished}
            primaryColor="#372549"
            contrastColor="#eacdc2"
            buttonText="SPIN"
            size={400}
          />
        ) : (
          selectedGenre && <p>Loading movies...</p>
        )}
  
        {/* Winner display */}
        {selectedMovie && (
          <div style={{ marginTop: 40 }}>
            <h2>{selectedMovie.title}</h2>
            <img
              src={`https://image.tmdb.org/t/p/w300${selectedMovie.poster_path}`}
              alt={selectedMovie.title}
              style={{ borderRadius: '10px' }}
            />
            <p style={{ maxWidth: 600, margin: '20px auto' }}>{selectedMovie.overview}</p>
          </div>
        )}
      </div>
    );
  }
  
  export default GenreSpinny;