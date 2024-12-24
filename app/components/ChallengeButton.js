"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "../components/ChallengeButton.module.css";

const ChallengeButton = ({ day, timeEstimate }) => {
  const router = useRouter();
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);

  const targetDate = "2024-12-24T19:30:00"; // yyyy-mm-ddThh:mm:ss

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      setLoading(true); // Start loading
      try {
        console.log("Fetching leaderboard data...");
        const sessionId = localStorage.getItem("sessionId");
        if (!sessionId) {
          throw new Error("No sessionId found in localStorage.");
        }

        const userId = sessionId.split("-")[0];
        const response = await fetch(
          "https://ygf8fotvt3.execute-api.us-west-2.amazonaws.com/Prod/leaderboard",
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch leaderboard: ${response.status}`);
        }

        const data = await response.json();
        const parsedData = JSON.parse(data.body || "[]");
        const currentUser = parsedData.find((entry) => entry.user_id === userId);

        if (currentUser?.challenge_status && day) {
          const dayNumber = day.match(/\d+/)?.[0] || "0";
          const dayKey = `Day${dayNumber}`;
          setHasSubmitted(currentUser.challenge_status[dayKey]?.BOOL ?? false);
        }
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    if (day !== null && day !== undefined) {
      fetchLeaderboardData();
    }
  }, [day]);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const target = new Date(targetDate);
      const difference = Math.floor((target.getTime() - now.getTime()) / 1000); // Difference in seconds
      return Math.max(difference, 0); // Ensure it doesn't go negative
    };

    setSecondsLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setSecondsLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const formatTime = (seconds) => {
    const days = Math.floor(seconds / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}h ${minutes}m ${secs}s`;
  };

  const handleConfirm = () => {
    setShowPopup(false);

    // Add an API call to set the challenge status to true, implying that once the challengebutton has been pressed for the day it can not be pressed again
    
    router.push("/challenge");
  };

  const handleCancel = () => {
    setShowPopup(false);
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <button disabled className={styles.buttonBox}>
          Loading...
        </button>
      </div>
    );
  }

  if (hasSubmitted) {
    return (
      <div className={styles.container}>
        <button disabled className={styles.buttonBox}>
          Challenge Submitted
        </button>
      </div>
    );
  }

  if (day === "null") {
    return (
      <div className={styles.container}>
        <button onClick={() => setShowPopup(true)} className={styles.buttonBox}>
          The Final Challenge Begins In:
          <br />
          <span className={styles.countdown}>{formatTime(secondsLeft)}</span>
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <button onClick={() => setShowPopup(true)} className={styles.buttonBox}>
        {day} Day Challenge
      </button>

      {showPopup && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <p>
              This challenge will take approximately{" "}
              <strong className={styles.popupUnderline}>{timeEstimate} minutes</strong> to complete.
            </p>
            <p>Leaving the page during the challenge will disqualify you.</p>
            <p>Are you ready to start?</p>
            <div className={styles.popupActions}>
              <button onClick={handleConfirm} className={styles.popupConfirm}>
                Yes, I'm Ready
              </button>
              <button onClick={handleCancel} className={styles.popupDecline}>
                No, Not Yet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChallengeButton;
