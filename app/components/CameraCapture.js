"use client";

import React, { useState } from "react";
import styles from "../components/CameraCapture.module.css";
import Image from "next/image";

const CameraCapture = ({ onPhotoCapture }) => {
  const [photoPreview, setPhotoPreview] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPhotoPreview(URL.createObjectURL(file)); // Show a preview of the photo
      if (onPhotoCapture) {
        onPhotoCapture(file); // Pass the file to the parent component
      }
    }
  };

  return (
    <div className={styles.cameraContainer}>
      <p>Click the button below to take a photo!</p>

      {/* Camera/Photo Input */}
      <input
        type="file"
        accept="image/*"
        capture="environment" // Use "environment" to prefer the rear camera
        onChange={handleFileChange}
        style={{ display: "none" }}
        id="photo-input"
      />

      {/* Button to trigger the file input */}
      <button
        onClick={() => document.getElementById("photo-input").click()}
        className={styles.submitButton}
      >
        Open Camera
      </button>

      {/* Display the photo preview */}
      {photoPreview && (
        <div>
          <h4>Photo Preview:</h4>
          <Image
            src={photoPreview}
            alt="Captured Preview"
            width={300}
            height={300}
            style={{ maxWidth: "100%" }}
          />
        </div>
      )}
    </div>
  );
};

export default CameraCapture;