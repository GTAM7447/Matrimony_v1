// src/pages/EditProfilePage.jsx
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { Country, State, City } from "country-state-city";
import { useGetAdminProfileByUserIdQuery } from "../../../context/adminApi";
import defaultProfileImg from "../../../../assets/DefaultImage/AvtarImg.avif";

const EditProfilePage = () => {
  const { userId } = useParams();

  const { data, isLoading, isError } =
    useGetAdminProfileByUserIdQuery(userId);

  // Map API to UI
  const mapped = useMemo(() => {
    if (!data) return {};

    const p = data.userProfile || {};
    const e = data.educationAndProfession || {};
    const f = data.familyBackground || {};

    return {
      name: `${p.firstName} ${p.lastName}`,
      dob: data.horoscopeDetails?.dob?.split("T")[0] ?? "",
      age: p.age,
      religion: p.religion,
      caste: p.caste,
      phone: data.contactDetails?.mobileNumber || "",
      email: data.contactDetails?.emailAddress || "",
      gender: p.gender ? p.gender.charAt(0) + p.gender.slice(1).toLowerCase() : "",
      maritalStatus: p.maritalStatus,
      weight: p.weight,
      height: p.height,
      country: data.contactDetails?.country ?? "",
      state: data.contactDetails?.state ?? "",
      city: data.contactDetails?.city ?? "",
      motherTongue: "Update later",
      education: e.education,
      profession: e.occupation,
      company: e.companyName,
      annualIncome: e.formattedIncome,
      workLocation: e.workLocation,
      fathersOccupation: f.fatherOccupation,
      mothersOccupation: f.motherOccupation,
      brothers: f.brother,
      familyType: "Nuclear",
      familyValues: "Traditional",
      profileImage:
        data.profilePhotoBase64 && data.profilePhotoContentType
          ? `data:${data.profilePhotoContentType};base64,${data.profilePhotoBase64}`
          : defaultProfileImg,
    };
  }, [data]);

  const [formData, setFormData] = useState(mapped);
  const [activeTab, setActiveTab] = useState("form");
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    setFormData(mapped);

    // Load all countries initially
    const allCountries = Country.getAllCountries();
    setCountries(allCountries);

    // Find matching country ISO from name
    const foundCountry = allCountries.find(
      (c) => c.name.toLowerCase() === mapped.country?.toLowerCase()
    );

    if (foundCountry) {
      const countryCode = foundCountry.isoCode;
      setFormData((prev) => ({ ...prev, country: countryCode }));

      const st = State.getStatesOfCountry(countryCode);
      setStates(st);

      // Find state ISO from name
      const foundState = st.find(
        (s) => s.name.toLowerCase() === mapped.state?.toLowerCase()
      );

      if (foundState) {
        const stateCode = foundState.isoCode;
        setFormData((prev) => ({ ...prev, state: stateCode }));

        const ct = City.getCitiesOfState(countryCode, stateCode);
        setCities(ct);

        // Set exact city from list if exists
        const foundCity = ct.find(
          (c) => c.name.toLowerCase() === mapped.city?.toLowerCase()
        );

        if (foundCity) {
          setFormData((prev) => ({ ...prev, city: foundCity.name }));
        }
      }
    }
  }, [mapped]);



  const handleCountryChange = (countryCode) => {
    setFormData((prev) => ({ ...prev, country: countryCode, state: "", city: "" }));
    setStates(State.getStatesOfCountry(countryCode));
    setCities([]);
  };

  const handleStateChange = (stateCode) => {
    setFormData((prev) => ({ ...prev, state: stateCode, city: "" }));
    if (formData.country) {
      setCities(City.getCitiesOfState(formData.country, stateCode));
    }
  };

  // ---------- ACTION HANDLERS (TEMP PLACEHOLDERS) ----------
  const handleSave = () => {
    console.log("Save clicked", formData);
    alert("Save API coming soon...");
  };

  const handleCancel = () => {
    console.log("Cancel clicked");
    alert("Changes cancelled");
  };

  const handleSuspend = () => {
    console.log("Suspend user:", userId);
    alert("Suspend API coming soon...");
  };

  const handleDelete = () => {
    console.log("Delete user:", userId);
    alert("Delete API coming soon...");
  };


  // ... KEEP REMAINING CODE UNCHANGED (SAVE, CANCEL, UI etc)
  if (isLoading) return <p className="p-10">Loading Profile...</p>;
  if (isError) return <p className="p-6 text-red-500">Failed to load profile!</p>;


  return (
    <div className="bg-[#F4F9FF] min-h-screen w-full px-4 md:px-6 py-6 pt-[80px]">

      {/* BREADCRUMB */}
      <div className="flex items-center gap-2 mb-4 text-sm">
        <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-lg">Dashboard</span>
        /
        <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-lg">All Profiles</span>
        /
        <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-lg">Edit Profile</span>
      </div>

      {/* BACK */}
      <Link
        to="/admin/all-profiles"
        className="mb-4 inline-block text-sm text-gray-600 hover:text-[#991CDD]"
      >
        ← Edit Profile
      </Link>

      {/* TABS */}
      <div className="bg-white rounded-xl p-3 flex gap-6 text-sm mb-6">
        <button
          onClick={() => setActiveTab("form")}
          className={`pb-1 ${activeTab === "form"
            ? "text-[#991CDD] font-medium border-b-2 border-[#991CDD]"
            : "text-gray-500"
            }`}
        >
          Profile Info Form
        </button>

        <button
          onClick={() => setActiveTab("summary")}
          className={`pb-1 ${activeTab === "summary"
            ? "text-[#991CDD] font-medium border-b-2 border-[#991CDD]"
            : "text-gray-500"
            }`}
        >
          Profile Summary / Controls
        </button>
      </div>

      {/* ---------- PROFILE INFO FORM ---------- */}
      {activeTab === "form" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* LEFT */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6">
              <div className="flex gap-4 mb-6">
                <img
                  src={formData.profileImage || defaultProfileImg}
                  className="w-24 h-24 rounded-lg object-cover"
                  alt="Profile"
                  onError={(e) => (e.currentTarget.src = defaultProfileImg)}
                />

                <div>
                  <h3 className="font-semibold">
                    {formData.name || "No Name"}
                  </h3>

                  <p className="text-sm text-gray-500">
                    Profile ID:{" "}
                    <span className="text-[#991CDD]">
                      {userId || "--"}
                    </span>
                  </p>

                  <button className="text-sm text-[#991CDD] mt-1">
                    Remove Photo
                  </button>
                </div>

              </div>

              <FormGrid>
                <Input
                  label="Name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />

                <Select
                  label="Gender"
                  value={formData.gender}
                  onChange={(e) => handleInputChange("gender", e.target.value)}
                  options={["Male", "Female", "Other"]}
                />

                <Input
                  label="DOB"
                  value={formData.dob}
                  onChange={(e) => handleInputChange("dob", e.target.value)}
                />

                <Input
                  label="Age"
                  value={formData.age}
                  onChange={(e) => handleInputChange("age", e.target.value)}
                  type="number"
                />

                <Select
                  label="Religion"
                  value={formData.religion}
                  onChange={(e) => handleInputChange("religion", e.target.value)}
                  options={["Hindu", "Muslim", "Christian", "Sikh", "Buddhist", "Jain", "Other"]}
                />

                <Input
                  label="Caste"
                  value={formData.caste}
                  onChange={(e) => handleInputChange("caste", e.target.value)}
                />

                {/* Country Dropdown */}
                <div>
                  <label className="text-xs text-gray-500">Country</label>
                  <select
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                    value={formData.country}
                    onChange={(e) => handleCountryChange(e.target.value)}
                  >
                    <option value="">Select Country</option>
                    {countries.map(country => (
                      <option key={country.isoCode} value={country.isoCode}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* State Dropdown */}
                <div>
                  <label className="text-xs text-gray-500">State</label>
                  <select
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                    value={formData.state}
                    onChange={(e) => handleStateChange(e.target.value)}
                    disabled={!formData.country}
                  >
                    <option value="">Select State</option>
                    {states.map(state => (
                      <option key={state.isoCode} value={state.isoCode}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* City Dropdown */}
                <div>
                  <label className="text-xs text-gray-500">City</label>
                  <select
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    disabled={!formData.state}
                  >
                    <option value="">Select City</option>
                    {cities.map(city => (
                      <option key={city.name} value={city.name}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                </div>

                <Input
                  label="Phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                />

                <Input
                  label="Email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  type="email"
                />

                <Select
                  label="Marital Status"
                  value={formData.maritalStatus}
                  onChange={(e) => handleInputChange("maritalStatus", e.target.value)}
                  options={["Never Married", "Divorced", "Widowed", "Awaiting Divorce"]}
                />

                <Input
                  label="Height"
                  value={formData.height}
                  onChange={(e) => handleInputChange("height", e.target.value)}
                />

                <Input
                  label="Weight"
                  value={formData.weight}
                  onChange={(e) => handleInputChange("weight", e.target.value)}
                  type="number"
                />

                <Input
                  label="Mother Tongue"
                  value={formData.motherTongue}
                  onChange={(e) => handleInputChange("motherTongue", e.target.value)}
                />
              </FormGrid>

              {/* ACTIONS */}
              <div className="flex gap-4 mt-6">
                <button
                  className="bg-[#991CDD] text-white px-6 py-2.5 rounded-lg text-sm hover:bg-[#8a1bc7]"
                  onClick={handleSave}
                >
                  Save Changes
                </button>
                <button
                  className="bg-white border border-[#991CDD] text-[#991CDD] px-6 py-2.5 rounded-lg text-sm hover:bg-[#991CDD0F]"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-6">
            {/* Education & Work - Now with Input fields (no dropdowns) */}
            <div className="bg-white rounded-xl p-6">
              <h4 className="font-medium mb-4">Education & Work</h4>
              <FormGrid>
                <Input
                  label="Education"
                  value={formData.education}
                  onChange={(e) => handleInputChange("education", e.target.value)}
                />
                <Input
                  label="Profession"
                  value={formData.profession}
                  onChange={(e) => handleInputChange("profession", e.target.value)}
                />
                <Input
                  label="Company"
                  value={formData.company}
                  onChange={(e) => handleInputChange("company", e.target.value)}
                />
                <Input
                  label="Annual Income"
                  value={formData.annualIncome}
                  onChange={(e) => handleInputChange("annualIncome", e.target.value)}
                />
                <Input
                  label="Work Location"
                  value={formData.workLocation}
                  onChange={(e) => handleInputChange("workLocation", e.target.value)}
                />
              </FormGrid>
            </div>

            {/* Family Details */}
            <div className="bg-white rounded-xl p-6">
              <h4 className="font-medium mb-4">Family Details</h4>
              <FormGrid>
                <Input
                  label="Father’s Occupation"
                  value={formData.fathersOccupation}
                  onChange={(e) => handleInputChange("fathersOccupation", e.target.value)}
                />
                <Input
                  label="Mother’s Occupation"
                  value={formData.mothersOccupation}
                  onChange={(e) => handleInputChange("mothersOccupation", e.target.value)}
                />
                <Input
                  label="Brothers"
                  value={formData.brothers}
                  onChange={(e) => handleInputChange("brothers", e.target.value)}
                  type="number"
                />
                <Input
                  label="Family Type"
                  value={formData.familyType}
                  onChange={(e) => handleInputChange("familyType", e.target.value)}
                />
                <Input
                  label="Family Values"
                  value={formData.familyValues}
                  onChange={(e) => handleInputChange("familyValues", e.target.value)}
                />
              </FormGrid>
            </div>
          </div>
        </div>
      )}

      {/* ---------- PROFILE SUMMARY / CONTROLS ---------- */}
      {activeTab === "summary" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* LEFT */}
          <div className="bg-white rounded-xl p-6 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Status</span>
              <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs">
                Active
              </span>
            </div>

            <div>
              <label className="text-sm text-gray-600">Verification</label>
              <select className="w-full border rounded-lg px-3 py-2 mt-1 text-sm">
                <option>Verified</option>
                <option>Pending</option>
                <option>Rejected</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-gray-600">Membership</label>
              <select className="w-full border rounded-lg px-3 py-2 mt-1 text-sm">
                <option>Premium</option>
                <option>Basic</option>
                <option>Trial</option>
              </select>
            </div>
          </div>

          {/* RIGHT */}
          <div className="bg-white rounded-xl p-6 text-sm text-gray-600 space-y-2">
            <p>Profile Created: <strong>12-Jun-2025</strong></p>
            <p>Last Updated: <strong>03-Nov-2025</strong></p>
            <p>Profile Completion: <strong>100%</strong></p>
            <p>Profile ID: <strong>MAT10231</strong></p>

            <div className="flex gap-4 mt-6">
              <button
                className="bg-[#991CDD] text-white px-6 py-2 rounded-lg text-sm hover:bg-[#8a1bc7]"
                onClick={handleSuspend}
              >
                Suspend
              </button>
              <button
                className="border border-red-500 text-red-500 px-6 py-2 rounded-lg text-sm hover:bg-red-50"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ---------- Helpers ---------- */

const FormGrid = ({ children }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {children}
  </div>
);

const Input = ({ label, value, onChange, type = "text" }) => (
  <div>
    <label className="text-xs text-gray-500">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      className="w-full border rounded-lg px-3 py-2 text-sm"
    />
  </div>
);

const Select = ({ label, value, onChange, options = [] }) => (
  <div>
    <label className="text-xs text-gray-500">{label}</label>
    <select
      className="w-full border rounded-lg px-3 py-2 text-sm"
      value={value}
      onChange={onChange}
    >
      {options.map(option => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  </div>
);

export default EditProfilePage;