// // src/app/store.js
// import { configureStore } from "@reduxjs/toolkit";
// import { api } from "../context/api";

// export const store = configureStore({
//   reducer: {
//     [api.reducerPath]: api.reducer,
//     // Remove auth reducer if authSlice doesn't exist
//   },
//   middleware: (getDefault) => getDefault().concat(api.middleware),
// });









import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import { profileApi } from "../services/profileApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [profileApi.reducerPath]: profileApi.reducer,
  },
  middleware: (gDM) => gDM().concat(profileApi.middleware),
});
