import React, { useState, useEffect } from "react";
import styles from "./TriviaGame.module.css";

const TriviaGame = ({ trivia_id, onTriviaGameSubmit }) => {
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [feedback, setFeedback] = useState([]); // State to hold feedback for correct answers

  // Fetch questions from the API
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          "https://ygf8fotvt3.execute-api.us-west-2.amazonaws.com/Prod/triviaQuestions",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ trivia_id }),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();
        const data = JSON.parse(responseData.body); // Parse the body string into a JSON object

        if (data.data) {
          const parsedQuestions = Object.keys(data.data)
            .filter((key) => key.startsWith("Q"))
            .map((key) => ({
              id: key,
              questionText: data.data[key].questionText,
              correct: data.data[key].correct || null,
              options: data.data[key].options || null,
              type: data.data.type || "multipleChoice",
            }));
          setQuestions(parsedQuestions);
        } else {
          throw new Error("Invalid question data format.");
        }
      } catch (err) {
        setError("Failed to load questions.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [trivia_id]);

  const handleAnswerChange = (questionId, answer) => {
    setUserAnswers({ ...userAnswers, [questionId]: answer });
  };

  const handleSubmit = () => {
    let correctCount = 0;

    // Prepare feedback and external_data
    const feedbackData = questions.map((q) => {
      const userAnswer = userAnswers[q.id];
      const isCorrect =
        q.type === "multipleChoice"
          ? q.options?.[userAnswer] === q.correct
          : userAnswer?.toLowerCase() === q.correct?.toLowerCase();

      if (isCorrect) correctCount++;

      return {
        questionId: q.id,
        questionText: q.questionText,
        userAnswer: userAnswer !== undefined ? (q.options ? q.options[userAnswer] : userAnswer) : "No Answer",
        correctAnswer: q.correct,
        isCorrect,
        type: q.type,
      };
    });

    const external_data = {
      trivia_id,
      answers: feedbackData,
      correctCount,
    };

    // Update feedback state for correct answers
    setFeedback(feedbackData);

    // Pass external_data to the parent component
    if (onTriviaGameSubmit) {
      onTriviaGameSubmit(external_data);
    }
  };

  if (loading) return <p>Loading questions...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.triviaContainer}>
      {questions.map((q) => (
        <div className={styles.questionBox} key={q.id}>
          <p className={styles.question}>{q.questionText}</p>
          <div className={styles.options}>
            {q.type === "multipleChoice" ? (
              q.options.map((option, index) => (
                <label
                  key={index}
                  className={`${styles.optionLabel} ${
                    userAnswers[q.id] === index ? styles.selected : ""
                  }`}
                >
                  <input
                    type="radio"
                    name={`question-${q.id}`}
                    value={index}
                    checked={userAnswers[q.id] === index}
                    onChange={() => handleAnswerChange(q.id, index)}
                  />
                  {option}
                </label>
              ))
            ) : (
              <input
                type="text"
                className={styles.textInput}
                placeholder="Answer here..."
                value={userAnswers[q.id] || ""}
                onChange={(e) => handleAnswerChange(q.id, e.target.value)}
              />
            )}
          </div>
        </div>
      ))}
      <button className={styles.submitButton} onClick={handleSubmit}>
        Lock In Answers
      </button>
      {feedback.length > 0 && (
        <div className={styles.feedback}>
          <h2>Your Results</h2>
          <ul>
            {feedback.map((f, index) =>
              f.type === "multipleChoice" ? ( // Only show feedback for multiple-choice questions
                <li key={index}>
                  <p>
                    <strong>{f.questionText}</strong>
                    <br />
                    Your Answer:{" "}
                    <span
                      className={f.isCorrect ? styles.feedbackCorrect : styles.feedbackIncorrect}
                    >
                      {f.userAnswer}
                    </span>
                    <br />
                    Correct Answer: <span className={styles.feedbackCorrect}>{f.correctAnswer}</span>
                  </p>
                </li>
              ) : null
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TriviaGame;