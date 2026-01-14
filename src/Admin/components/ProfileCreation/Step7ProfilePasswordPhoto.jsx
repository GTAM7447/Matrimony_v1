// import React, { useState, useMemo } from "react";
// import { FaUpload } from "react-icons/fa";
// import { motion } from "framer-motion";
// import { CheckCircle } from "lucide-react";
// import Stepper from "./Stepper";
// import { useNavigate } from "react-router-dom";
// import { useUploadDocumentMutation } from "../../context/createProfile";

// const Step7ProfilePasswordPhoto = ({
//   nextStep,
//   prevStep,
//   goToStep,
//   data,
//   setData,
//   step,
//   completedStep,
//   hasDataForStep,
// }) => {
//   const navigate = useNavigate();

//   // MEMOIZED FORM DATA (PREVENT EXTRA RERENDERS)
//   const formData = useMemo(() => data, [data]);

//   const [showModal, setShowModal] = useState(false);
//   const [uploading, setUploading] = useState(false);

//   const [uploadDocument] = useUploadDocumentMutation();

//   /* ---------------- FILE CHANGE ---------------- */
//   const handleFileChange = (e) => {
//     const { name, files } = e.target;
//     if (!files || !files[0]) return;

//     setData({ ...formData, [name]: files[0] });
//   };

//   /* ---------------- VALIDATION ---------------- */
//   const isComplete =
//     formData.profilePhoto &&
//     formData.biodata &&
//     formData.leavingCertificate &&
//     formData.adhaarPhoto &&
//     formData.panCard &&
//     formData.salarySlip;

//   /* ---------------- FINISH & UPLOAD ---------------- */
//   const handleFinish = async () => {
//     if (!isComplete || uploading) return;

//     setUploading(true);

//     try {
//       const uploads = [
//         { field: "panCard", documentType: "PAN_CARD" },
//         { field: "profilePhoto", documentType: "PROFILE_PHOTO" },
//         { field: "biodata", documentType: "OTHER" },
//         { field: "salarySlip", documentType: "OTHER" },
//         { field: "leavingCertificate", documentType: "EDUCATION_CERTIFICATE" },
//         { field: "adhaarPhoto", documentType: "AADHAAR_CARD" },
//       ];

//       // 🚀 PARALLEL UPLOADS (PERFORMANCE BOOST)
//       const uploadPromises = uploads
//         .filter(({ field }) => formData[field])
//         .map(({ field, documentType }) =>
//           uploadDocument({
//             documentType,
//             file: formData[field],
//             description: `${field} uploaded`,
//           }).unwrap()
//         );

//       await Promise.all(uploadPromises);

//       setShowModal(true);
//     } catch (error) {
//       console.error("Upload Error:", error);
//       alert(
//         "Document upload failed: " +
//           (error?.data?.message ||
//             error?.message ||
//             "Please try again.")
//       );
//     } finally {
//       setUploading(false);
//     }
//   };

//   /* ---------------- CONTINUE ---------------- */
//   const handleContinue = () => {
//     setShowModal(false);
//     nextStep && nextStep();
//     navigate("/my-profile");
//   };

//   /* ---------------- STYLES ---------------- */
//   const labelStyle = {
//     fontSize: "15px",
//     fontFamily: "'Inter', sans-serif",
//     fontWeight: 600,
//     marginBottom: "4px",
//   };

//   const uploadBoxStyle = {
//     backgroundColor: "#55A7FF14",
//     border: "2px dashed #55A7FF",
//     borderRadius: "10px",
//     padding: "22px",
//   };

//   return (
//     <div className="w-full max-w-[95%] lg:max-w-[95%] xl:max-w-[90%] mx-auto font-[Inter] flex flex-col">
//       {/* HEADER */}
//       <div
//         className="px-10 py-1 rounded-t-xl"
//         style={{ backgroundColor: "#FF8C4426" }}
//       >
//         <Stepper
//           step={step}
//           completedStep={completedStep}
//           goToStep={goToStep}
//           hasDataForStep={hasDataForStep}
//         />
//       </div>

