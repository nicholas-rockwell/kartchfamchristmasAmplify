import React, { useState, useEffect } from "react";
import styles from "./PhotoTrivia.module.css";

const PhotoTrivia = ({ trivia_id, onPhotoTriviaSubmit }) => {
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [revealCorrectAnswer, setRevealCorrectAnswer] = useState(false); // Show correct answer image

  // Hardcoded images for questions and answers
  const questionImages = {
    Q1: "/images/darkMamo.jpg",
    Q2: "/images/darkStacy.jpg",
    Q3: "/images/darkJerel.jpg",
    Q4: "/images/darkLiam.jpg",
    Q5: "/images/darkChase.jpg",
  };

  const correctAnswerImages = {
    Q1: "/images/mamo.jpg",
    Q2: "/images/stacy.jpg",
    Q3: "/images/jerel.jpg",
    Q4: "/images/liam.jpg",
    Q5: "/images/chase.jpg",
  };

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

  const handleAnswerChange = (answer) => {
    setUserAnswers({ ...userAnswers, [questions[currentQuestionIndex].id]: answer });
  };

  const handleSubmit = () => {
    setRevealCorrectAnswer(true); // Show correct answer image
  };

  const handleNextQuestion = () => {
    setRevealCorrectAnswer(false); // Hide correct answer image
    setCurrentQuestionIndex(currentQuestionIndex + 1); // Move to next question
  };

  if (loading) return <p>Loading questions...</p>;
  if (error) return <p>{error}</p>;

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  return (
    <div className={styles.triviaContainer}>
      {currentQuestion && (
        <>
          {!revealCorrectAnswer ? (
            // Question phase: Show question image and dropdown
            <div className={styles.questionBox}>
              <img
                src={questionImages[currentQuestion.id]}
                alt={`Question ${currentQuestion.id}`}
                className={styles.questionImage}
              />
              <div className={styles.options}>
                <select
                  value={userAnswers[currentQuestion.id] || ""}
                  onChange={(e) => handleAnswerChange(e.target.value)}
                  className={styles.dropdown}
                >
                  <option value="" disabled>
                    Select your answer
                  </option>
                  {currentQuestion.options.map((option, index) => (
                    <option key={index} value={index}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <button
                className={styles.submitButton}
                onClick={handleSubmit}
                disabled={!userAnswers[currentQuestion.id]} // Disable until user selects an answer
              >
                Submit Answer
              </button>
            </div>
          ) : (
            // Correct answer phase: Show correct answer image and next button
            <div className={styles.correctAnswerBox}>
              <img
                src={correctAnswerImages[currentQuestion.id]}
                alt={`Correct Answer ${currentQuestion.id}`}
                className={styles.correctAnswerImage}
              />
              <p className={styles.correctAnswerText}>
                Its {currentQuestion.correct}
              </p>
              <button
                className={styles.submitButton}
                onClick={handleNextQuestion}
                disabled={isLastQuestion} // Disable on last question
              >
                {isLastQuestion ? "Finish" : "Next Question"}
              </button>
            </div>
          )}
        </>
      )}
      {isLastQuestion && revealCorrectAnswer && (
        <p className={styles.endMessage}>
          You have completed the PhotoTrivia challenge! Submit your answers to finish.
        </p>
      )}
    </div>
  );
};

export default PhotoTrivia;
