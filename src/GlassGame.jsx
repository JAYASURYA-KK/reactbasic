import React, { useState, useEffect } from "react";
import { PiFootprintsFill } from "react-icons/pi";
import { motion } from "framer-motion";
import Confetti from 'react-confetti';
import "./GlassGame.css";
import { useNavigate, useLocation } from "react-router-dom";
import Image from "./assets/hi.png";

const GlassGame = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [path, setPath] = useState([]);
  const [currentRow, setCurrentRow] = useState(0);
  const [gameStatus, setGameStatus] = useState("playing");
  const [clickedSide, setClickedSide] = useState({});

  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    let a = [];
    for (let i = 0; i < 5; i++) {
      a.push(Math.random() < 0.5 ? "left" : "right");
    }
    console.log("Correct path:", a);
    setPath(a);
    setCurrentRow(0);
    setGameStatus("playing");
    setClickedSide({});
  };

  const handleClick = (row, side) => {
    if (!location.state) {
      alert("Please login first!");
      navigate('/login');
    }

    if (row !== currentRow || gameStatus !== "playing") return;

    setClickedSide(prev => ({ ...prev, [row]: side }));

    if (path[row] === side) {
      if (row === 4) {
        setGameStatus("won");
      } else {
        setCurrentRow(row + 1);
      }
    } else {
      setGameStatus("lost");
    }
  };
return (
  <div className="login-page">

    {/* Left Side Image */}
    <div className="login-left-image">
      <img src={Image} alt="Left Side" />
    </div>

    {/* Center Game Container */}
    <div className="login-container">

      <p className="text1">Row: {currentRow + 1} / 5</p>
      <p style={{ color: "green" }}>
        Status: <strong>{gameStatus.toUpperCase()}</strong>
      </p>

      <div>
        {[...Array(5)].map((_, row) => (
          <div className="row" key={row}>
            <button
              className="glass"
              onClick={() => handleClick(row, "left")}
              disabled={row !== currentRow || clickedSide[row]}
            >
              {clickedSide[row] === "left" && (
                <PiFootprintsFill style={{ color: "black" }} />
              )}
            </button>

            <button
              className="glass"
              onClick={() => handleClick(row, "right")}
              disabled={row !== currentRow || clickedSide[row]}
            >
              {clickedSide[row] === "right" && (
                <PiFootprintsFill style={{ color: "black" }} />
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Game Status Overlays */}
      {gameStatus === "won" && (
        <>
          <Confetti />
          <motion.div
            className="result win"
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{ duration: 1 }}
          >
            🎉 You Win!
            <br />
            <button onClick={resetGame} className="reset">Play Again</button>
          </motion.div>
        </>
      )}

      {gameStatus === "lost" && (
        <motion.div
          className="result lost"
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          💀 Game Over 💀
          <br />
          <button onClick={resetGame} className="reset">Try Again</button>
        </motion.div>
      )}
    </div>

    {/* Right Side Image */}
    <div className="login-right-image">
      <img src={Image} alt="Right Side" />
    </div>
  </div>
);
}

export default GlassGame;
