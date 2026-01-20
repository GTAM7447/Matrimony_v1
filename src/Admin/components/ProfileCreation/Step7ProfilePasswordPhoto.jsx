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

  // No required fields - all are optional
  const requiredFields = [];

  /* ---------------- FILE CHANGE ---------------- */
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (!files || !files[0]) {
      // Clear the field if file is removed
      onInputChange(name, null);
      setUploadErrors(prev => ({ ...prev, [name]: "" }));
      return;
    }

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
    if (!file) return "";

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
    return true; // All fields are optional, so always returns true
  };

  /* ---------------- FINISH HANDLER ---------------- */
  const handleFinish = async () => {
    if (uploading) return;

    // Validate all files first if they exist
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
      required: false,
      description: "Clear face photo (JPG, PNG, max 5MB, optional)",
      allowedTypes: "JPG, PNG, JPEG",
      maxSize: "5MB"
    },
    {
      label: "Multiple Photos",
      name: "multiplePhotos",
      accept: "image/*",
      required: false,
      description: "Additional photos (JPG, PNG, max 10MB, optional)",
      allowedTypes: "JPG, PNG, JPEG",
      maxSize: "10MB"
    },
    {
      label: "Upload Biodata",
      name: "biodata",
      accept: ".pdf,.doc,.docx",
      required: false,
      description: "Marathi biodata document (PDF, DOC, DOCX, max 20MB, optional)",
      allowedTypes: "PDF, DOC, DOCX",
      maxSize: "20MB"
    },
  ];

  return (
    <div className="w-full mx-auto font-[Inter]">
      {/* FORM HEADER */}
      <div
        className="px-4 sm:px-6 md:px-10 py-1 rounded-t-xl overflow-x-auto"
        style={{ backgroundColor: "#991CDD26" }}
      >
        <h3 className="text-center text-[#991CDD] font-[Inter] font-semibold uppercase mb-4 mt-4 tracking-wide text-xl">
          Upload Photos & Documents (Optional)
        </h3>
      </div>

      {/* FORM GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm text-gray-700 mt-2 p-3" style={{ backgroundColor: "#FDF8FF" }}>
        
        {uploadFields.map((item) => (
          <div key={item.name} className="h-full">
            <label style={labelStyle}>
              {item.label}
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
                        : "text-gray-500"
                  }`} />
                  
                  <span className={`font-medium text-sm ${
                    formData[item.name] && !uploadErrors[item.name]
                      ? "text-green-600"
                      : uploadErrors[item.name]
                        ? "text-red-600"
                        : "text-gray-600"
                  }`}>
                    {formData[item.name] 
                      ? uploadErrors[item.name] 
                        ? "Error - Click to re-upload" 
                        : "Uploaded" 
                      : "Click to upload (optional)"}
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

              {/* Clear Button for uploaded files */}
              {formData[item.name] && !uploadErrors[item.name] && (
                <div className="mt-2 flex justify-between items-center">
                  <div className="p-2 bg-green-50 rounded border border-green-200 flex-1 mr-2">
                    <p className="text-xs text-green-700 font-medium truncate">
                      {getFileInfo(formData[item.name])}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      onInputChange(item.name, null);
                      setUploadErrors(prev => ({ ...prev, [item.name]: "" }));
                    }}
                    className="text-xs text-red-600 hover:text-red-800 px-2 py-1 bg-red-50 rounded border border-red-200"
                    disabled={uploading}
                  >
                    Remove
                  </button>
                </div>
              )}

              {/* Error Message */}
              {uploadErrors[item.name] && (
                <div className="mt-2 flex justify-between items-center">
                  <div className="p-2 bg-red-50 rounded border border-red-200 flex-1 mr-2">
                    <p className="text-xs text-red-600 font-medium">
                      {uploadErrors[item.name]}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      onInputChange(item.name, null);
                      setUploadErrors(prev => ({ ...prev, [item.name]: "" }));
                    }}
                    className="text-xs text-red-600 hover:text-red-800 px-2 py-1 bg-red-50 rounded border border-red-200"
                    disabled={uploading}
                  >
                    Clear
                  </button>
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

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl p-8 shadow-lg text-center w-[90%] sm:w-[400px]"
          >
            <CheckCircle className="text-green-500 w-14 h-14 mx-auto mb-4" />

            <h2 className="text-xl font-semibold text-gray-800">Successful</h2>

            <p className="text-gray-600 mt-2">
              Your documents have been successfully uploaded.
            </p>

            <button
              onClick={handleContinue}
              className="mt-6 bg-orange-500 text-white font-medium px-6 py-2 rounded-full hover:bg-orange-600 transition"
            >
              Continue
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Step7ProfilePasswordPhoto;