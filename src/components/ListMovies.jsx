import { useQuery } from "@tanstack/react-query";
import MovieCard from "./MovieCard";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const fetchtredingmovies = async () => {
  const res = await fetch(
    "https://api.themoviedb.org/3/trending/movie/day?api_key=fe59fa22c3ea09b2870a2f1e436c885f&language=en-US"
  );
  const data = await res.json();
  return data.results;
};

function ListMovies() {
  const { data, isLoading, error } = useQuery(
    "trendingMovies",
    fetchtredingmovies
  );
  if (isLoading) return <div>loading...</div>;
  if (error) return <div>error occured in trending movies fetching</div>;
  return (
    <>
      <div className="list-movies-container">
        <div className="list-movies-header">
          <h1>Trending</h1>
          <span>View all</span>
        </div>
        <div className="movie-cards-container">
          <IoIosArrowBack className="arrow-icon" />
          <div className="movie-card">
            {data.map((movie) => (
              <MovieCard key={Movie.is} movie={movie} />
            ))}
            <IoIosArrowForward className="arrow-icon" />
          </div>
        </div>
      </div>
    </>
  );
}

export default ListMovies;
