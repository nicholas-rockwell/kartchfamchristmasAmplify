// app/components/challenges/Day1/Day1Challenge.jsx
import React from 'react';
import { useState } from 'react';
import CameraCapture from '../CameraCapture';
import SubmitChallenge from '../SubmitChallenge';
import styles from '../challenges/day3.module.css';

const Day3Challenge = () => {
  const [photoFile, setPhotoFile] = useState(null); // State to hold the captured photo file
  const challengeType = "Photo";

  const handlePhotoCapture = (capturedPhoto) => {
    setPhotoFile(capturedPhoto); // Store the captured photo in the state
  };

  return (
    <div className={styles.container}>
      <span className={styles.photoChallenge}>Photo Challenge!</span>
      <p className={styles.information}>
        Build a snowman using anything nearby! Snap a photo with it and upload
        before time melts away! Five points awarded for submission, additional
        points may be awarded for creativity!
      </p>
      <CameraCapture onPhotoCapture={handlePhotoCapture} />
      <SubmitChallenge
        challengeId={3}
        challengeType={challengeType}
        externalData={photoFile}
      />
    </div>
  );
};

export default Day3Challenge;