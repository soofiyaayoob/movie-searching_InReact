import React, { useRef, useState,useCallback } from "react";
import { useSelector } from "react-redux";
import MovieDetailOverlay from "../Categorie/MovieDetailOverlay";
import "./Viewall.css"; 
import MovieCard from "../Categorie/MovieCard";

export default function Viewall() {
  const containerRef = useRef(null);
  const movies = useSelector((state) => state.selectedMovies);
  const title = useSelector((state) => state.selectedTitle);
  console.log("Movies in Redux: ", movies);
  const cardRefs = useRef([]);
  cardRefs.current = movies.map((_, i) => cardRefs.current[i] || React.createRef()); // ✅ Add here

  const [hoveredMovie, setHoveredMovie] = useState(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const handleHover = useCallback((movie, cardRef) => {
    const cardRect = cardRef.current?.getBoundingClientRect();
    const parentRect = containerRef.current?.getBoundingClientRect();
  
    if (cardRect && parentRect) {
      setPosition({
        left: cardRect.left - parentRect.left,
        top: cardRect.top - parentRect.top,
      });
      setHoveredMovie(movie);
    }
  }, []);
  
  const handleMouseLeave = useCallback(() => setHoveredMovie(null), []);
  

  return (
    <div ref={containerRef} className="view-all-container">
    <h2 className="view-all-title">{title} </h2>
    <div className="movie-grid">
      {movies.map((movie, index) => (
        <MovieCard
          key={movie.id}
          ref={cardRefs.current[index]}
          movie={movie}
          onMouseEnter={() => handleHover(movie, cardRefs.current[index])}
          onMouseLeave={handleMouseLeave}
        />
      ))}
      {hoveredMovie && (
        <MovieDetailOverlay movie={hoveredMovie} position={position} />
      )}
    </div>
  </div>
  );
}
