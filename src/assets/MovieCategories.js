// movieCategories.js
export const categories = [
    {
      title: "Trending",
      fetchUrl: "https://api.themoviedb.org/3/trending/movie/week?api_key=fe59fa22c3ea09b2870a2f1e436c885f",
    },
    {
      title: "Comedy",
      fetchUrl: "https://api.themoviedb.org/3/discover/movie?api_key=fe59fa22c3ea09b2870a2f1e436c885f&with_genres=35",
    },
    {
      title: "Thriller",
      fetchUrl: "https://api.themoviedb.org/3/discover/movie?api_key=fe59fa22c3ea09b2870a2f1e436c885f&with_genres=53",
    },
    {
      title: "Drama Movies",
      fetchUrl: "https://api.themoviedb.org/3/discover/movie?api_key=fe59fa22c3ea09b2870a2f1e436c885f&with_genres=18",
    },
    {
      title: "Romantic Movies",
      fetchUrl: "https://api.themoviedb.org/3/discover/movie?api_key=fe59fa22c3ea09b2870a2f1e436c885f&with_genres=10749",
    },
    {
      title: "Action Movies",
      fetchUrl: "https://api.themoviedb.org/3/discover/movie?api_key=fe59fa22c3ea09b2870a2f1e436c885f&with_genres=28",
    },
    {
      title: "Animation Movies",
      fetchUrl: "https://api.themoviedb.org/3/discover/movie?api_key=fe59fa22c3ea09b2870a2f1e436c885f&with_genres=16",
    }
  ];

  