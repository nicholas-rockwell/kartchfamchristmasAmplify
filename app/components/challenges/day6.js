import React from 'react';
import { useState } from 'react';
import CameraCapture from '../CameraCapture';
import SubmitChallenge from '../SubmitChallenge';
import styles from '../challenges/day6.module.css';

const Day6Challenge = () => {
  const [photoFile, setPhotoFile] = useState(null); // State to hold the captured photo file
  const challengeType = "Photo";

  const handlePhotoCapture = (capturedPhoto) => {
    setPhotoFile(capturedPhoto); // Store the captured photo in the state
  };

  return (
    <div className={ styles.container }>
      <span className={ styles.photoChallenge }>Photo Challenge!</span>
      <p className={ styles.information }>
      We need more decorations! Create a tree-topping star out of materials
      found around you. Once done, channel your inner Christmas
      Tree! Submit a photo of you with your star atop your head!
      </p>
      <CameraCapture onPhotoCapture={ handlePhotoCapture } />
      <SubmitChallenge challengeId={ 6 } challengeType={ challengeType } externalData={ photoFile }/>
    </div>
  );
};

export default Day6Challenge;