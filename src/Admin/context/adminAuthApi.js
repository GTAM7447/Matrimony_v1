import { apiSlice } from "./apiSlice";

export const adminAuthApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerAdmin: builder.mutation({
      query: (payload) => ({
        url: "/api/v1/admin/users/register",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const {
  useRegisterAdminMutation,
} = adminAuthApi;