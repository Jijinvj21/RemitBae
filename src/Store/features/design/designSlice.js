// designSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: localStorage.getItem("theme") || "dark",
};

export const designSlice = createSlice({
  name: "design",
  initialState,
  reducers: {
    toggleTheme: (state, action) => {
      if (state.theme === "light") {
        localStorage.setItem("theme", "dark");
        state.theme = "dark";
      } else {
        state.theme = "light";
        localStorage.setItem("theme", "light");
      }
    },
  },
});

// Selectors
export const selectTheme = (state) => state.design.theme;

export const { toggleTheme } = designSlice.actions;

export default designSlice.reducer;
