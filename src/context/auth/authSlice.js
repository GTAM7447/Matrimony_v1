import { createSlice } from "@reduxjs/toolkit";
import { getAuthToken, setAuthToken, removeAuthToken } from "../../utils/auth";

const initialState = {
  user: null,
  token: getAuthToken() || null,
  isAuthenticated: !!getAuthToken(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { token, user } = action.payload;
      state.token = token;
      state.user = user;
      state.isAuthenticated = true;
      setAuthToken(token); // Store in secure cookie
      localStorage.setItem("user", JSON.stringify(user)); // User data can stay in localStorage
    },

    restoreSession: (state) => {
      const token = getAuthToken();
      const user = localStorage.getItem("user");
      if (token && user) {
        state.token = token;
        state.user = JSON.parse(user);
        state.isAuthenticated = true;
      }
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      removeAuthToken(); // Clean up cookie and localStorage
      localStorage.removeItem("user");
    },
  },
});

export const { setCredentials, restoreSession, logout } = authSlice.actions;
export default authSlice.reducer;