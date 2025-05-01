import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Spinny from './Spinny';
import Navbar from '../navbar/StartMoodieNavbar';
import Footer from '../Footer';

const API_KEY = '577bc4c58ad0efe50eccb22d412606be';

function RandomRoulette() {
  const { genreId } = useParams();
  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (!genreId) return;

    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
      })
      .catch((err) => console.error('Failed to fetch movies', err));
  }, [genreId]);

  const handleFinished = (title) => {
    const movie = movies.find((m) => m.title === title);
    if (movie) {
      navigate('/quizresults', { state: { movie } });
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <main
        style={{
          flexGrow: 1,
          textAlign: 'center',
          padding: '2rem 1rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h1 style={{ fontSize: '2rem', marginBottom: '2rem' }}> Spin for a Movie</h1>

        {movies.length > 0 ? (
          <Spinny
            segments={movies.map((m) => m.title)}
            onFinished={handleFinished}
            primaryColor="#372549"
            contrastColor="#eacdc2"
            buttonText="SPIN"
            size={400}
          />
        ) : (
          <p>Loading movies...</p>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default RandomRoulette;
