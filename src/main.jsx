import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

// Auth Context
import { AuthProvider } from "./context/AuthContext.jsx";

// Redux + RTK Query
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

// User API
import { apiSlice as userApi } from "./context/api.js";

// Admin API - CHANGE THIS LINE:
import { adminApi } from "./Admin/context/apiSlice.js"; // ✅ Changed from adminBaseApi

const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer // ✅ Changed here too
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware,
      adminApi.middleware // ✅ Changed here too
    )
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);