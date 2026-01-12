// src/Admin/context/apiSlice.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminBaseApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://mttlprv1.digiledge.info",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("authToken");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    }
  }),
  tagTypes: ["Admin"],
  endpoints: () => ({})
});
