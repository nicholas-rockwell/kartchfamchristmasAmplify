"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Use Next.js navigation hook
import styles from "../components/SubmitChallenge.module.css";

const SubmitChallenge = ({ challengeId, challengeType, onSubmit, externalData }) => {
  const [elapsedTime, setElapsedTime] = useState(0); // Timer in seconds
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const router = useRouter();

  // Timer Effect
  useEffect(() => {
    const startTime = Date.now();
    const timer = setInterval(() => {
      const currentTime = Date.now();
      setElapsedTime(Math.floor((currentTime - startTime) / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Retrieve sessionId from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedSessionId = localStorage.getItem("sessionId");
      if (!storedSessionId) {
        console.error("No sessionId found in localStorage.");
      }
      setSessionId(storedSessionId);
    }
  }, []);

  // Helper to upload photo to S3
  const uploadPhotoToS3 = async (uploadUrl) => {
    if (!uploadUrl || !externalData) {
      console.error("Missing pre-signed URL or photo file");
      return null;
    }

    try {
      const response = await fetch(uploadUrl, {
        method: "PUT",
        headers: {
          "Content-Type": externalData.type,
        },
        body: externalData,
      });

      if (!response.ok) {
        throw new Error(`Failed to upload photo: ${response.statusText}`);
      }

      // Extract the S3 URL from the pre-signed URL
      const photoUrl = uploadUrl.split("?")[0];
      // console.log("Photo uploaded to S3:", photoUrl);
      return photoUrl;
    } catch (error) {
      console.error("Error uploading photo to S3:", error);
      return null;
    }
  };

  // Handle submission
  const handleSubmit = async () => {
    if (!sessionId) {
      console.error("No sessionId available for submission.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Fetch pre-signed URL
      const preSignedResponse = await fetch(
        "https://ygf8fotvt3.execute-api.us-west-2.amazonaws.com/Prod/generate-url",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id: sessionId.split("-")[0], challenge_id: challengeId }),
        }
      );

      if (!preSignedResponse.ok) {
        throw new Error("Failed to fetch pre-signed URL.");
      }

      const preSignedData = await preSignedResponse.json();
      const parsedBody = JSON.parse(preSignedData.body);
      let photoUrl = null;

      // If photo challenge, upload photo
      if (challengeType === "Photo" && parsedBody.url) {
        photoUrl = await uploadPhotoToS3(parsedBody.url);
        if (!photoUrl) throw new Error("Photo upload failed.");
      }

      // Submit challenge data
      const submissionPayload = {
        user_id: sessionId.split("-")[0],
        challengeId: challengeId,
        timeTaken: elapsedTime,
        submission_data: challengeType === "Photo" ? { photoUrl } : externalData,
      };
      
      console.log(submissionPayload);

      const submissionResponse = await fetch(
        "https://ygf8fotvt3.execute-api.us-west-2.amazonaws.com/Prod/submit-challenge",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(submissionPayload),
        }
      );

      if (!submissionResponse.ok) {
        throw new Error("Challenge submission failed.");
      }

      const result = await submissionResponse.json();
      // console.log("Challenge submitted successfully:", result);

      // Trigger onSubmit callback
      if (onSubmit) onSubmit(result);

      // Redirect to main page
      router.push("/main");
    } catch (error) {
      console.error("Error submitting challenge:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Guard rendering if sessionId is not loaded
  if (!sessionId) return <p>Loading session data...</p>;

  return (
    <div className={styles.body}>
      {/* <p>
        Time Spent: {Math.floor(elapsedTime / 60)} minutes and{" "}
        {elapsedTime % 60} seconds
      </p> */}
      <button
        className={styles.submitButton}
        onClick={handleSubmit}
        disabled={isSubmitting || !externalData}
      >
        {isSubmitting ? "Submitting..." : "Submit Challenge"}
      </button>
    </div>
  );
};

export default SubmitChallenge;