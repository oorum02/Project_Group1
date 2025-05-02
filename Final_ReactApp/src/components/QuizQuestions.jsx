import React from "react";
import { useState } from "react";
import "../styles/QuizQuestions.css";
import QuizAnswerButton from "./QuizAnswerButton";
import QuizQuestion from "./QuizQuestion";

const QuizQuestions = ({ quizAnswers, setQuizAnswers }) => {
  // Utilise useState to manage the current question to to be displayed and the options for answers
  const [currentIndex, setCurrentIndex] = useState(0);
  // Utilise useState to manage the answers selected by the user
  // Quiz Answers will initially be an empty object and will be updated each time a user selects an answer
  // Note: the Below state is not in use yet but we will need to use it to store the answers and then pass this to the API
  // const [quizAnswers, setQuizAnswers] = useState({});

  // Array containing quiz questions and different options for the corresponding buttons
  // We can potential abstract this out into a JSON file to make it easier to manage but for an MVP it does the work!
  const quizQuestions = [
    {
      //Set label value pairs for button so value is compatible with api - e.g. genre searches are done by genre id number
      id: "eveningGenre",
      question: "Pick your ideal evening vibe:",
      options: [
        { label: "Loud music and dance-offs", value:  10402 }, // Filter added music
        { label: "Blanket, burrito and snacks", value: 10749 },// Romance filter
        { label: "Creeping myself out for no reason", value: 27 }, //Horror added
        { label: "Thinking about the universe and stuff", value: 878 }, // Scifi added
      ],
    },
    {
      id: "endingGenre",
      question: "What kind of ending do you crave?",
      options: [
        { label: "Happy, tied with a bow", value: 35 }, //comedy 
        { label: "A twist that makes me scream", value: 53 }, //Filters thriller  
        { label: "One that leaves me thinking for days", value:  9648 }, //Mystery added 
        { label: "Explosions and slow-mo hero walks", value: 28 }, //action filter added
      ],
    },
    {
      id: "filmReleaseDate",
      question: "Which style speaks to you?", //this could then be images relating to decades
      options: [
        {
          label: "1960-1980s",
          value: { start: "1960-01-01", end: "1979-12-31" },
        },
        {
        label: "1980s-2000s",
        value: { start: "1980-01-01", end: "1999-12-31" },
        },
        {
          label: "2000s-2015s",
          value: { start: "2000-01-01", end: "2014-12-31" },
        },
        {
          label: "2015-2025",
          value: { start: "2015-01-01", end: "2024-12-31" },
        },
      ],
    },
    {
      id: "runTime",
      question: "Finally, how long have you got?",
      options: [
        { label: "I'm in a rush", value: 60 },
        { label: "I've got a bit of time", value: 90 },
        { label: "I've got a while", value: 120 },
        { label: "I've got all the time in the world", value: 150 },
      ],
    },
  ];

  const currentQuestion = quizQuestions[currentIndex];

  // Function to handle the answer that is chosen by the user
  // Updates the quizAnswers state with the selected answer
  // Increments the currentIndex to enable the quiz to move to the next question
  const handleAnswer = (questionId, answer) => {
    const updatedAnswers = {
      ...quizAnswers,
      [questionId]: answer,
    };

    setQuizAnswers(updatedAnswers);
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <>
      {currentIndex < quizQuestions.length ? (
        <>
          <QuizQuestion question={currentQuestion.question} />
          {currentQuestion.options.map((option, index) => (
            // We will need to add a key to each of the buttons to ensure that React can identify them
            // We can also create button components to make it easier to manage
            <QuizAnswerButton
              key={option.label + index}
              onClick={() => handleAnswer(currentQuestion.id, option.value)}
              quizAnswer={option.label}
            />
          ))}
        </>
      ) : (
        <>
          {/* This is purely for development purposes and will be removed in the final version  - I've commented out for now for results display*/}
          {/* <h3 className="answers">Your Answers:</h3>
          <pre className="answers">{JSON.stringify(quizAnswers, null, 2)}</pre> */}
        </>
      )}
    </>
  );
};

export default QuizQuestions;
