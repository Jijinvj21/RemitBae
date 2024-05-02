import { configureStore } from "@reduxjs/toolkit";
import designReducer from "./features/design/designSlice";

export const store = configureStore({
  reducer: {
    design: designReducer,
  },
});