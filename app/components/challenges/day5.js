import React from 'react';
import styles from '../challenges/day5.module.css';
import TriviaGame from '../TriviaGame';
import SubmitChallenge from '../SubmitChallenge';
import { useState } from 'react';

const Day5Challenge = () => {
  const [external_data, setExternalData] = useState(null);
  const challengeType = "2024Day5Riddles";

  const handleTriviaGameSubmit = (external_data) => {
    setExternalData(external_data);
  }

  return (
    <div className={ styles.container }>
      <span className={ styles.triviaChallenge }>Riddle Challenge!</span>
      <p className={ styles.information }>
      Points are awarded for creativity, give them your best shot!
      </p>
      { <TriviaGame trivia_id={challengeType} onTriviaGameSubmit={ handleTriviaGameSubmit }/> }
      <SubmitChallenge
          challengeId={5}
          challengeType={challengeType}
          externalData={external_data}
          disabled={!external_data}
        />
    </div>
  );
};

export default Day5Challenge;