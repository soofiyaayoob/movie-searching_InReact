// src/pages/Home.jsx
import Banner from "../components/Banner/Banner";
import ListMovies from "../components/ListMovies";

function Home() {
  return (
    <div className="home-page" style={{maxWidth:"100%"}} >
    
       <div className="banner-section">
    <Banner  fetchUrl="https://api.themoviedb.org/3/trending/movie/week?api_key=fe59fa22c3ea09b2870a2f1e436c885f"/>
  </div>

  <div className="list-movies-section" >
    <ListMovies />
  </div>
    </div>
    
   
  );
}

export default Home;
