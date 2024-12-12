import React from 'react';
import styles from '../challenges/day2.module.css';
import TriviaGame from '../TriviaGame';
import SubmitChallenge from '../SubmitChallenge';
import { useState } from 'react';

const Day2Challenge = () => {
  const [external_data, setExternalData] = useState(null);
  const challengeType = "2024Day2FamilyTrivia";

  const handleTriviaGameSubmit = (external_data) => {
    setExternalData(external_data);
  }

  return (
    <div className={ styles.container }>
      <span className={ styles.triviaChallenge }>Trivia Challenge!</span>
      <p className={ styles.information }>
      How well do you know the fam? Test your knowledge by 
      Locking In/Submitting the questions below!
      </p>
      { <TriviaGame trivia_id={challengeType} onTriviaGameSubmit={ handleTriviaGameSubmit }/> }
      <SubmitChallenge
          challengeId={2}
          challengeType={challengeType}
          externalData={external_data}
          disabled={!external_data}
        />
    </div>
  );
};

export default Day2Challenge;