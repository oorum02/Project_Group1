import "../styles/StartMoodie.css";
import { useNavigate } from "react-router-dom";

function ChoosePath() {
  const navigate = useNavigate();
  // Function to handle the answer that is chosen by the user
  const handleClick = (page) => {
    navigate(page);
  };

  return (
    <>
      <div className="box">
        <h1>Choose Path</h1>
        <div className="buttons-div">
          <button onClick={() => handleClick("/Quiz")} className="quiz-button">
            Quiz
          </button>
          <button
            onClick={() => handleClick("/Randomise")}
            className="randomise-button"
          >
            Randomise
          </button>
        </div>
      </div>
    </>
  );
}

export default ChoosePath;
