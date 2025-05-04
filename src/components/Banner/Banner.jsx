import "./Banner.css";
import { useRef, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToWatchlist } from "../../redux/actions";


const fetchMovies = async (fetchUrl) => {
  const res = await fetch(fetchUrl);
  const data = await res.json();
  return data.results;
};

const fetchMovieDetails = async (movieId) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=fe59fa22c3ea09b2870a2f1e436c885f&language=en-US`
  );
  const data = await res.json();
  return data;
};

function Banner({ fetchUrl }) {

  
const dispatch = useDispatch();
const navigate = useNavigate();
const user = useSelector((state) => state.user);

const handleWatchNow = () => {
  if (!user) {
    navigate("/profile");
    return;
  }

 
};

const handleAddToWatchlist = (movie) => {
  console.log("Adding to watchlist:", movie); // Check if it's a valid movie object
  if (!user) {
    navigate("/profile");
    return;
  }

  dispatch(addToWatchlist(movie));
};



  const {
    data: movies,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["banner", fetchUrl],
    queryFn: () => fetchMovies(fetchUrl),
  });

  const [selectedMovie, setSelectedMovie] = useState(null);
  const thumbnailRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const { data: movieDetails, isLoading: isDetailsLoading } = useQuery({
    queryKey: ["movieDetails", selectedMovie?.id],
    queryFn: () => (selectedMovie ? fetchMovieDetails(selectedMovie.id) : null),
    enabled: !!selectedMovie,
  });

  useEffect(() => {
    const checkScrollPosition = () => {
      if (!thumbnailRef.current) return;

      const { scrollLeft, scrollWidth, clientWidth } = thumbnailRef.current;

      setShowLeftArrow(scrollLeft > 0);

      setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 5); // 5px buffer
    };

    checkScrollPosition();

    const thumbnailElement = thumbnailRef.current;
    if (thumbnailElement) {
      thumbnailElement.addEventListener("scroll", checkScrollPosition);
    }

    return () => {
      if (thumbnailElement) {
        thumbnailElement.removeEventListener("scroll", checkScrollPosition);
      }
    };
  }, [movies]);

  const scrollLeft = () => {
    if (thumbnailRef.current) thumbnailRef.current.scrollLeft -= 300;
  };

  const scrollRight = () => {
    if (thumbnailRef.current) thumbnailRef.current.scrollLeft += 300;
  };

  if (isLoading) return <p>Loading movies...</p>;
  if (error) return <p>Error fetching movies</p>;

  const bannerMovie = selectedMovie || movies[0];

  return (
    <div className="banner-container">
      <div
        className="banner-background"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${bannerMovie?.backdrop_path})`,
        }}
      >
        <div className="banner-bottom-content">
          <div className="banner-left">
            <h1 className="movie-title">
              {bannerMovie?.title || bannerMovie?.name}
            </h1>

            <div className="movie-info">
              <span>{bannerMovie?.release_date || "Date Unknown"}</span>
              <span>
                {" "}
                |{" "}
                {isDetailsLoading
                  ? "Loading..."
                  : `${Math.floor(movieDetails?.runtime / 60)}h ${
                      movieDetails?.runtime % 60
                    }m`}{" "}
              </span>
              <span> | {bannerMovie?.original_language?.toUpperCase()}</span>
            </div>

            <p className="banner-overview">
              {bannerMovie?.overview?.substring(0, 150)}...
            </p>

            {/* Genres */}
            <p className="banner-genres">
              {isDetailsLoading
                ? "#Loading Genres"
                : movieDetails?.genres
                    ?.map((genre) => `#${genre.name}`)
                    .join(" | ") || "#NoGenres"}
            </p>

            {/* Buttons */}
            <div className="banner-buttons">
              <button className="watch-button" onClick={handleWatchNow}>
                ▶ Watch Now
              </button>
              <button
                type="button"
                className="wishlist-button"
                title="Add to wishlist"
                onClick={() => handleAddToWatchlist(bannerMovie)}
              >
                +
              </button>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="banner-right">
            {showLeftArrow && (
              <button className="arrow-button arrow-left" onClick={scrollLeft}>
                ←
              </button>
            )}
            <div className="thumbnail-row" ref={thumbnailRef}>
              {movies.slice(0, 8).map((movie) => (
                <img
                  key={movie.id}
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={movie.title}
                  className="thumbnail"
                  onClick={() => setSelectedMovie(movie)}
                />
              ))}
            </div>
            {showRightArrow && (
              <button
                className="arrow-button arrow-right"
                onClick={scrollRight}
              >
                →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
