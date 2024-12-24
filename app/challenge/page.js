"use client"; // Mark the file as a client-side component

import styles from '../challenge/page.module.css';
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import the challenge components for each day
const ChallengeDay1 = dynamic(() => import("../components/challenges/day1"));
const ChallengeDay2 = dynamic(() => import("../components/challenges/day2"));
const ChallengeDay3 = dynamic(() => import("../components/challenges/day3"));
const ChallengeDay4 = dynamic(() => import("../components/challenges/day4"));
const ChallengeDay5 = dynamic(() => import("../components/challenges/day5"));
const ChallengeDay6 = dynamic(() => import("../components/challenges/day6"));
const ChallengeDay7 = dynamic(() => import("../components/challenges/day7"));
const ChallengeDay8 = dynamic(() => import("../components/challenges/day8"));
const ChallengeDay9 = dynamic(() => import("../components/challenges/day9"));
const ChallengeDay10 = dynamic(() => import("../components/challenges/day10"));
const ChallengeDay11 = dynamic(() => import("../components/challenges/day11"));
const ChallengeDay12 = dynamic(() => import("../components/challenges/day12"));


const ChallengePage = () => {
  const today = new Date(); // Get today's date as an example
  //const day = today.getDate();
  //const day = 24; // REMOVE FOR PROD , days are day in december

  let dayOfChristmas;
  switch (day) {
    case 13:
      dayOfChristmas = 1;
      break;
    case 14:
      dayOfChristmas = 2;
      break;
    case 15:
      dayOfChristmas = 3;
      break;
    case 16:
      dayOfChristmas = 4;
      break;
    case 17:
      dayOfChristmas = 5;
      break;
    case 18:
      dayOfChristmas = 6;
      break;
    case 19:
      dayOfChristmas = 7;
      break;
    case 20:
      dayOfChristmas = 8;
      break;
    case 21:
      dayOfChristmas = 9;
      break;
    case 22:
      dayOfChristmas = 10;
      break;
    case 23:
      dayOfChristmas = 11;
      break;
    case 24:
      dayOfChristmas = 12;
      break;
    default:
      dayOfChristmas = null; // If the day is not between 13 and 24
  }

  // Dynamically load the component for the selected challenge day
  const getChallengeComponent = (dayOfChristmas) => {

    switch (dayOfChristmas) {
      case 1:
        return <ChallengeDay1 />;
      case 2:
        return <ChallengeDay2 />;
      case 3:
        return <ChallengeDay3 />;
      case 4:
        return <ChallengeDay4 />;
      case 5:
        return <ChallengeDay5 />;
      case 6:
        return <ChallengeDay6 />;
      case 7:
        return <ChallengeDay7 />;
      case 8:
        return <ChallengeDay8 />;
      case 9:
        return <ChallengeDay9 />;
      case 10:
        return <ChallengeDay10 />;
      case 11:
        return <ChallengeDay11 />;
      case 12:
        return <ChallengeDay12 />;
      default:
        return <div>An error has occurred, contacting Nicholas. . .</div>;
    }
  };

  return (
    <div className={styles.backgroundFull}>
      <div className={styles.container}>
        <h1 className={styles.challengeHeader}>
          Day {dayOfChristmas} Challenge
        </h1>
        <div className={ styles.componentContainer }>{getChallengeComponent(dayOfChristmas)}</div>
      </div>
    </div>
  );
};

export default ChallengePage;