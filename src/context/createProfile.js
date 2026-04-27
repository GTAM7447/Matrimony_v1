// src/context/createProfile.js
import { apiSlice } from "./api";

export const createProfileApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    /* ================= STEP 1 : PERSONAL DETAILS ================= */
    createPersonalDetails: builder.mutation({
      query: (body) => ({
        url: "/api/v1/profiles",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Profile"],
    }),

    getPersonalDetails: builder.query({
      query: () => "/api/v1/profiles/me",
      providesTags: ["Profile"],
    }),

    updatePersonalDetails: builder.mutation({
      query: (body) => ({
        url: "/api/v1/profiles/me",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Profile"],
    }),

    /* ================= STEP 2 : HOROSCOPE ================= */
    createHoroscopeDetails: builder.mutation({
      query: (body) => ({
        url: "/api/v1/horoscope",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Horoscope"],
    }),

    getHoroscopeDetails: builder.query({
      query: () => "/api/v1/horoscope/me",
      providesTags: ["Horoscope"],
    }),

    updateHoroscopeDetails: builder.mutation({
      query: (body) => ({
        url: "/api/v1/horoscope",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Horoscope"],
    }),

    /* ================= STEP 3 : EDUCATION & PROFESSION ================= */
    createEducationDetails: builder.mutation({
      query: (body) => ({
        url: "/api/v1/education-profession",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Education"],
    }),

    getEducationDetails: builder.query({
      query: () => "/api/v1/education-profession/me",
      providesTags: ["Education"],
    }),

    updateEducationDetails: builder.mutation({
      query: (body) => ({
        url: "/api/v1/education-profession/me",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Education"],
    }),

    /* ================= STEP 4 : FAMILY BACKGROUND ================= */
    createFamilyBackground: builder.mutation({
      query: (body) => ({
        url: "/api/v1/family-background",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Family"],
    }),

    getFamilyBackground: builder.query({
      query: () => "/api/v1/family-background/me",
      providesTags: ["Family"],
    }),

    updateFamilyBackground: builder.mutation({
      query: (body) => ({
        url: "/api/v1/family-background",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Family"],
    }),

    /* ================= STEP 5 : PARTNER PREFERENCE ================= */
    createPartnerPreference: builder.mutation({
      query: (body) => ({
        url: "/api/v1/partner-preferences",
        method: "POST",
        body,
      }),
      invalidatesTags: ["PartnerPreference"],
    }),

    getPartnerPreference: builder.query({
      query: () => "/api/v1/partner-preferences/me",
      providesTags: ["PartnerPreference"],
    }),

    updatePartnerPreference: builder.mutation({
      query: (body) => ({
        url: "/api/v1/partner-preferences/me",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["PartnerPreference"],
    }),

    /* STEP 6 : CONTACT / RESIDENTIAL DETAILS */
    createResidentialDetails: builder.mutation({
      query: (body) => ({
        url: "/api/v1/contact-details",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Contact"],
    }),

    getResidentialDetails: builder.query({
      query: () => "/api/v1/contact-details/me",
      providesTags: ["Contact"],
    }),

    updateResidentialDetails: builder.mutation({
      query: (body) => ({
        url: "/api/v1/contact-details/me",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Contact"],
    }),

    /* STEP 7 : DOCUMENT UPLOAD  */
    uploadDocument: builder.mutation({
      query: ({ documentType, file, description = "" }) => {
        const formData = new FormData();
        formData.append("documentType", documentType);
        formData.append("file", file);

        // Optional description parameter
        if (description && description.trim() !== "") {
          formData.append("description", description);
        }

        return {
          url: "/api/v1/documents/upload",
          method: "POST",
          body: formData,
        };
      },
    }),

    /* PROFILE COMPLETION & STATUS  */
    getProfileCompletion: builder.query({
      query: () => "/api/v1/profiles/me/completion",
      providesTags: ["ProfileCompletion"],
    }),

    getCompleteProfile: builder.query({
      query: () => "/api/v1/complete-profile/me",
      providesTags: ["CompleteProfile"],
    }),

    changePassword: builder.mutation({
      query: (body) => ({
        url: "/api/v1/users/change-password",
        method: "POST",
        body,
      }),
    }),

    /* ================= SUBSCRIPTIONS (ADMIN & PUBLIC) ================= */
    getActiveSubscriptionPlans: builder.query({
      query: () => "/api/v1/subscription-plans",
      providesTags: ["SubscriptionPlans"],
    }),

    getAllSubscriptionPlans: builder.query({
      query: () => "/api/admin/subscription-plans",
      providesTags: ["SubscriptionPlans"],
    }),

    adminPurchaseSubscription: builder.mutation({
      query: (body) => ({
        url: "/api/admin/user-subscriptions/purchase-for-user",
        method: "POST",
        body,
      }),
      invalidatesTags: ["UserSubscription", "SubscriptionPlans"],
    }),

    getUserSubscription: builder.query({
      query: (userId) => `/api/admin/user-subscriptions/user/${userId}`,
      providesTags: (result, error, userId) => [{ type: "UserSubscription", id: userId }],
    }),

    /* ================= USER MANAGEMENT (ADMIN) ================= */
    getAllUsers: builder.query({
      query: ({ page = 0, size = 10, search = "" }) => {
        const params = new URLSearchParams({
          page: page.toString(),
          size: size.toString(),
        });
        if (search) params.append("search", search);
        return `/api/v1/admin/users/all?${params.toString()}`;
      },
      providesTags: ["Users"],
    }),

    /* ================= PLAN MANAGEMENT (ADMIN) ================= */
    createSubscriptionPlan: builder.mutation({
      query: (body) => ({
        url: "/api/admin/subscription-plans",
        method: "POST",
        body,
      }),
      invalidatesTags: ["SubscriptionPlans"],
    }),

    updateSubscriptionPlan: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/api/admin/subscription-plans/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["SubscriptionPlans"],
    }),

    deleteSubscriptionPlan: builder.mutation({
      query: (id) => ({
        url: `/api/admin/subscription-plans/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SubscriptionPlans"],
    }),
  }),
});

// Export all hooks including the missing uploadProfilePhoto
export const {
  // Personal Details
  useCreatePersonalDetailsMutation,
  useGetPersonalDetailsQuery,
  useUpdatePersonalDetailsMutation,

  // Horoscope
  useCreateHoroscopeDetailsMutation,
  useGetHoroscopeDetailsQuery,
  useUpdateHoroscopeDetailsMutation,

  // Education & Profession
  useCreateEducationDetailsMutation,
  useGetEducationDetailsQuery,
  useUpdateEducationDetailsMutation,

  // Family Background
  useCreateFamilyBackgroundMutation,
  useGetFamilyBackgroundQuery,
  useUpdateFamilyBackgroundMutation,

  // Partner Preference
  useCreatePartnerPreferenceMutation,
  useGetPartnerPreferenceQuery,
  useUpdatePartnerPreferenceMutation,

  // Contact/Residential
  useCreateResidentialDetailsMutation,
  useGetResidentialDetailsQuery,
  useUpdateResidentialDetailsMutation,

  // Documents
  useUploadDocumentMutation,

  // Profile Completion
  useGetProfileCompletionQuery,
  useGetCompleteProfileQuery,

  // Password Change
  useChangePasswordMutation,

  // Subscription Hooks
  useGetActiveSubscriptionPlansQuery,
  useGetAllSubscriptionPlansQuery,
  useAdminPurchaseSubscriptionMutation,
  useGetUserSubscriptionQuery,
  useCreateSubscriptionPlanMutation,
  useUpdateSubscriptionPlanMutation,
  useDeleteSubscriptionPlanMutation,

  // User Management Hooks
  useGetAllUsersQuery,
} = createProfileApi;