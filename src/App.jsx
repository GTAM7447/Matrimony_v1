// // App.jsx
// import React from "react";
// import { Routes, Route } from "react-router-dom";

// /* Common */
// import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

// /* USER AUTH CONTEXT */
// import { AuthProvider } from "./context/AuthContext";

// /* USER LAYOUT & PAGES */
// import AppLayout from "./components/layout/AppLayout";
// import Home from "./pages/Home";
// import SearchProfiles from "./pages/SearchProfiles";
// import Brides from "./pages/Brides";
// import Grooms from "./pages/Grooms";
// import SignIn from "./pages/SignIn";
// import SignUp from "./pages/SignUp";
// import ForgotPasswordPage from "./pages/ForgotPassword";
// import OtpVerificationPage from "./pages/OtpVerification";
// import ResetPasswordPage from "./pages/ResetPassword";
// import SuccessStories from "./components/SuccessStories/SuccessStoriesMain";
// import ProfileCreation from "./components/CreateProfile/ProfileCreation";
// import Contact from "./components/Contact/ContactSection";
// import MembershipPlans from "./components/MembershipPlan/MembershipPlans";
// import ViewProfile from "./components/ViewProfile/ViewProfile";
// import ViewProfilePage from "./pages/ViewProfilePage";
// import MatchesInPune from "./pages/MatchesInPune";
// import RequestSent from "./components/RequestSent/RequestSent";
// import RequestsPage from "./pages/RequestsPage";
// import BiodataTemplate, { emptyBiodata } from "./pages/ProfileCreation/emptyBiodata";
// import SuccessModal from "./pages/ProfileCreation/SuccessModal";
// import LogoutPanel from "./components/LogoutPanel/LogoutPanel";
// import OthersEmptyBiodataPage from "./pages/ProfileCreation/OthersEmptyBiodataPage";
// import PublicBiodataPage from "./pages/ProfileCreation/PublicBiodataPage";
// import MyProfilePage from "./pages/ProfileCreation/MyProfilePage";

// /* ADMIN AUTH + PROTECTED LAYOUT */
// import AdminProtectedRoute from "./Admin/context/AdminProtectedRoute";
// import AdminLayout from "./Admin/components/layout/AdminLayout";

// /* ADMIN PAGES */
// import AdminSignIn from "./Admin/pages/SignIn";
// import AdminSignUp from "./Admin/pages/SignUp";
// import AdminHomePage from "./Admin/pages/AdminHomePage";
// import AllProfilesPage from "./Admin/pages/AllProfilesPage";
// import EditProfilePage from "./Admin/components/AllProfilesPage/EditProfilePage/EditProfilePage";
// import CreateProfile from "./Admin/pages/RegistrationForm";
// import AdminRegistrationdashboard from "./Admin/pages/AdminRegistrationdashboard";
// import AdminProfileStatus from "./Admin/pages/AdminProfilestatus";
// import AdminMatchesPage from "./Admin/pages/AdminMatchesPage";
// import AdminDashboard from "./Admin/pages/Admindashboard";

// function App() {
//   return (
//     <AuthProvider>
//       <>
//         <ScrollToTop />

//         <Routes>
//           {/* USER ROUTES */}
//           <Route element={<AppLayout />}>
//             <Route path="/" element={<Home />} />
//             <Route path="/search-profiles" element={<SearchProfiles />} />
//             <Route path="/brides" element={<Brides />} />
//             <Route path="/grooms" element={<Grooms />} />
//             <Route path="/success-stories" element={<SuccessStories />} />
//             <Route path="/plans" element={<MembershipPlans />} />
//             <Route path="/contact" element={<Contact />} />
//             <Route path="/signin" element={<SignIn />} />
//             <Route path="/signup" element={<SignUp />} />
//             <Route path="/create-profile" element={<ProfileCreation />} />
//             <Route path="/viewprofile" element={<ViewProfile />} />
//             <Route path="/ViewProfilePage" element={<ViewProfilePage />} />
//             <Route path="/MatchesInPune" element={<MatchesInPune />} />
//             <Route path="/RequestSent" element={<RequestSent />} />
//             <Route path="/RequestsPage" element={<RequestsPage />} />
//             <Route path="/emptyBiodata" element={<BiodataTemplate data={emptyBiodata} />} />
//             <Route path="/SuccessModal" element={<SuccessModal />} />
//             <Route path="/LogoutPanel" element={<LogoutPanel />} />
//             <Route path="/profile/:profileId" element={<OthersEmptyBiodataPage />} />
//             <Route path="/PublicBiodataPage" element={<PublicBiodataPage />} />
//             <Route path="/my-profile" element={<MyProfilePage />} />
//           </Route>

//           {/* User Standalone Auth */}
//           <Route path="/forgot" element={<ForgotPasswordPage />} />
//           <Route path="/otp" element={<OtpVerificationPage />} />
//           <Route path="/reset" element={<ResetPasswordPage />} />

//           {/* ADMIN PUBLIC */}
//           <Route path="/admin/login" element={<AdminSignIn />} />
//           <Route path="/admin/register" element={<AdminSignUp />} />

//           {/* ADMIN PROTECTED */}
//           <Route
//             element={
//               <AdminProtectedRoute>
//                 <AdminLayout />
//               </AdminProtectedRoute>
//             }
//           >
//             <Route path="/admin" element={<AdminHomePage />} />
//             <Route path="/admin/dashboard" element={<AdminDashboard />} />
//             <Route path="/admin/all-profiles" element={<AllProfilesPage />} />
//             <Route path="/admin/edit-profile" element={<EditProfilePage />} />
//             <Route path="/admin/create-profile" element={<CreateProfile />} />
//             <Route path="/admin/registrations" element={<AdminRegistrationdashboard />} />
//             <Route path="/admin/profile-status" element={<AdminProfileStatus />} />
//             <Route path="/admin/matches" element={<AdminMatchesPage />} />
//           </Route>

