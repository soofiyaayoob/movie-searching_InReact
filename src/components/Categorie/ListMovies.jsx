import React, { useState, useRef ,useCallback} from "react";
import { useQuery } from "@tanstack/react-query";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import MovieCard from "./MovieCard";
import MovieDetailOverlay from "./MovieDetailOverlay";
import styles from "./Listmovies.module.css";
import { useNavigate } from "react-router-dom"; 
import { useDispatch } from "react-redux";
import { setSelectedMovies } from "../../redux/actions";

const fetchTrendingMovies = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  return data.results;
};

export default function ListMovies({ title, fetchUrl }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const [hoveredMovie, setHoveredMovie] = useState(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const { data = [], isLoading, error } = useQuery({
    queryKey: [title],
    queryFn: () => fetchTrendingMovies(fetchUrl),
  });

  const movieRefs = useRef([]);

  const handleCardHover = useCallback((movie, index) => {
    const cardRef = movieRefs.current[index];
    if (!cardRef?.current || !scrollRef.current) return;
  
    const cardRect = cardRef.current.getBoundingClientRect();
    const parentRect = scrollRef.current.getBoundingClientRect();
  
    setPosition({
      left: cardRect.left - parentRect.left - 50,
      top: cardRect.top - parentRect.top,
    });
  
    setHoveredMovie(movie);
  }, []);
  
  const handleMouseLeave = useCallback(() => {
    setHoveredMovie(null);
  }, []);
  const handleViewAllClick = () => {
    dispatch(setSelectedMovies(data, title));
    navigate("/view-all");
  };

 
  movieRefs.current = data.map((_, i) => movieRefs.current[i] || React.createRef());

  return (
    <div className={styles.listMoviesContainer}>
      <div className={styles.listMoviesHeader}>
        <h1>{title}</h1>
        <span className={styles.viewAll} onClick={handleViewAllClick}>View all</span>
      </div>

      <div className={styles.movieCardsSlider}>
        <IoIosArrowBack
          className={`${styles.arrowIcon} ${styles.arrowIconLeft}`}
          onClick={() => scrollRef.current?.scrollBy({ left: -700, behavior: "smooth" })}
        />

        <div className={styles.sliderViewport}>
          <div className={styles.movieCardWrapper} ref={scrollRef}>
            {data.map((movie, index) => (
              <MovieCard
                key={movie.id}
                ref={movieRefs.current[index]}
                movie={movie}
                onMouseEnter={() => handleCardHover(movie, index)}
                onMouseLeave={handleMouseLeave}
              />
            ))}
          </div>
        </div>

        <IoIosArrowForward
          className={`${styles.arrowIcon} ${styles.arrowIconRight}`}
          onClick={() => scrollRef.current?.scrollBy({ left: 700, behavior: "smooth" })}
        />
      </div>

      {hoveredMovie && (
        <MovieDetailOverlay movie={hoveredMovie} position={position} />
      )}
    </div>
  );
}
