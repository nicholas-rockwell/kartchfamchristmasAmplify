import React from 'react';
import styles from '../challenges/day7.module.css';
import TriviaGame from '../TriviaGame';
import SubmitChallenge from '../SubmitChallenge';
import { useState } from 'react';

const Day7Challenge = () => {
  const [external_data, setExternalData] = useState(null);
  const challengeType = "2024Day7ChristmasTrivia";

  const handleTriviaGameSubmit = (external_data) => {
    setExternalData(external_data);
  }

  return (
    <div className={ styles.container }>
      <span className={ styles.triviaChallenge }>Trivia Challenge!</span>
      <p className={ styles.information }>
      Its Christmas trivia again! Have you expanded your christmas
      knowledge?
      </p>
      { <TriviaGame trivia_id={challengeType} onTriviaGameSubmit={ handleTriviaGameSubmit }/> }
      <SubmitChallenge
          challengeId={7}
          challengeType={challengeType}
          externalData={external_data}
          disabled={!external_data}
        />
      </div>
  );
};

export default Day7Challenge;