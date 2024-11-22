import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './algo.css';

const KaratsubaStepByStep = () => {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [splitNum1, setSplitNum1] = useState({ high: '', low: '' });
  const [splitNum2, setSplitNum2] = useState({ high: '', low: '' });

  const [executionTime, setExecutionTime] = useState(null); // Timer state
  const [startTime, setStartTime] = useState(null); // Start time for the timer
  const [multiplications, setMultiplications] = useState({
    mulHigh: null,
    mulLow: null,
    mulMixed: null,
  });
  const [result, setResult] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [fileContent, setFileContent] = useState('');
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [file, setFile] = useState(null);

  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      console.log("File selected: ", selectedFile);
      setStartTime(performance.now()); // Start timer on file upload
      handleFileUpload(selectedFile);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        document.body.style.backgroundColor = '#e3f2fd';
      } else {
        document.body.style.backgroundColor = '#f4f7f6';
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSplit = (num) => {
    if (!num || isNaN(Number(num))) {
      console.error('Invalid input for splitting:', num);
      return { high: '0', low: '0' };
    }
  
    const strNum = num.toString();
    console.log('String representation of number:', strNum);
  
    const mid = Math.ceil(strNum.length / 2);
    const high = strNum.slice(0, mid) || '0';
    const low = strNum.slice(mid) || '0';
  
    console.log('High part:', high);
    console.log('Low part:', low);
  
    return { high, low };
  };
  

  const handleMultiply = (num1, num2) => {
    return num1 * num2;
  };

  const handleCombineResults = () => {
    const m = Math.max(splitNum1.high.length, splitNum2.high.length);
    const mulHigh = multiplications.mulHigh;
    const mulLow = multiplications.mulLow;
    const mulMixed = multiplications.mulMixed;

    const combinedResult =
      mulHigh * Math.pow(10, 2 * m) +
      (mulMixed - mulHigh - mulLow) * Math.pow(10, m) +
      mulLow;

    setResult(combinedResult);
    setExecutionTime((performance.now() - startTime).toFixed(2)); // Stop timer and calculate time
  };
  const cleanNumber = (num) => num.replace(/,/g, ''); // Remove all commas

  const handleFileUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const fileContent = event.target.result.trim();
      console.log('Raw File Content:', fileContent);
  
      const lines = fileContent.split('\n').map(line => line.trim());
      console.log('Split Lines:', lines);
  
      if (lines.length >= 2) {
        const num1FromFile = cleanNumber(lines[0]);
        const num2FromFile = cleanNumber(lines[1]);
  
        console.log('Cleaned Number 1:', num1FromFile);
        console.log('Cleaned Number 2:', num2FromFile);
  
        const split1 = handleSplit(num1FromFile);
        const split2 = handleSplit(num2FromFile);
  
        console.log('Split Number 1:', split1);
        console.log('Split Number 2:', split2);
  
        setSplitNum1(split1);
        setSplitNum2(split2);
  
        const mulHigh = handleMultiply(Number(split1.high), Number(split2.high));
        const mulLow = handleMultiply(Number(split1.low), Number(split2.low));
        const mulMixed = handleMultiply(
          Number(split1.high) + Number(split1.low),
          Number(split2.high) + Number(split2.low)
        );
  
        console.log('Multiplication Results:', { mulHigh, mulLow, mulMixed });
  
        setMultiplications({ mulHigh, mulLow, mulMixed });
      } else {
        alert('File must contain at least two lines of numbers.');
      }
    };
  
    reader.readAsText(file);
    setIsFileUploaded(true);
  };
  
  
  const chartData = [
    { name: 'High Part', num1: Number(splitNum1.high), num2: Number(splitNum2.high) },
    { name: 'Low Part', num1: Number(splitNum1.low), num2: Number(splitNum2.low) },
  ];

  const multiplicationData = [
    { name: 'Multiplication High', mulHigh: multiplications.mulHigh },
    { name: 'Multiplication Low', mulLow: multiplications.mulLow },
    { name: 'Multiplication Mixed', mulMixed: multiplications.mulMixed },
  ];

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="step-container">
            <h3>Step 1: Split the Numbers</h3>
            <div>
              <h4>Number 1: {num1}</h4>
              <div><strong>High Part: </strong>{splitNum1.high}</div>
              <div><strong>Low Part: </strong>{splitNum1.low}</div>
            </div>
            <div>
              <h4>Number 2: {num2}</h4>
              <div><strong>High Part: </strong>{splitNum2.high}</div>
              <div><strong>Low Part: </strong>{splitNum2.low}</div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="num1" fill="#8884d8" />
                <Bar dataKey="num2" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        );
      case 2:
        return (
          <div className="step-container">
            <h3>Step 2: Recursive Multiplications</h3>
            <div>
              <strong>Multiplication 1: </strong>{multiplications.mulHigh}
            </div>
            <div>
              <strong>Multiplication 2: </strong>{multiplications.mulLow}
            </div>
            <div>
              <strong>Multiplication 3: </strong>{multiplications.mulMixed}
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={multiplicationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="mulHigh" fill="#8884d8" />
                <Bar dataKey="mulLow" fill="#82ca9d" />
                <Bar dataKey="mulMixed" fill="#ff7f0e" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        );
      case 3:
        return (
          <div className="step-container">
            <h3>Step 3: Combine the Results</h3>
            <button onClick={handleCombineResults} className="action-button">Combine Results</button>
            {result !== null && (
              <div>
                <strong>Final Result: </strong>{result}
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="karatsuba-container">
      <h2>Integer Multiplication</h2>
      <input type="file" onChange={handleFileChange} id="file-input" />
      <label htmlFor="file-input" className="custom-file-input">Choose File</label>

      {isFileUploaded && renderStep()}

      <div className="button-container">
          <button className="action-button" onClick={() => setCurrentStep(currentStep - 1)} disabled={currentStep === 1}>Previous Step</button>
          <button className="action-button" onClick={() => setCurrentStep(currentStep + 1)} disabled={currentStep === 3}>Next Step</button>
     </div> <div className="button-container">
      <button className="GoHome" onClick={() => navigate('/')}>Go Home</button>
      </div>
      {executionTime && (
        <div>
          <strong>Execution Time:</strong> {executionTime} ms
        </div>
      )}
    </div>
  );
};

export default KaratsubaStepByStep;
