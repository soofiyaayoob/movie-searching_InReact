import { useDispatch } from "react-redux";
import { setSelectedMovies } from "../redux/actions";
import Viewall from "../components/ViewAll/Viewall";
import { useQuery } from "@tanstack/react-query";
import { IoSearchOutline } from "react-icons/io5";
import { useEffect, useState } from "react";

function Search() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500); 
    return () => clearTimeout(timeout);
  }, [searchTerm]);

  const fetchMovies = async () => {
    const query = debouncedSearchTerm.trim();
    const url = query
      ? `https://api.themoviedb.org/3/search/movie?api_key=fe59fa22c3ea09b2870a2f1e436c885f&query=${encodeURIComponent(query)}`
      : `https://api.themoviedb.org/3/discover/movie?api_key=fe59fa22c3ea09b2870a2f1e436c885f&with_original_language=ml&sort_by=popularity.desc`;

    const response = await fetch(url);
    const data = await response.json();
    return data.results;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["searchMovies", debouncedSearchTerm],
    queryFn: fetchMovies,
    keepPreviousData: true,
  });

  
  useEffect(() => {
    if (data) {
      const title = debouncedSearchTerm
        ? `Search Results for "${debouncedSearchTerm}"`
        : "Trending Malayalam";
      dispatch(setSelectedMovies(data, title));
    }
    if (isError) {
      console.error("Error fetching movies:", error);
    }
  }, [data, isError]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Failed to load Malayalam movies.</div>;

  return (
    <div className="Search">
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <IoSearchOutline className="search-icon" />
      </div>

      <section className="trending-section">
        {data?.length === 0 ? (
          <div>No movies found.</div>
        ) : (
          <Viewall />
        )}
      </section>

      <style>{`
        .search-container {
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 2rem auto;
          max-width: 500px;
          padding: 0.5rem 1rem;
          border: 1px solid #ccc;
          border-radius: 30px;
          background-color: #fff;
        }

        .search-input {
          flex: 1;
          border: none;
          outline: none;
          font-size: 1rem;
          padding: 0.5rem;
        }

        .search-icon {
          font-size: 1.5rem;
          color: #333;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}

export default Search;
