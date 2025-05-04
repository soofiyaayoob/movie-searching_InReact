import React, { forwardRef } from "react";
import styles from "./Listmovies.module.css";


   




const MovieCard = forwardRef(({ movie, onMouseEnter, onMouseLeave }, ref) => {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`;

  return (
    <div
      ref={ref}
      className={styles.movieCard}
      onMouseOver={() => onMouseEnter(ref)}
      onMouseOut={onMouseLeave}
    >
      <div
        className={styles.moviePoster}
        style={{ backgroundImage: `url(${posterUrl})` }}
      />
    </div>
  );
});

export default React.memo(MovieCard);  
