import React from 'react';
import styles from '../challenges/day9.module.css';
import TriviaGame from '../TriviaGame';
import SubmitChallenge from '../SubmitChallenge';
import { useState } from 'react';

const Day9Challenge = () => {
  const [external_data, setExternalData] = useState(null);
  const challengeType = "2024Day9FamilyTrivia";

  const handleTriviaGameSubmit = (external_data) => {
    setExternalData(external_data);
  }

  return (
    <div className={ styles.container }>
      <span className={ styles.triviaChallenge }>Trivia Challenge!</span>
      <p className={ styles.information }>
      One last test to see how well you know the fam, best of luck!
      </p>
      { <TriviaGame trivia_id={challengeType} onTriviaGameSubmit={ handleTriviaGameSubmit }/> }
      <SubmitChallenge
          challengeId={9}
          challengeType={challengeType}
          externalData={external_data}
          disabled={!external_data}
        />
      </div>
  );
};

export default Day9Challenge;