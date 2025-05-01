import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import MovieDetailOverlay from "../MovieListing/MovieDetailOverlay"; 
import  "./Viewall.css"; 

export default function Viewall() {
  const containerRef = useRef(null);
  const movies = useSelector((state) => state.selectedMovies);
  const title = useSelector((state) => state.selectedTitle);

  const [hoveredMovie, setHoveredMovie] = useState(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  // Create a ref for each movie
  const movieRefs = useRef(movies.map(() => React.createRef()));

  const handleMouseEnter = (movie, index) => {
    const cardRect = movieRefs.current[index].current.getBoundingClientRect();
    const parentRect = containerRef.current.getBoundingClientRect();

    setPosition({
      left: cardRect.left - parentRect.left,
      top: cardRect.top - parentRect.top,
    });

    setHoveredMovie(movie);
  };

  const handleMouseLeave = () => {
    setHoveredMovie(null);
  };

  return (
    <div ref={containerRef}>
      <h2>{title} - All Movies</h2>
      <div className="movie-grid">
        {movies.map((movie, index) => {
          const posterUrl = movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`;

          return (
            <div
              key={movie.id}
              ref={movieRefs.current[index]} // Assign unique ref for each movie
              className="movie-card"
              onMouseEnter={() => handleMouseEnter(movie, index)}
              onMouseLeave={handleMouseLeave}
            >
              <img src={posterUrl} alt={movie.title || movie.name} />
              <p>{movie.title || movie.name}</p>
            </div>
          );
        })}
        {hoveredMovie && (
          <MovieDetailOverlay movie={hoveredMovie} position={position} />
        )}
      </div>
    </div>
  );
}
