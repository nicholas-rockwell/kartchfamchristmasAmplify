"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Leaderboard from "../components/Leaderboard";
import ChallengeButton from "../components/ChallengeButton";
import styles from "../main/page.module.css";

function MainPage() {
  const [sessionId, setSessionId] = useState(null);
  const [dayOfChristmas, setDayOfChristmas] = useState("Unknown");
  const [challengeTimeEstimate, setChallengeTimeEstimate] = useState(0);
  const [isChallengeAvailable, setIsChallengeAvailable] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedSessionId = localStorage.getItem("sessionId");

    if (!storedSessionId) {
      console.error("No session ID found. Redirecting to login...");
      router.push("/"); // Redirect to login page
    } else {
      setSessionId(storedSessionId);
    }

    const today = new Date();
    const currentHour = today.getHours();
    //const day = today.getDate();
    const day = 23;

    let calculatedDay = null;
    let timeEstimate = null;

    switch (day) {
      case 13:
        calculatedDay = "1st";
        timeEstimate = 10;
        break;
      case 14:
        calculatedDay = "2nd";
        timeEstimate = 5;
        break;
      case 15:
        calculatedDay = "3rd";
        timeEstimate = 15;
        break;
      case 16:
        calculatedDay = "4th";
        timeEstimate = 5;
        break;
      case 17:
        calculatedDay = "5th";
        timeEstimate = 10;
        break;
      case 18:
        calculatedDay = "6th";
        timeEstimate = 15;
        break;
      case 19:
        calculatedDay = "7th";
        timeEstimate = 5;
        break;
      case 20:
        calculatedDay = "8th";
        timeEstimate = 15;
        break;
      case 21:
        calculatedDay = "9th";
        timeEstimate = 10;
        break;
      case 22:
        calculatedDay = "10th";
        timeEstimate = 10;
        break;
      case 23:
        calculatedDay = "11th";
        timeEstimate = 5;
        break;
      case 24:
        calculatedDay = "12th";
        timeEstimate = 25;
        break;
      default:
        calculatedDay = "null";
        timeEstimate = 0;
    }

    setDayOfChristmas(calculatedDay);
    setChallengeTimeEstimate(timeEstimate);
    setIsChallengeAvailable(currentHour >= 6 && currentHour < 24);
  }, [router]);

  return (
    <div className={styles.container}>
      <ChallengeButton
        day={dayOfChristmas}
        disabled={!isChallengeAvailable}
        timeEstimate={challengeTimeEstimate}
      />
      <Leaderboard day={dayOfChristmas} />
    </div>
  );
}

export default MainPage;