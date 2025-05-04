import { categories } from "../assets/MovieCategories"; 
import ListMovies from "../components/Categorie/ListMovies";

function Categories() {
    return ( <div className="list-movies-section">
            {categories.map((cat, index) => (
              <ListMovies key={index} title={cat.title} fetchUrl={cat.fetchUrl} />
            ))}
          </div> );
}

export default Categories;