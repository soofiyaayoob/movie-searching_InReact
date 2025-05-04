import React from "react";
import styles from "./Listmovies.module.css";
import { addToWatchlist } from "../../redux/actions"; 
import { useNavigate } from "react-router-dom"; 
import { useDispatch, useSelector } from "react-redux";

const MovieDetailOverlay = ({ movie, position }) => {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const watchlist = useSelector((state) => state.watchlist);

  const handleWatchNow = () => {
    if (!user) {
      navigate("/profile");
      return;
    }
    navigate("/player");
  };

  const handleAddToWatchlist = () => {
    if (!user) {
      navigate("/profile");
      return;
    }

    const alreadyAdded = watchlist.some((m) => m.id === movie.id);
    if (alreadyAdded) {
      alert("Movie is already in your watchlist!");
      return;
    }

    dispatch(addToWatchlist(movie));
    alert("Movie added to your watchlist!");
  };

  const isInWatchlist = watchlist.some((m) => m.id === movie.id);

  return (
    <div
      className={styles.movieDetailOverlay}
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
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
        <button className={styles.watchNow} onClick={handleWatchNow}>
          ▶ Watch Now
        </button>
        <button
          className={styles.addWatchlist}
          onClick={handleAddToWatchlist}
          disabled={isInWatchlist}
        >
          {isInWatchlist ? "✔" : "+"}
        </button>
      </div>
    </div>
  );
};

export default MovieDetailOverlay;
