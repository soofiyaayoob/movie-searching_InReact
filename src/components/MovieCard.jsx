import React, { useState } from "react";
import styles from "../css/Listmovies.module.css";

export default function MovieCard({ movie }) {
  const [hovered, setHovered] = useState(false);
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`;

  return (
    <div
      className={styles.movieCard}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={styles.moviePoster}
        style={{ backgroundImage: `url(${posterUrl})` }}
      />

      {hovered && (
        <div className={styles.movieDetails}>
          <div className={styles.movieActions}>
            <button className={styles.watchButton}>Watch Now</button>
            <button className={styles.addButton}>+</button>
          </div>
          <div className={styles.movieDescription}>{movie.overview}</div>
        </div>
      )}
    </div>
  );
}