//           {/* OPTIONAL 404 */}
//           <Route path="*" element={<AdminSignIn />} />
//         </Routes>
//       </>
//     </AuthProvider>
//   );
// }

// export default App;
















// App.jsx
import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

/* Restore Redux auth from localStorage */
import { restoreSession } from "./context/auth/authSlice";

/* USER LAYOUT & PAGES */
import AppLayout from "./components/layout/AppLayout";
import Home from "./pages/Home";
import SearchProfiles from "./pages/SearchProfiles";
import Brides from "./pages/Brides";
import Grooms from "./pages/Grooms";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPasswordPage from "./pages/ForgotPassword";
import OtpVerificationPage from "./pages/OtpVerification";
import ResetPasswordPage from "./pages/ResetPassword";
import SuccessStories from "./components/SuccessStories/SuccessStoriesMain";
import ProfileCreation from "./components/CreateProfile/ProfileCreation";
import Contact from "./components/Contact/ContactSection";
import MembershipPlans from "./components/MembershipPlan/MembershipPlans";
import ViewProfile from "./components/ViewProfile/ViewProfile";
import ViewProfilePage from "./pages/ViewProfilePage";
import MatchesInPune from "./pages/MatchesInPune";
import RequestSent from "./components/RequestSent/RequestSent";
import RequestsPage from "./pages/RequestsPage";
import BiodataTemplate, { emptyBiodata } from "./pages/ProfileCreation/emptyBiodata";
import SuccessModal from "./pages/ProfileCreation/SuccessModal";
import LogoutPanel from "./components/LogoutPanel/LogoutPanel";
import OthersEmptyBiodataPage from "./pages/ProfileCreation/OthersEmptyBiodataPage";
import PublicBiodataPage from "./pages/ProfileCreation/PublicBiodataPage";
import MyProfilePage from "./pages/ProfileCreation/MyProfilePage";

/* ADMIN AUTH + PROTECTED LAYOUT */
import AdminProtectedRoute from "./Admin/context/AdminProtectedRoute";
import AdminLayout from "./Admin/components/layout/AdminLayout";

/* ADMIN PAGES */
import AdminSignIn from "./Admin/pages/SignIn";
import AdminSignUp from "./Admin/pages/SignUp";
import AdminHomePage from "./Admin/pages/AdminHomePage";
import AllProfilesPage from "./Admin/pages/AllProfilesPage";
import EditProfilePage from "./Admin/components/AllProfilesPage/EditProfilePage/EditProfilePage";
import CreateProfile from "./Admin/pages/RegistrationForm";
import AdminRegistrationdashboard from "./Admin/pages/AdminRegistrationdashboard";
import AdminProfileStatus from "./Admin/pages/AdminProfilestatus";
import AdminMatchesPage from "./Admin/pages/AdminMatchesPage";
import AdminDashboard from "./Admin/pages/Admindashboard";

function App() {
  const dispatch = useDispatch();

  // Restore token + user from localStorage on first load
  useEffect(() => {
    dispatch(restoreSession());
  }, [dispatch]);

  return (
    <>
      <ScrollToTop />

      <Routes>
        {/* USER ROUTES */}
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/search-profiles" element={<SearchProfiles />} />
          <Route path="/brides" element={<Brides />} />
          <Route path="/grooms" element={<Grooms />} />
          <Route path="/success-stories" element={<SuccessStories />} />
          <Route path="/plans" element={<MembershipPlans />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/create-profile" element={<ProfileCreation />} />
          <Route path="/viewprofile" element={<ViewProfile />} />
          <Route path="/ViewProfilePage" element={<ViewProfilePage />} />
          <Route path="/MatchesInPune" element={<MatchesInPune />} />
          <Route path="/RequestSent" element={<RequestSent />} />
          <Route path="/RequestsPage" element={<RequestsPage />} />
          <Route path="/emptyBiodata" element={<BiodataTemplate data={emptyBiodata} />} />
          <Route path="/SuccessModal" element={<SuccessModal />} />
          <Route path="/LogoutPanel" element={<LogoutPanel />} />
          <Route path="/profile/:profileId" element={<OthersEmptyBiodataPage />} />
          <Route path="/PublicBiodataPage" element={<PublicBiodataPage />} />
          <Route path="/my-profile" element={<MyProfilePage />} />
        </Route>

        {/* User Auth Pages */}
        <Route path="/forgot" element={<ForgotPasswordPage />} />
        <Route path="/otp" element={<OtpVerificationPage />} />
        <Route path="/reset" element={<ResetPasswordPage />} />

        {/* ADMIN PUBLIC */}
        <Route path="/admin/login" element={<AdminSignIn />} />
        <Route path="/admin/register" element={<AdminSignUp />} />

        {/* ADMIN PROTECTED */}
        <Route
          element={
            <AdminProtectedRoute>
              <AdminLayout />
            </AdminProtectedRoute>
          }
        >
          <Route path="/admin" element={<AdminHomePage />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/all-profiles" element={<AllProfilesPage />} />
          {/* UPDATED ROUTE HERE */}
          <Route path="/admin/edit-profile/:userId" element={<EditProfilePage />} />
          <Route path="/admin/create-profile" element={<CreateProfile />} />
          <Route path="/admin/registrations" element={<AdminRegistrationdashboard />} />
          <Route path="/admin/profile-status" element={<AdminProfileStatus />} />
          <Route path="/admin/matches" element={<AdminMatchesPage />} />
        </Route>

        {/* OPTIONAL 404 */}
        <Route path="*" element={<AdminSignIn />} />
      </Routes>
    </>
  );
}

export default App;