import "../styles/StartMoodie.css";
import { useNavigate } from "react-router-dom";

function ChoosePath() {
  const navigate = useNavigate();

  const handleClick = (page) => {
    navigate(page);
  };

  return (
    <div className="box">
      <h1>Choose Path</h1>
      <div className="buttons-div">
        <button onClick={() => handleClick("/QuizFlow")} className="quiz-button">
          Moodie Quiz
        </button>
        <button onClick={() => handleClick("/Randomise")} className="randomise-button">
          Random Movie Generator
        </button>
      </div>
    </div>
  );
}

export default ChoosePath;
