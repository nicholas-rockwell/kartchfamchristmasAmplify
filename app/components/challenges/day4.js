import React from 'react';
import styles from '../challenges/day4.module.css';
import TriviaGame from '../TriviaGame';
import SubmitChallenge from '../SubmitChallenge';
import { useState } from 'react';

const Day4Challenge = () => {
  const [external_data, setExternalData] = useState(null);
  const challengeType = "2024Day4ChristmasTrivia";

  const handleTriviaGameSubmit = (external_data) => {
    setExternalData(external_data);
  }

  return (
    <div className={ styles.container }>
      <span className={ styles.triviaChallenge }>Trivia Challenge!</span>
      <p className={ styles.information }>
      Do you have the holiday spirit? Lets test it with some trivia!
      Lock In and Submit your answers below!
      </p>
      { <TriviaGame trivia_id={challengeType} onTriviaGameSubmit={ handleTriviaGameSubmit }/> }
      <SubmitChallenge
          challengeId={4}
          challengeType={challengeType}
          externalData={external_data}
          disabled={!external_data}
        />
    </div>
  );
};

export default Day4Challenge;