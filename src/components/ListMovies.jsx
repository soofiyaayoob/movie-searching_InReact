import React, { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import MovieCard from "./MovieCard";
import styles from "../css/Listmovies.module.css";

const fetchTrendingMovies = async () => {
  const res = await fetch(
    "https://api.themoviedb.org/3/trending/movie/day?api_key=fe59fa22c3ea09b2870a2f1e436c885f&language=en-US"
  );
  const data = await res.json();
  return data.results;
};

export default function ListMovies() {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -700, behavior: "smooth" });
  };
  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 700, behavior: "smooth" });
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["trendingMovies"],
    queryFn: fetchTrendingMovies,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching movies.</div>;

  return (
    <div className={styles.listMoviesContainer}>
      <div className={styles.listMoviesHeader}>
        <h1>Trending</h1>
        <span className={styles.viewAll}>View all</span>
      </div>

      <div className={styles.movieCardsSlider}>
        <IoIosArrowBack
          className={`${styles.arrowIcon} ${styles.arrowIconLeft}`}
          onClick={scrollLeft}
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
          onClick={scrollRight}
        />
      </div>
    </div>
  );
}
