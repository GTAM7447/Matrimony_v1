// src/Admin/store/adminStore.js
import { configureStore } from "@reduxjs/toolkit";
import { adminApiSlice } from "./adminApiSlice";

export const adminStore = configureStore({
  reducer: {
    [adminApiSlice.reducerPath]: adminApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(adminApiSlice.middleware),
});