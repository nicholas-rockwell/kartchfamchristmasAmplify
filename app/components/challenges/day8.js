import React from 'react';
import { useState } from 'react';
import CameraCapture from '../CameraCapture';
import SubmitChallenge from '../SubmitChallenge';
import styles from '../challenges/day8.module.css';

const Day8Challenge = () => {
  const [photoFile, setPhotoFile] = useState(null); // State to hold the captured photo file
  const challengeType = "Photo";

  const handlePhotoCapture = (capturedPhoto) => {
    setPhotoFile(capturedPhoto); // Store the captured photo in the state
  };

  return (
    <div className={ styles.container }>
      <span className={ styles.photoChallenge }>Photo Challenge!</span>
      <p className={ styles.information }>
      Find something green, something fluffy, and something round! 
      Now, snap a creative photo of you with your items!
      </p>
      <CameraCapture onPhotoCapture={ handlePhotoCapture } />
      <SubmitChallenge challengeId={ 8 } challengeType={ challengeType } externalData={ photoFile }/>
    </div>
  );
};

export default Day8Challenge;