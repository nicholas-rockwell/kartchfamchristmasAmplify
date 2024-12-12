"use client";

import React, { useState, useEffect } from "react";
import styles from "../components/MiniCrossword.module.css";

const MiniCrossword = ({ onSubmit }) => {
  // Internal crossword data
  const [grid, setGrid] = useState([
    [
      { letter: "", isBlack: true },
      { letter: "E", isBlack: false, userInput: "", number: 1 },
      { letter: "L", isBlack: false, userInput: "" },
      { letter: "F", isBlack: false, userInput: "", number: 2 },
      { letter: "", isBlack: true },
    ],
    [
      { letter: "", isBlack: true },
      { letter: "", isBlack: true },
      { letter: "", isBlack: true },
      { letter: "R", isBlack: false, userInput: "" },
      { letter: "", isBlack: true },
    ],
    [
      { letter: "C", isBlack: false, userInput: "", number: 3 },
      { letter: "O", isBlack: false, userInput: "" },
      { letter: "C", isBlack: false, userInput: "" },
      { letter: "O", isBlack: false, userInput: "" },
      { letter: "A", isBlack: false, userInput: "" },
    ],
    [
      { letter: "", isBlack: true },
      { letter: "", isBlack: true },
      { letter: "", isBlack: true },
      { letter: "S", isBlack: false, userInput: "" },
      { letter: "", isBlack: true },
    ],
    [
      { letter: "S", isBlack: false, userInput: "", number: 4 },
      { letter: "A", isBlack: false, userInput: "" },
      { letter: "N", isBlack: false, userInput: "", number: 5 },
      { letter: "T", isBlack: false, userInput: "" },
      { letter: "A", isBlack: false, userInput: "" },
    ],
    [
      { letter: "N", isBlack: false, userInput: "" },
      { letter: "", isBlack: true },
      { letter: "O", isBlack: false, userInput: "" },
      { letter: "", isBlack: true },
      { letter: "", isBlack: true },
    ],
    [
      { letter: "O", isBlack: false, userInput: "" },
      { letter: "", isBlack: true },
      { letter: "E", isBlack: false, userInput: "" },
      { letter: "", isBlack: true },
      { letter: "", isBlack: true },
    ],
    [
      { letter: "W", isBlack: false, userInput: "" },
      { letter: "", isBlack: true },
      { letter: "L", isBlack: false, userInput: "" },
      { letter: "", isBlack: true },
      { letter: "", isBlack: true },
    ],
  ]);

  const clues = [
    { direction: "across", number: 1, clue: "Santa's helper" },
    { direction: "down", number: 2, clue: "Frozen water, or Jack _" },
    { direction: "across", number: 3, clue: "A hot cup of _, not coffee" },
    { direction: "across", number: 4, clue: "He's coming to town" },
    { direction: "down", number: 4, clue: "Cold as ice but safe to throw" },
    { direction: "down", number: 5, clue: "A synonym carol or hymn" },
  ];

  const [elapsedTime, setElapsedTime] = useState(0);

  // Timer to track elapsed time
  useEffect(() => {
    const startTime = Date.now();
    const timer = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(timer); // Cleanup on unmount
  }, []);

  const handleInputChange = (row, col, value) => {
    const newGrid = grid.map((r, rowIndex) =>
      r.map((cell, colIndex) => {
        if (rowIndex === row && colIndex === col) {
          return { ...cell, userInput: value.toUpperCase() }; // Update the user input
        }
        return cell;
      })
    );
    setGrid(newGrid);
  };

  const checkAnswers = () => {
    const updatedGrid = grid.map((row) =>
      row.map((cell) => {
        if (!cell.isBlack) {
          const isCorrect = cell.letter === cell.userInput;
          return {
            ...cell,
            isCorrect, // Check if input matches the letter
          };
        }
        return cell; // Keep black cells unchanged
      })
    );

    setGrid(updatedGrid); // Update the grid state to include correctness

    const isCrosswordCorrect = updatedGrid.every((row) =>
      row.every((cell) => cell.isBlack || cell.isCorrect)
    );
    // Pass results to the parent component
    if (onSubmit) {
      onSubmit({ isCorrect: isCrosswordCorrect, timeTaken: elapsedTime });
    }
  };

  const getCellClassName = (cell) => {
    if (cell.isBlack) return styles.blackCell;
    if (cell.isCorrect === true) return styles.correctCell;
    if (cell.isCorrect === false) return styles.incorrectCell;
    return styles.unansweredCell;
  };

  return (
    <div className={styles.crosswordContainer}>
      <div className={styles.grid}>
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`${styles.cell} ${getCellClassName(cell)}`}
            >
              {!cell.isBlack && (
                <>
                  {cell.number && (
                    <span className={styles.cellNumber}>{cell.number}</span>
                  )}
                  <input
                    type="text"
                    maxLength="1"
                    value={cell.userInput || ""}
                    onChange={(e) =>
                      handleInputChange(rowIndex, colIndex, e.target.value)
                    }
                  />
                </>
              )}
            </div>
          ))
        )}
      </div>
      <div className={styles.clues}>
        <div className={styles.accrossDown}>
          <h4>Across</h4>
          <ul>
            {clues
              .filter((clue) => clue.direction === "across")
              .map((clue) => (
                <li key={clue.number}>
                  <strong>{clue.number}</strong>: {clue.clue}
                </li>
              ))}
          </ul>
        </div>
        <div className={styles.accrossDown}>
          <h4>Down</h4>
          <ul>
            {clues
              .filter((clue) => clue.direction === "down")
              .map((clue) => (
                <li key={clue.number}>
                  <strong>{clue.number}</strong>: {clue.clue}
                </li>
              ))}
          </ul>
        </div>
      </div>
      <button className={styles.button} onClick={checkAnswers}>
        Check Answers
      </button>
    </div>
  );
};

export default MiniCrossword;