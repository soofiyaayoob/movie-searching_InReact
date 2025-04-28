// src/pages/Home.jsx
import Banner from "../components/Banner";

function Home() {
  return (
    <div className="home-page" style={{ overflowX: "hidden" }}>
      <Banner 
        title="Trending Now"
        fetchUrl="https://api.themoviedb.org/3/trending/movie/week?api_key=fe59fa22c3ea09b2870a2f1e436c885f"
      />
    </div>
  );
}

export default Home;
