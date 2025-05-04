import React, { useState, useRef } from 'react';
import MovieDetailOverlay from './MovieDetailOverlay';
// Replace with actual CSS module or styles import if needed
import styles from './ListMovies.module.css'; // <-- Add correct path if using CSS modules

function MovieCard({ movie }) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const overlayRef = useRef(null);
const timout=useRef(null);


  const handleCardEnter=()=>{
    timout.current=setTimeout(()=>{
    setIsHovered(true);
   },200)
  }


  const handleCardLeave = (e) => {
   
    
    clearTimeout(timout.current);
    setIsHovered(false);
  };
  

 

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`;

  return (
    <div
      ref={cardRef}
      className={styles.movieCard}
      onMouseEnter={handleCardEnter}
      onMouseLeave={handleCardLeave}
    >
      <div
        className={styles.moviePoster}
        style={{ backgroundImage: `url(${posterUrl})` }}
      />

      {isHovered && (
        <div
         
        >
          <MovieDetailOverlay movie={movie} />
        </div>
      )}
    </div>
  );
}

export default React.memo(MovieCard);