//       {/* MAIN */}
//       <div className="px-10 py-8" style={{ backgroundColor: "#FF8C4405" }}>
//         <h3 className="text-center text-orange-400 font-semibold uppercase mb-8 tracking-wide text-xl">
//           Profile Password and Photo
//         </h3>

//         {/* UPLOAD GRID */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {[
//             { label: "Upload PAN Card", name: "panCard", accept: ".jpg,.jpeg,.png,.pdf" },
//             { label: "Your Profile Photo", name: "profilePhoto", accept: "image/*" },
//             { label: "Upload Biodata", name: "biodata", accept: ".pdf,.doc,.docx" },
//             { label: "Upload Salary Slip", name: "salarySlip", accept: ".pdf,.jpg,.jpeg,.png" },
//             { label: "Leaving Certificate", name: "leavingCertificate", accept: ".pdf,.jpg,.jpeg,.png" },
//             { label: "Upload Aadhaar Photo", name: "adhaarPhoto", accept: ".jpg,.jpeg,.png" },
//           ].map((item) => (
//             <div key={item.name}>
//               <label style={labelStyle}>
//                 {item.label} <span className="text-red-500">*</span>
//               </label>

//               <div
//                 className="cursor-pointer text-center flex flex-col items-center justify-center"
//                 style={uploadBoxStyle}
//               >
//                 <label className="cursor-pointer flex flex-col items-center text-gray-700">
//                   <FaUpload className="text-2xl mb-2" />
//                   <span className="font-medium text-sm">
//                     {formData[item.name] ? "Uploaded" : "Upload"}
//                   </span>

//                   <input
//                     type="file"
//                     name={item.name}
//                     accept={item.accept}
//                     onChange={handleFileChange}
//                     className="hidden"
//                     disabled={uploading}
//                   />
//                 </label>

//                 {formData[item.name] && (
//                   <p className="text-xs text-green-600 mt-2 font-medium truncate max-w-full">
//                     {formData[item.name].name}
//                   </p>
//                 )}
//               </div>

//               {item.name === "profilePhoto" && (
//                 <p className="text-xs text-gray-500 mt-1">
//                   (You can crop and upload new photos after login.)
//                 </p>
//               )}

//               {item.name === "biodata" && (
//                 <p className="text-xs text-gray-500 mt-1">
//                   (Upload Marathi Biodata Photo.)
//                 </p>
//               )}
//             </div>
//           ))}
//         </div>

//         {/* BUTTONS */}
//         <div className="mt-6 flex justify-end gap-4 pr-4">
//           <button
//             type="button"
//             onClick={prevStep}
//             disabled={uploading}
//             className="bg-white text-orange-600 px-10 py-3 rounded-xl border border-orange-500 disabled:opacity-50"
//           >
//             Previous
//           </button>

//           <button
//             type="button"
//             onClick={handleFinish}
//             disabled={!isComplete || uploading}
//             className={`px-10 py-3 rounded-xl text-white ${
//               isComplete && !uploading
//                 ? "bg-orange-400 hover:bg-orange-500"
//                 : "bg-gray-400 cursor-not-allowed"
//             }`}
//           >
//             {uploading ? "Uploading documents..." : "Finish"}
//           </button>
//         </div>
//       </div>

//       {/* SUCCESS MODAL */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
//           <motion.div
//             initial={{ scale: 0.8, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             transition={{ duration: 0.3 }}
//             className="bg-white rounded-2xl p-8 shadow-lg text-center w-[90%] sm:w-[400px]"
//           >
//             <CheckCircle className="text-green-500 w-14 h-14 mx-auto mb-4" />

//             <h2 className="text-xl font-semibold text-gray-800">Successful</h2>

//             <p className="text-gray-600 mt-2">
//               Congratulations, your Profile has been successfully created.
//             </p>

//             <button
//               onClick={handleContinue}
//               className="mt-6 bg-orange-500 text-white font-medium px-6 py-2 rounded-full hover:bg-orange-600 transition"
//             >
//               Continue
//             </button>
//           </motion.div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Step7ProfilePasswordPhoto;




















