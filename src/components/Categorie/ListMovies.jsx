import React, { useState, useRef ,useCallback} from "react";
import { useQuery } from "@tanstack/react-query";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import MovieCard from "./MovieCard";

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


  const { data = [], isLoading, error } = useQuery({
    queryKey: [title],
    queryFn: () => fetchTrendingMovies(fetchUrl),
  });

  


  const handleViewAllClick = () => {
    dispatch(setSelectedMovies(data, title));
    navigate("/view-all");
  };

 

  return (
    <div className={styles.listMoviesContainer}>
      <div className={styles.listMoviesHeader}>
        <h1>{title}</h1>
        <span className={styles.viewAll} onClick={handleViewAllClick}>View all</span>
      </div>

      <div className={styles.movieCardsSlider} >
        <IoIosArrowBack
          className={`${styles.arrowIcon} ${styles.arrowIconLeft}`}
          onClick={() => scrollRef.current?.scrollBy({ left: -700, behavior: "smooth" })}
        />

        <div className={styles.sliderViewport}>
       
          <div className={styles.movieCardWrapper} ref={scrollRef}>
      {data.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
        </div>

        <IoIosArrowForward
          className={`${styles.arrowIcon} ${styles.arrowIconRight}`}
          onClick={() => scrollRef.current?.scrollBy({ left: 700, behavior: "smooth" })}
        />
      </div>

      
    </div>
  );
}
