// src/pages/Home.jsx

import { categories } from "../assets/MovieCategories"; 
import Banner from "../components/Banner/Banner";
import ListMovies from "../components/Categorie/ListMovies";

function Home() {
  return (
    <div className="home-page" >
      <div className="banner-section">
        <Banner fetchUrl="https://api.themoviedb.org/3/trending/movie/week?api_key=fe59fa22c3ea09b2870a2f1e436c885f" />
      </div>

      <div className="list-movies-section">
        {categories.map((cat, index) => (
          <ListMovies key={index} title={cat.title} fetchUrl={cat.fetchUrl} />
        ))}
      </div>
    </div>
  );
}

export default Home;
