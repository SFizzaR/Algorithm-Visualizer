import React, { useState, useEffect } from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { parsePointsFile, dividePointsIntoGroups } from '../algos/closestPair';
import './algo.css'
import { useNavigate } from 'react-router-dom'; 

const ClosestPair = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [points, setPoints] = useState([]);
  const [stage, setStage] = useState(0);
  const [group1, setGroup1] = useState([]);
  const [group2, setGroup2] = useState([]);
  const [leftClosest, setLeftClosest] = useState(null);
  const [rightClosest, setRightClosest] = useState(null);
  const [crossClosest, setCrossClosest] = useState(null);
  const [overallClosest, setOverallClosest] = useState(null);
  const [executionTime, setExecutionTime] = useState(null); // Add state for execution time
  const [startTime, setStartTime] = useState(null);


  const navigate = useNavigate(); // Initialize navigate
  const goHome = () => {
    navigate('/'); // Navigates to the home route
  };
  // Function to calculate distance between two points
  const calculateDistance = (p1, p2) => {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
  };

  // Calculate closest pair within a group
  const calculateDistancesWithinGroup = (group) => {
    let closestPair = null;
    let minDistance = Infinity;

    group.forEach((point1, index1) => {
      group.forEach((point2, index2) => {
        if (index1 < index2) {
          const distance = calculateDistance(point1, point2);
          if (distance < minDistance) {
            minDistance = distance;
            closestPair = { point1, point2, distance };
          }
        }
      });
    });

    return closestPair;
  };

  // Calculate closest pair between two groups
  const calculateCrossClosestDistance = (group1, group2) => {
    let minDistance = Infinity;
    let closestPair = null;

    group1.forEach((point1) => {
      group2.forEach((point2) => {
        const distance = calculateDistance(point1, point2);
        if (distance < minDistance) {
          minDistance = distance;
          closestPair = { point1, point2, distance };
        }
      });
    });

    return closestPair;
  };

  useEffect(() => {
    if (stage === 2) {
      const [g1, g2] = dividePointsIntoGroups(points);
      setGroup1(g1);
      setGroup2(g2);
    } else if (stage === 3 && group1.length > 0) {
      const closest = calculateDistancesWithinGroup(group1);
      setLeftClosest(closest);
    } else if (stage === 4 && group2.length > 0) {
      const closest = calculateDistancesWithinGroup(group2);
      setRightClosest(closest);
    } else if (stage === 5 && group1.length > 0 && group2.length > 0) {
      const closest = calculateCrossClosestDistance(group1, group2);
      setCrossClosest(closest);
    } else if (stage === 6) {
      const closestPairs = [leftClosest, rightClosest, crossClosest];
      const overall = closestPairs.reduce((prev, curr) => {
        return curr && (!prev || curr.distance < prev.distance) ? curr : prev;
      }, null);
      setOverallClosest(overall);

      const endTime = performance.now(); // End timing after all stages are completed

      // Set execution time only after stage 6
      const totalTime = endTime - startTime; // Calculate total time
      setExecutionTime(`Total Execution Time: ${(totalTime).toFixed(2)} ms`);
    }
  }, [stage, points, group1, group2, leftClosest, rightClosest, crossClosest, startTime]);

  const handleFileSelection = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    setStartTime(performance.now()); // Start the timer when the file is selected

    parsePointsFile(file)
      .then((parsedPoints) => {
        setPoints(parsedPoints);
        setStage(1);
      })
      .catch((error) => {
        alert("Error parsing file: " + error.message);
      });
  };


  return (
    <div className='closest-pair-container'> 
      <h2>Closest Pair of Points</h2>
      <input type="file" onChange={handleFileSelection} id="file-input" />
       <label htmlFor="file-input" className="custom-file-input">Choose File</label>
        <div>
      <div>
        {stage === 0 &&(
          <div>
            <p>Select a file</p>
          </div>
        )}
        <div className='graph-container'>
        {stage === 1 && (
          <div>
            <h3>Step 1: Points</h3>
            <ScatterChart width={500} height={400}>
              <CartesianGrid />
              <XAxis dataKey="x" type="number" />
              <YAxis dataKey="y" type="number" />
              <Tooltip />
              <Scatter data={points} fill="#8884d8" />
            </ScatterChart>
          </div>
        )}

        {stage === 2 && group1.length > 0 && group2.length > 0 && (
          <div>
            <h3>Step 2: Groups</h3>
            <ScatterChart width={500} height={400}>
              <CartesianGrid />
              <XAxis dataKey="x" type="number" />
              <YAxis dataKey="y" type="number" />
              <Tooltip />
              <Scatter data={group1} fill="#8884d8" />
              <Scatter data={group2} fill="#82ca9d" />
            </ScatterChart>
           
          </div>
          
        )}

        {stage === 3 && leftClosest && (
          <div>
            <h3>Step 3: Left Group Closest Pair</h3>
            <ScatterChart width={500} height={400}>
              <CartesianGrid />
              <XAxis dataKey="x" type="number" />
              <YAxis dataKey="y" type="number" />
              <Tooltip />
              <Scatter data={group1} fill="#8884d8" />
              <Scatter data={[leftClosest.point1]} fill="red" />
              <Scatter data={[leftClosest.point2]} fill="red" />
            </ScatterChart>
            <p>
                Left Closest Pair: ({leftClosest.point1.x}, {leftClosest.point1.y}) and ({leftClosest.point2.x}, {leftClosest.point2.y}), Distance = {leftClosest.distance.toFixed(2)}
              </p>
          </div>
        )}

        {stage === 4 && rightClosest && (
          <div>
            <h3>Step 4: Right Group Closest Pair</h3>
            <ScatterChart width={500} height={400}>
              <CartesianGrid />
              <XAxis dataKey="x" type="number" />
              <YAxis dataKey="y" type="number" />
              <Tooltip />
              <Scatter data={group2} fill="#82ca9d" />
              <Scatter data={[rightClosest.point1]} fill="red" />
              <Scatter data={[rightClosest.point2]} fill="red" />
            </ScatterChart>
            <p>
                Right Closest Pair: ({rightClosest.point1.x}, {rightClosest.point1.y}) and ({rightClosest.point2.x}, {rightClosest.point2.y}), Distance = {rightClosest.distance.toFixed(2)}
              </p>
          </div>
        )}

        {stage === 5 && crossClosest && (
          <div>
            <h3>Step 5: Cross Closest Pair</h3>
            <ScatterChart width={500} height={400}>
              <CartesianGrid />
              <XAxis dataKey="x" type="number" />
              <YAxis dataKey="y" type="number" />
              <Tooltip />
              <Scatter data={group1} fill="#8884d8" />
              <Scatter data={group2} fill="#82ca9d" />
              <Scatter data={[crossClosest.point1]} fill="red" />
              <Scatter data={[crossClosest.point2]} fill="red" />
            </ScatterChart>
            <p>
                Cross Closest Pair: ({crossClosest.point1.x}, {crossClosest.point1.y}) and ({crossClosest.point2.x}, {crossClosest.point2.y}), Distance = {crossClosest.distance.toFixed(2)}
              </p>
          </div>
        )}

        {stage === 6 && overallClosest && (
          <div>
            <h3>Step 6: Final Closest Pair</h3>
            <ScatterChart width={500} height={400}>
              <CartesianGrid />
              <XAxis dataKey="x" type="number" />
              <YAxis dataKey="y" type="number" />
              <Tooltip />
              <Scatter data={points} fill="#8884d8" />
              <Scatter data={[overallClosest.point1]} fill="red" />
              <Scatter data={[overallClosest.point2]} fill="red" />
            </ScatterChart>
            <p>
                Final Closest Pair: ({overallClosest.point1.x}, {overallClosest.point1.y}) and ({overallClosest.point2.x}, {overallClosest.point2.y}), Distance = {overallClosest.distance.toFixed(2)}
              </p>
          </div>
        )}
        </div>
      </div>
      <div className="navigation-buttons">
          {stage > 1 && <button onClick={() => setStage(stage - 1)} className="Previous">Previous</button>}
          {stage < 6 && stage !== 0 && <button onClick={() => setStage(stage + 1)} className="Next">Next</button>}
        </div>
        {executionTime && <p>{executionTime}</p>} {/* Display execution time */}
        <button className="GoHome" onClick={() => navigate('/')}>
          Go Home
        </button>
      </div>
        
    </div>
  );
};

export default ClosestPair;