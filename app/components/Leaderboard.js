"use client";

import React, { useState, useEffect } from "react";
import styles from "../components/Leaderboard.module.css";

const Leaderboard = ({ currentDay }) => {
  const [leaderboardData, setLeaderboardData] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch(
          "https://ygf8fotvt3.execute-api.us-west-2.amazonaws.com/Prod/leaderboard",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (data.body) {
          try {
            const parsedBody = JSON.parse(data.body);

            // Helper function to determine the rank suffix
            const getRankSuffix = (rank) => {
              if (rank === 11 || rank === 12 || rank === 13) return "th"; // Special cases for 11th, 12th, 13th
              const lastDigit = rank % 10;
              if (lastDigit === 1) return "st";
              if (lastDigit === 2) return "nd";
              if (lastDigit === 3) return "rd";
              return "th";
            };

            // Sort data by points (descending) and then alphabetically by user_id
            const sortedData = parsedBody.sort((a, b) => {
              if (b.points === a.points) {
                return a.user_id.localeCompare(b.user_id);
              }
              return b.points - a.points;
            });

            // Assign ranks with logic for ties
            let rank = 0; // Start rank at 0
            let previousPoints = null;

            const rankedData = sortedData.map((entry, index) => {
              if (entry.points === 0) {
                entry.rank = "-"; // Rank is '-' for users with 0 points
              } else {
                // Increment rank only if points differ from the previous entry
                if (entry.points !== previousPoints) {
                  rank = index + 1; // Use index to determine the rank
                }

                entry.rankNumeric = rank; // Numeric rank for logic
                entry.rank = `${rank}${getRankSuffix(rank)}`;
              }

              previousPoints = entry.points; // Track previous points for tie comparison
              return entry;
            });

            setLeaderboardData(rankedData);
          } catch (parseError) {
            console.error("Error parsing JSON body:", parseError);
          }
        } else {
          console.error(
            "No body in the response or body is not parseable:",
            data
          );
        }
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
      }
    };

    // Always call fetchLeaderboard unconditionally
    fetchLeaderboard();
  }, []); // Empty dependency array ensures it runs only once

  if (!leaderboardData) {
    return <div className={styles.h2BoxItem}>Loading leaderboard...</div>;
  }

  // after event - change leaderboard to say 2024 Results
  return (
    <div className={styles.restrictSize}>
      <div className={styles.centerThing}>
        <div className={styles.h2BoxThing}>
          <div className={styles.h2BoxItem}>Leaderboard</div>
        </div>
      </div>

      <ul className={styles.leaderboardContainer}>
        {leaderboardData.map((entry, index) => {
          const dayKey = `Day${currentDay}`; // Construct the key for the current day
          const isSubmitted = entry.challenge_status?.[dayKey]?.BOOL || false; // Check if challenge is submitted

          return (
            <li className={styles.leaderboardRow} key={index}>
              <div className={styles.rank}>
                {entry.rank.match(/[\d-]+/g)}
                <span className={styles.suffix}>
                  {entry.rank.match(/[a-zA-Z]+/g)}
                </span>
              </div>
              <div className={styles.name}>{entry.user_id}</div>
              <div className={styles.points}>
                {entry.points}
                <span className={styles.suffix}>pts</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Leaderboard;
