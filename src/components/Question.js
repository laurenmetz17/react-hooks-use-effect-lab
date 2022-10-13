import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  // add useEffect code

  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  useEffect(() => {
    const timerID = setTimeout(() => {
      setTimeRemaining((timeRemaining) => timeRemaining = timeRemaining-1);
      if(timeRemaining === 0) {
        setTimeRemaining((timeRemaining) => timeRemaining = 10);
        onAnswered(false);
      }
    },1000)

    return function cleanup() {
        clearTimeout(timerID);
    }
  });

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
