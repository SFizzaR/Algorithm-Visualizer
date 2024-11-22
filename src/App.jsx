import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/homepage';
import ClosestPair from './pages/closestPairPage';
import IntegerMultiplication from './pages/IntegerMultiplicationPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/closest-pair" element={<ClosestPair />} />
        <Route path="/integer-multiplication" element={<IntegerMultiplication />} />
      </Routes>
    </Router>
  );
};

export default App;
