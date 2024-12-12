import React, { useState } from "react";
import styles from "../components/Wordle.module.css"; // Assume you have a CSS module for styling

const Wordle = ({ targetWord, onWordleSubmit }) => {
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState("");

  const handleInput = (e) => {
    if (e.target.value.length <= targetWord.length) {
      setCurrentGuess(e.target.value.toUpperCase());
    }
  };

  const handleSubmit = () => {
    if (currentGuess.length !== targetWord.length) {
      setMessage(`Word must be ${targetWord.length} letters long!`);
      return;
    }

    const newGuesses = [...guesses, currentGuess];
    setGuesses(newGuesses);

    if (currentGuess === targetWord) {
      setGameOver(true);
      setMessage("🎉 You guessed it!");
      if (onWordleSubmit) {
        onWordleSubmit(newGuesses.length); // Send the total number of attempts to the parent
      }
    } else {
      setMessage("Try again!");
    }

    setCurrentGuess("");
  };

  const getFeedback = (guess) => {
    return guess.split("").map((char, i) => {
      if (char === targetWord[i]) return "correct"; // Correct position
      if (targetWord.includes(char)) return "present"; // Correct letter, wrong position
      return "absent"; // Wrong letter
    });
  };

  // Get only the last three guesses
  const recentGuesses = guesses.slice(-3);

  return (
    <div className={styles.wordleContainer}>
      <h1 className={styles.guessesHeadline}>Guesses:</h1>
      <div className={styles.guesses}>
        {recentGuesses.map((guess, index) => (
          <div key={index} className={styles.guess}>
            {guess.split("").map((char, i) => (
              <span key={i} className={`${styles.letter} ${styles[getFeedback(guess)[i]]}`}>
                {char}
              </span>
            ))}
          </div>
        ))}
      </div>
      {message && <p className={styles.message}>{message}</p>}
      {!gameOver && (
        <div className={styles.inputContainer}>
          <input
            type="text"
            value={currentGuess}
            onChange={handleInput}
            maxLength={targetWord.length}
            className={styles.input}
          />
          <button onClick={handleSubmit} className={styles.submitButton}>
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default Wordle;