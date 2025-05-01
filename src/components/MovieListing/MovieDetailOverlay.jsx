import React from "react";
import styles from "./Listmovies.module.css";

const MovieDetailOverlay = ({ movie, position }) => {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`;

  return (
    <div
      className={styles.movieDetailOverlay}
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        // width: `${position.width}px`,
      }}
    >
      <div className={styles.overlayContent}>
        <img
          src={posterUrl}
          alt={movie.title}
          className={styles.posterImage}
        />
        <div className={styles.movieInfo}>
          <h3 className={styles.movieTitle}>{movie.title}</h3>
          <div className={styles.movieMeta}>
            <span>{(movie.release_date || "").slice(0, 4)}</span> •
            <span>
              {movie.runtime
                ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`
                : "Duration"}
            </span> •
            <span>{movie.original_language.toUpperCase()}</span> •
            <span>{movie.genres?.[0]?.name || "Genre"}</span>
          </div>

          <p className={styles.movieOverview}>
            {movie.overview.slice(0, 150)}{movie.overview.length > 150 ? "..." : ""}
          </p>
        </div>
      </div>

      <div className={styles.actionButtons}>
        <button className={styles.watchNow}>▶ Watch Now</button>
        <button className={styles.addWatchlist}>+</button>
      </div>
    </div>
  );
};

export default MovieDetailOverlay;
