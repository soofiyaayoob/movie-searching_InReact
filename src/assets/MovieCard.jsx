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
        <div>
          <img src={posterUrl} alt="Poster" />

          <div className={styles.overlayButtons}>
            <button className={styles.watchNow}>▶ Watch Now</button>
            <button className={styles.addWatchlist} title="Add to Watchlist">
              +
            </button>
          </div>

          <div className={styles.movieInfo} style={{display:"none"}}>
            <span className={styles.infoInline}>{movie.title}</span> •
            <span className={styles.infoInline}>
              {(movie.release_date || "").slice(0, 4)}
            </span>{" "}
            •
            <span className={styles.infoInline}>
              {movie.runtime
                ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`
                : "Duration"}
            </span>{" "}
            •
            <span className={styles.infoInline}>
              {movie.original_language.toUpperCase()}
            </span>{" "}
            •
            <span className={styles.infoInline}>
              {movie.genres?.[0]?.name || "Genre"}
            </span>
          </div>

          <p className={styles.overview}>{movie.overview.slice(0, 100)}...</p>
        </div>
      )}
    </div>
  );
}
