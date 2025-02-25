import React, { useState,useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  // add useEffect code

  useEffect(() => {
    const timerID = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 0) {
          // If timeRemaining hits 0, reset it to 10 seconds
          onAnswered(false)
          return setTimeRemaining(10)

        }
        // Otherwise, decrease time by 1 second
        return prevTime - 1;
      });
    }, 1000); // Update every 1 second

    // Cleanup function to clear the interval when the component unmounts
    return () => clearTimeout(timerID);
  }, [onAnswered]);


  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
