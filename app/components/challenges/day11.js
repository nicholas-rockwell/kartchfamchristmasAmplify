import React from 'react';
import styles from '../challenges/day11.module.css';
import PhotoTrivia from '../PhotoTrivia';
import SubmitChallenge from '../SubmitChallenge';
import { useState } from 'react';

const Day11Challenge = () => {
  const [external_data, setExternalData] = useState(null);
  const challengeType = "2024Day11WhosThatFamilyMember";

  const handlePhotoTriviaSubmit = (external_data) => {
    setExternalData(external_data);
  }

  return (
    <div className={ styles.container }>
      <span className={ styles.triviaChallenge }>???</span>
      <p className={ styles.information }>
        
      </p>
      { <PhotoTrivia trivia_id={challengeType} onPhotoTriviaSubmit={ handlePhotoTriviaSubmit }/> }
      <SubmitChallenge
          challengeId={11}
          challengeType={challengeType}
          externalData={external_data}
          disabled={!external_data}
        />
      </div>
  );
};

export default Day11Challenge;