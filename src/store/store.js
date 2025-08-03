import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"; // Don't include `.js` if using module bundler like Vite or Webpack

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
