import React from 'react';
import styles from '../challenges/day12.module.css';
import TriviaGame from '../TriviaGame';
import SubmitChallenge from '../SubmitChallenge';
import { useState } from 'react';

const Day12Challenge = () => {
  const [external_data, setExternalData] = useState(null);
  const challengeType = "2024Day12SensoryGame";

  const handleTriviaGameSubmit = (external_data) => {
    setExternalData(external_data);
  }

  return (
    <div className={ styles.container }>
      <span className={ styles.triviaChallenge }>Sense It!</span>
      <p className={ styles.information }>
      How much do you trust your senses? Enter your answers
      to our game below and your final points will be tallied!
      </p>
      { <TriviaGame trivia_id={challengeType} onTriviaGameSubmit={ handleTriviaGameSubmit }/> }
      <SubmitChallenge
          challengeId={12}
          challengeType={challengeType}
          externalData={external_data}
          disabled={!external_data}
        />
      </div>
  );
};

export default Day12Challenge;