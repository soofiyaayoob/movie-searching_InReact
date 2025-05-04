
export const login = (user) => ({
    type: 'LOGIN',
    payload: user,
  });
  
  export const logout = () => ({
    type: 'LOGOUT',
  });
  

  export const addToWatchlist = (movie) => ({
    type: "ADD_TO_WATCHLIST",
    payload: movie,
  });
  

export const SET_SELECTED_MOVIES = "SET_SELECTED_MOVIES";

export const setSelectedMovies = (movies, title) => ({
  type: SET_SELECTED_MOVIES,
  payload: { movies, title },
});
