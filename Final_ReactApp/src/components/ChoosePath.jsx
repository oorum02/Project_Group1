import { useNavigate } from "react-router-dom";
import popcornLogo from "../assets/logos/moodie-popcorn.png";
import "../styles/choosepath.css";

function ChoosePath() {
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <div className="choosepath-page">
      <div className="choosepath-wrapper">
        <img
          src={popcornLogo}
          alt="Moodie Popcorn Logo"
          className="choosepath-popcorn"
        />

        <div className="choosepath-card">
          <h1 className="choosepath-heading">Choose a path</h1>

          <div className="choosepath-buttons">
            <button onClick={() => handleClick("/QuizFlow")} className="choosepath-btn quiz-btn">
              Mood quiz
            </button>
            <button onClick={() => handleClick("/Randomise")} className="choosepath-btn">
              Random Movie Generator
            </button>
          </div>

          <p className="choosepath-description">
            Not sure what you're in the mood for? Spin the wheel or take the quiz!
          </p>
        </div>
      </div>
    </div>
  );
}

export default ChoosePath;
