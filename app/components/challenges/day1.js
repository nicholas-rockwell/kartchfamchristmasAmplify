// app/components/challenges/Day1/Day1Challenge.jsx
import React from 'react';
import { useState } from 'react';
import styles from '../challenges/day1.module.css';
import Wordle from '../Wordle'
import SubmitChallenge from '../SubmitChallenge'

const Day1Challenge = () => {
  const [wordleAttempts, setwordleAttempts] = useState(null); 
  const challengeType = "Wordle";

  const handleWordleSubmit = (wordleAttempts) => {
    setwordleAttempts(wordleAttempts); 
  };
  
  return (
    <div className={styles.container}>
      <span className={styles.wordleChallenge}>Wordle Challenge!</span>
      <p className={styles.information}>
        Complete this <span className={styles.italicWord}>five</span> letter christmas wordle in 
        as few guesses as possible!
      </p>
      <div className={ styles.wordleBox }>
        {<Wordle targetWord="CAROL" onWordleSubmit={ handleWordleSubmit } />}
      </div>
      <div className={ styles.submitChallengeBox }>
        <SubmitChallenge
          challengeId={1}
          challengeType={challengeType}
          externalData={wordleAttempts}
          disabled={!wordleAttempts}
        />
      </div>
    </div>
  );
};

export default Day1Challenge;