// components/registration/steps/Step7ProfilePasswordPhoto.jsx
import React, { useState } from "react";
import { FaUpload } from "react-icons/fa";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Step7ProfilePasswordPhoto = ({ formData, onInputChange, onBack }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadErrors, setUploadErrors] = useState({});

  // Required fields
  const requiredFields = ["profilePhoto", "biodata"];

  /* ---------------- FILE CHANGE ---------------- */
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (!files || !files[0]) return;

    const file = files[0];
    const error = validateFile(name, file);
    
    if (error) {
      setUploadErrors(prev => ({ ...prev, [name]: error }));
      return;
    }

    // Clear any previous error
    setUploadErrors(prev => ({ ...prev, [name]: "" }));
    
    // Update form data
    onInputChange(name, file);
  };

  /* ---------------- FILE VALIDATION ---------------- */
  const validateFile = (name, file) => {
    if (!file) return "Please select a file";

    const fileSizeMB = file.size / (1024 * 1024); // Convert to MB
    const fileName = file.name.toLowerCase();

    switch (name) {
      case "profilePhoto":
        // Validate image
        if (!file.type.startsWith('image/')) {
          return "Only image files are allowed (JPG, PNG, JPEG)";
        }
        if (fileSizeMB > 5) {
          return "Image size must be less than 5MB";
        }
        return "";
        
      case "multiplePhotos":
        // Validate multiple images
        if (!file.type.startsWith('image/')) {
          return "Only image files are allowed (JPG, PNG, JPEG)";
        }
        if (fileSizeMB > 10) {
          return "Image size must be less than 10MB";
        }
        return "";
        
      case "biodata":
        // Validate biodata document
        const allowedExtensions = ['.pdf', '.doc', '.docx'];
        const hasValidExtension = allowedExtensions.some(ext => 
          fileName.endsWith(ext)
        );
        if (!hasValidExtension) {
          return "Only PDF, DOC, or DOCX files are allowed";
        }
        if (fileSizeMB > 20) {
          return "File size must be less than 20MB";
        }
        return "";
        
      default:
        return "";
    }
  };

  /* ---------------- FORM VALIDATION ---------------- */
  const isComplete = () => {
    return requiredFields.every(field => formData[field]);
  };

  /* ---------------- FINISH HANDLER ---------------- */
  const handleFinish = async () => {
    if (!isComplete() || uploading) return;

    // Validate all files first
    const errors = {};
    let hasErrors = false;

    ["profilePhoto", "multiplePhotos", "biodata"].forEach(field => {
      if (formData[field]) {
        const error = validateFile(field, formData[field]);
        if (error) {
          errors[field] = error;
          hasErrors = true;
        }
      }
    });

    if (hasErrors) {
      setUploadErrors(errors);
      return;
    }

    setUploading(true);

    try {
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setShowModal(true);
    } catch (error) {
      console.error("Upload Error:", error);
      alert("Document upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  /* ---------------- CONTINUE HANDLER ---------------- */
  const handleContinue = () => {
    setShowModal(false);
    navigate("/my-profile");
  };

  /* ---------------- STYLES ---------------- */
  const labelStyle = {
    fontSize: "15px",
    fontFamily: "'Inter', sans-serif",
    fontWeight: 600,
    marginBottom: "4px",
    display: "block",
  };

  const getUploadBoxStyle = (hasFile, hasError) => {
    const baseStyle = {
      backgroundColor: "#FDF8FF",
      border: hasError ? "2px dashed #ef4444" : "2px dashed #8180801c",
      borderRadius: "6px",
      padding: "22px",
      minHeight: "120px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      transition: "all 0.3s ease",
    };

    if (hasFile && !hasError) {
      return {
        ...baseStyle,
        backgroundColor: "#E8F4FD",
        borderColor: "#10B981",
      };
    }

    return baseStyle;
  };

  /* ---------------- FILE INFO ---------------- */
  const getFileInfo = (file) => {
    if (!file) return null;
    
    const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
    return `${file.name} (${fileSizeMB} MB)`;
  };

  /* ---------------- UPLOAD FIELDS CONFIG ---------------- */
  const uploadFields = [
    {
      label: "Your Profile Photo",
      name: "profilePhoto",
      accept: "image/*",
      required: true,
      description: "Clear face photo (JPG, PNG, max 5MB)",
      allowedTypes: "JPG, PNG, JPEG",
      maxSize: "5MB"
    },
    {
      label: "Multiple Photos",
      name: "multiplePhotos",
      accept: "image/*",
      required: false,
      description: "Additional photos (JPG, PNG, max 10MB)",
      allowedTypes: "JPG, PNG, JPEG",
      maxSize: "10MB"
    },
    {
      label: "Upload Biodata",
      name: "biodata",
      accept: ".pdf,.doc,.docx",
      required: true,
      description: "Marathi biodata document (PDF, DOC, DOCX, max 20MB)",
      allowedTypes: "PDF, DOC, DOCX",
      maxSize: "20MB"
    },
  ];

  // Check if all required fields are filled
  const isFormValid = isComplete();

  return (
    <div className="w-full mx-auto font-[Inter]">
      {/* FORM HEADER */}
      <div
        className="px-4 sm:px-6 md:px-10 py-1 rounded-t-xl overflow-x-auto"
        style={{ backgroundColor: "#991CDD26" }}
      >
        <h3 className="text-center text-[#991CDD] font-[Inter] font-semibold uppercase mb-4 mt-4 tracking-wide text-xl">
          Upload Photos & Documents
        </h3>
      </div>

      {/* FORM GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm text-gray-700 mt-2 p-3" style={{ backgroundColor: "#FDF8FF" }}>
        
        {uploadFields.map((item) => (
          <div key={item.name} className="h-full">
            <label style={labelStyle}>
              {item.label} {item.required && <span className="text-red-500">*</span>}
            </label>

            <div className="relative">
              <label className="cursor-pointer block">
                <div
                  style={getUploadBoxStyle(
                    formData[item.name],
                    uploadErrors[item.name]
                  )}
                  className="hover:opacity-90"
                >
                  <FaUpload className={`text-2xl mb-2 ${
                    formData[item.name] && !uploadErrors[item.name] 
                      ? "text-green-500" 
                      : uploadErrors[item.name] 
                        ? "text-red-500" 
                        : "text-blue-500"
                  }`} />
                  
                  <span className={`font-medium text-sm ${
                    formData[item.name] && !uploadErrors[item.name]
                      ? "text-green-600"
                      : uploadErrors[item.name]
                        ? "text-red-600"
                        : "text-gray-700"
                  }`}>
                    {formData[item.name] 
                      ? uploadErrors[item.name] 
                        ? "Error - Click to re-upload" 
                        : "Uploaded ✓" 
                      : "Click to upload"}
                  </span>

                  <input
                    type="file"
                    name={item.name}
                    accept={item.accept}
                    onChange={handleFileChange}
                    className="hidden"
                    disabled={uploading}
                  />
                </div>
              </label>

              {/* File Info */}
              {formData[item.name] && !uploadErrors[item.name] && (
                <div className="mt-2 p-2 bg-green-50 rounded border border-green-200">
                  <p className="text-xs text-green-700 font-medium truncate">
                    {getFileInfo(formData[item.name])}
                  </p>
                </div>
              )}

              {/* Error Message */}
              {uploadErrors[item.name] && (
                <div className="mt-2 p-2 bg-red-50 rounded border border-red-200">
                  <p className="text-xs text-red-600 font-medium">
                    {uploadErrors[item.name]}
                  </p>
                </div>
              )}

              {/* File Requirements */}
              <div className="mt-2">
                <p className="text-xs text-gray-500">
                  <strong>Allowed:</strong> {item.allowedTypes}
                </p>
                <p className="text-xs text-gray-500">
                  <strong>Max size:</strong> {item.maxSize}
                </p>
                {item.description && (
                  <p className="text-xs text-gray-500 mt-1">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}

      </div>

      {/* Upload Status */}
      {uploading && (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500 mr-3"></div>
            <p className="text-blue-600 font-medium">Uploading files...</p>
          </div>
          <p className="text-xs text-blue-500 text-center mt-2">
            Please don't close this page
          </p>
        </div>
      )}
    </div>
  );
};

export default Step7ProfilePasswordPhoto;