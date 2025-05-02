import React, { useState } from "react";
import "../styles/QuizQuestions.css";
import QuizAnswerButton from "./QuizAnswerButton";
import QuizQuestion from "./QuizQuestion";
import danniImage from "../assets/TeamAvatars/Danni.png";

const QuizQuestions = ({ quizAnswers, setQuizAnswers }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const quizQuestions = [
    {
      id: "eveningGenre",
      question: "Pick your ideal evening vibe:",
      options: [
        { label: "Loud music and dance-offs", value: 10402 },
        { label: "Blanket, burrito and snacks", value: 10749 },
        { label: "Creeping myself out for no reason", value: 27 },
        { label: "Thinking about the universe and stuff", value: 878 },
      ],
    },
    {
      id: "endingGenre",
      question: "What kind of ending do you crave?",
      options: [
        { label: "Happy, tied with a bow", value: 35 },
        { label: "A twist that makes me scream", value: 53 },
        { label: "One that leaves me thinking for days", value: 9648 },
        { label: "Explosions and slow-mo hero walks", value: 28 },
      ],
    },
    {
      id: "voteCount",
      question: "Do you prefer a popular movie or a cult classic?",
      options: [
        { label: "Popular movie", value: 100 },
        { label: "Cult classic", value: 10 },
      ],
    },
    {
      id: "filmReleaseDate",
      question: "Which style speaks to you?",
      options: [
        { label: "1960-1980s", value: { start: "1960-01-01", end: "1979-12-31" } },
        { label: "1980s-2000s", value: { start: "1980-01-01", end: "1999-12-31" } },
        { label: "2000s-2015s", value: { start: "2000-01-01", end: "2014-12-31" } },
        { label: "2015-2025", value: { start: "2015-01-01", end: "2024-12-31" } },
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

  const handleAnswer = (questionId, answer) => {
    const updatedAnswers = {
      ...quizAnswers,
      [questionId]: answer,
    };

    setQuizAnswers(updatedAnswers);
    setCurrentIndex((prev) => prev + 1);
  };

  // Only show content during quiz
  if (currentIndex >= quizQuestions.length) return null;

  return (
    <div className="quiz-question-wrapper">
      <div className="quiz-question-box">
        <h2 className="question-wording">{currentQuestion.question}</h2>

        <div className="image-container">
          <img src={danniImage} alt="Danni thinking" id="danni" />
        </div>

        <div className="quiz-options-container">
          {currentQuestion.options.map((option, index) => (
            <QuizAnswerButton
              key={option.label + index}
              onClick={() => handleAnswer(currentQuestion.id, option.value)}
              quizAnswer={option.label}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizQuestions;
