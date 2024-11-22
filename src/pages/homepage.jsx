import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

const HomePage = () => {
  const navigate = useNavigate();

  const handleClosestPair = () => {
    navigate("/closest-pair");
  };

  const handleIntegerMultiplication = () => {
    navigate("/integer-multiplication");
  };

  return (
    <div className="home-page">
      <h1 className="home-title">Algorithm Visualizer</h1>
      <p className="home-description">Select an algorithm to visualize:</p>
      <div className="button-container">
        <button className="algorithm-button" onClick={handleClosestPair}>
          Closest Pair
        </button>
        <button className="algorithm-button" onClick={handleIntegerMultiplication}>
          Integer Multiplication
        </button>
      </div>
    </div>
  );
};

export default HomePage;
