// src/redux/reducers.js
import { produce } from 'immer';

const initialState = {
  user: null,
};

export const rootReducer = produce((draft, action) => {
  switch (action.type) {
    case 'LOGIN':
      draft.user = action.payload;
      break;
    case 'LOGOUT':
      draft.user = null;
      break;
    default:
      break;
  }
}, initialState);
