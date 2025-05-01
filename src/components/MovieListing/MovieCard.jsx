import React, { useState, useRef } from "react";
import styles from "./Listmovies.module.css";

const MovieCard = ({ movie, onMouseEnter, onMouseLeave }) => {
  const cardRef = useRef(null);

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`;

  return (
    <div
      ref={cardRef}
      className={styles.movieCard}
      onMouseEnter={() => onMouseEnter(cardRef)}
      onMouseLeave={onMouseLeave}
    >
      <div
        className={styles.moviePoster}
        style={{ backgroundImage: `url(${posterUrl})` }}
      />
    </div>
  );
};

export default MovieCard;
