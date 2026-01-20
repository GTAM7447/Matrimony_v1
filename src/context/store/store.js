import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../context/api";
import { profileApi } from "../services/profileApi";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
  },
  middleware: (gDM) =>
    gDM().concat(apiSlice.middleware, profileApi.middleware),
});
