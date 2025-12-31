/* eslint-disable react-hooks/rules-of-hooks */
import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useGetProfileByProfileIdQuery } from "../../context/profileApi";
import OthersEmptyBiodata, { emptyBiodata } from "./OthersEmptyBiodata";
import defaultProfileImg from "../../assets/DefaultImage/AvtarImg.avif";

export default function OthersEmptyBiodataPage() {
  const { profileId } = useParams();

  console.log("Profile ID from URL:", profileId);

  if (!profileId) {
    return <p className="text-center mt-10">Invalid Profile ID</p>;
  }

  const { data, isLoading, isError } =
    useGetProfileByProfileIdQuery(profileId);

  const mappedData = useMemo(() => {
    if (!data?.data) return emptyBiodata;

    const d = data.data;
    const p = d.userProfile || {};
    const h = d.horoscopeDetails || {};
    const e = d.educationAndProfession || {};
    const f = d.familyBackground || {};
    const pp = d.partnerPreference || {};

    const profileImage =
      d.hasProfilePhoto &&
      d.profilePhotoBase64 &&
      d.profilePhotoContentType
        ? `data:${d.profilePhotoContentType};base64,${d.profilePhotoBase64}`
        : defaultProfileImg;

    return {
      userId: d.userId,
      profileImage,

      /* PERSONAL */
      fullName: `${p.firstName || ""} ${p.middleName || ""} ${p.lastName || ""}`
        .replace(/\s+/g, " ")
        .trim(),
      age: p.age,
      gender: p.gender,
      maritalStatus: p.maritalStatus,
      religion: p.religion,
      caste: p.caste,
      height: p.height,
      weight: p.weight,
      bloodGroup: p.bloodGroup,
      complexion: p.complexion,
      diet: p.diet,
      spectacle: p.spectacle ? "Yes" : "No",
      lens: p.lens ? "Yes" : "No",
      physicallyChallenged: p.physicallyChallenged ? "Yes" : "No",
      currentCity: p.currentCity,
      taluka: p.taluka,

      /* HOROSCOPE */
      birthDate: h.dob?.split("T")[0],
      birthTime: h.time,
      birthPlace: h.birthPlace,
      rashi: h.rashi,
      nakshatra: h.nakshatra,
      charan: h.charan,
      nadi: h.nadi,
      gan: h.gan,
      mangal: h.mangal,
      gotra: h.gotra,

      /* EDUCATION */
      education: e.education,
      degree: e.degree,
      occupation: e.occupation,
      annualIncome: e.formattedIncome,

      /* FAMILY */
      fatherName: f.fathersName,
      motherName: f.mothersName,
      brothers: f.brother,
      marriedBrothers: f.marriedBrothers,
      sisters: f.sisters,
      marriedSisters: f.marriedSisters,
      parentsResidingIn: f.parentResiding,
      parentsOccupation: f.fatherOccupation,
      mamaSurname: f.mamaSurname,
      mamaPlace: f.mamaPlace,

      /* PARTNER */
      partnerCities: pp.cityLivingIn,
      partnerEducation: pp.education,
      partnerOccupation: pp.partnerOccupation,
      partnerIncome: pp.formattedIncome,
      partnerAge: pp.ageRange,
      partnerCaste: pp.caste,
      partnerHeight: pp.heightRange,
      partnerMangal:
        pp.mangal === true ? "Yes" : pp.mangal === false ? "No" : "",
    };
  }, [data]);

  if (isLoading) return <p className="text-center mt-10">Loading profile…</p>;
  if (isError)
    return (
      <p className="text-center mt-10 text-red-500">
        Failed to load profile
      </p>
    );

  return <OthersEmptyBiodata data={mappedData} />;
}
