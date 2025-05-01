import React, { useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import MovieCard from "./MovieCard";
import MovieDetailOverlay from "./MovieDetailOverlay"; // Import overlay component
import styles from "./Listmovies.module.css";
import { useNavigate } from "react-router-dom"; 
import { useDispatch } from "react-redux";
import { setSelectedMovies } from "../../redux/actions"; 

const fetchTrendingMovies = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  return data.results;
};


export default function ListMovies({title,fetchUrl}) {
  const dispatch = useDispatch();
const navigate = useNavigate();


  const scrollRef = useRef(null);
  const [hoveredMovie, setHoveredMovie] = useState(null);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -700, behavior: "smooth" });
  };
  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 700, behavior: "smooth" });
  };

  const { data, isLoading, error } = useQuery({
    queryKey: [title],
    queryFn: () => fetchTrendingMovies(fetchUrl),

  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching movies.</div>;

  const handleCardHover = (movie, cardRef) => {
    const cardRect = cardRef.current.getBoundingClientRect();  // {give only the movie card}
    const parentRect = scrollRef.current.getBoundingClientRect(); // {give the all movie card contianer}
   
    setPosition({
     
      left: cardRect.left - parentRect.left  , 
    });
    
    
    setHoveredMovie(movie);
  };

  const handleMouseLeave = () => {
    setHoveredMovie(null);
  };
  // const handleViewAllClick = () => {
  //   navigate("/view-all", {
  //     state: {
  //       movies: data,
  //       title: title,
  //     },
  //   });
  // };
  const handleViewAllClick = () => {
    dispatch(setSelectedMovies(data, title));
    navigate("/view-all");
  };

  return (
    <div className={styles.listMoviesContainer}>
      <div className={styles.listMoviesHeader}>
        <h1>{title}</h1>
        {/* <Viewall title="Trending" movies={trendingMovies} /> */}

        <span className={styles.viewAll} onClick={handleViewAllClick}>View all</span>
      </div>

      <div className={styles.movieCardsSlider}>
        <IoIosArrowBack
          className={`${styles.arrowIcon} ${styles.arrowIconLeft}`}
          onClick={scrollLeft}
        />

        <div className={styles.sliderViewport}>
          <div className={styles.movieCardWrapper} ref={scrollRef}>
            {data.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onMouseEnter={(cardRef) => handleCardHover(movie, cardRef)}
                onMouseLeave={handleMouseLeave}
              />
            ))}
          </div>
        </div>

        <IoIosArrowForward
          className={`${styles.arrowIcon} ${styles.arrowIconRight}`}
          onClick={scrollRight}
        />
      </div>

      {/* Render the overlay outside MovieCard */}
      {hoveredMovie && (
        <MovieDetailOverlay movie={hoveredMovie} position={position} />
      )}
    </div>
  );
}
