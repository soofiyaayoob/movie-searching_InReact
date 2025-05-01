import { produce } from "immer";
import { SET_SELECTED_MOVIES } from "./actions";

const initialState = {
  user: null,
  selectedMovies: [],
  selectedTitle: "",
};

export const rootReducer = produce((draft, action) => {
  switch (action.type) {
    case "LOGIN":
      draft.user = action.payload;
      break;
    case "LOGOUT":
      draft.user = null;
      break;

    case SET_SELECTED_MOVIES:
      draft.selectedMovies = action.payload.movies;
      draft.selectedTitle = action.payload.title;
      break;

    default:
      break;
  }
}, initialState);
