import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../Footer';
import popcornLogo from '../../assets/logos/moodie-popcorn.png';

const API_KEY = '577bc4c58ad0efe50eccb22d412606be';

const genreIcons = {
  Action: '🔥',
  Adventure: '🧭',
  Animation: '🎨',
  Comedy: '😂',
  Crime: '🕵️‍♂️',
  Documentary: '📚',
  Drama: '🎭',
  Family: '👨‍👩‍👧',
  Fantasy: '🧙‍♂️',
  History: '📜',
  Horror: '👻',
  Music: '🎵',
  Mystery: '🕵️',
  Romance: '❤️',
  'Science Fiction': '🚀',
  'TV Movie': '📺',
  Thriller: '🔪',
  War: '⚔️',
  Western: '🤠',
};

function GenreRoulette() {
  const [genres, setGenres] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`)
      .then((res) => res.json())
      .then((data) => setGenres(data.genres))
      .catch((err) => console.error('Failed to fetch genres', err));
  }, []);

  const handleGenreClick = (id) => {
    navigate(`/roulette/${id}`);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(to bottom right, var(--muted-mauve), var(--vintage-rose))',
        color: 'var(--soft-beige)',
        position: 'relative',
      }}
    >
      <Navbar />

      {/* Popcorn logo top-left */}
      <img
        src={popcornLogo}
        alt="Moodie Popcorn Logo"
        style={{
          position: 'absolute',
          top: '1rem',
          left: '1rem',
          width: '50px',
          height: '50px',
          objectFit: 'contain',
          zIndex: 10,
        }}
      />

      <main
        style={{
          flexGrow: 1,
          padding: '3rem 1rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '2rem' }}>
          Choose a genre
        </h1>

        {/* Genre container - strictly 5 columns */}
        <div
          style={{
            backgroundColor: 'var(--deep-plum)',
            borderRadius: '1rem',
            border: '1px solid var(--soft-beige)',
            padding: '2.5rem',
            width: '100%',
            maxWidth: '1100px',
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '2rem',
            justifyItems: 'center',
          }}
        >
          {genres.map((genre) => (
            <div key={genre.id} style={{ textAlign: 'center' }}>
              <button
                onClick={() => handleGenreClick(genre.id)}
                style={{
                  backgroundColor: 'var(--soft-beige)',
                  color: 'var(--deep-plum)',
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  border: 'none',
                  fontSize: '1.8rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 0.5rem',
                  transition: 'transform 0.2s ease',
                }}
                onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
                onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              >
                {genreIcons[genre.name] || '🎬'}
              </button>
              <div style={{ fontWeight: 'bold', fontSize: '1rem' }}>
                {genre.name === 'Science Fiction' ? 'Sci-Fi' : genre.name}
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default GenreRoulette;