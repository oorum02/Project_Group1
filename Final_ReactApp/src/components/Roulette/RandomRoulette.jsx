import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Spinny from './Spinny';
import '../../styles/RandomRoulette.css';
import Navbar from '../navbar/StartMoodieNavbar';
import Footer from '../Footer';

const API_KEY = '577bc4c58ad0efe50eccb22d412606be';

function RandomRoulette() {
  const { genreId } = useParams();
  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!genreId) return;
    setLoading(true);

    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch movies', err);
        setLoading(false);
      });
  }, [genreId]);

  const handleFinished = (title) => {
    const movie = movies.find((m) => m.title === title);
    if (movie) {
      navigate('/quizresults', { state: { movie } });
    }
  };

  return (
    <div className="roulette-page">
      <Navbar />

      <main className="roulette-main">
        <h1 className="roulette-title">Roulette Mode</h1>

        {loading ? (
          <p className="roulette-loading">Loading movies...</p>
        ) : (
          <Spinny
            segments={movies.map((m) => m.title)}
            onFinished={handleFinished}
            primaryColor="#372549"
            contrastColor="#eacdc2"
            buttonText="SPIN"
            size={420}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default RandomRoulette;
