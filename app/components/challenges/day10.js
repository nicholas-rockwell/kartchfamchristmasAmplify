"use client";

import React, { useState } from "react";
import styles from "../challenges/day10.module.css";
import SubmitChallenge from "../SubmitChallenge";
import MiniCrossword from "../MiniCrossword";

const Day10Challenge = () => {
  const [crosswordData, setCrosswordData] = useState(null); // Store crossword results
  const challengeType = "Crossword";

  const handleCrosswordSubmit = ({ isCorrect, timeTaken }) => {
    // Structure the data to pass to SubmitChallenge
    const submissionData = {
      completed: isCorrect,
      timeTaken: timeTaken,
    };

    setCrosswordData(submissionData);
  };

  return (
    <div className={styles.container}>
      <span className={styles.photoChallenge}>Crossword Challenge!</span>
      <p className={styles.information}>
        Todays crossword is worth five points, and up to five additional points
        for finishing quickly!
      </p>
      <MiniCrossword
        onSubmit={handleCrosswordSubmit}
      />
      <SubmitChallenge
        challengeId={10}
        challengeType={challengeType}
        externalData={crosswordData}
      />
    </div>
  );
};

export default Day10Challenge;
