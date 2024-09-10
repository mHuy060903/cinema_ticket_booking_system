import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../reducers/auth/authSlice.js";
import favoritesSlice from "../reducers/favorites/favoritesSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    favorites: favoritesSlice,
  },
});

export default store;
