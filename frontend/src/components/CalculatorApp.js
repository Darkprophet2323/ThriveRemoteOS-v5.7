import React, { useState } from 'react';

const CalculatorApp = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  const inputNumber = (num) => {
    if (waitingForNewValue) {
      setDisplay(String(num));
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  };

  const inputOperation = (nextOperation) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForNewValue(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '*':
        return firstValue * secondValue;
      case '/':
        return firstValue / secondValue;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const performCalculation = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForNewValue(true);
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
  };

  const clearEntry = () => {
    setDisplay('0');
  };

  return (
    <div className="calculator-container">
      <div className="calculator-header">
        <h3>🧮 Calculator</h3>
      </div>
      
      {/* Display */}
      <div className="calculator-display">
        <div className="display-value">
          {display}
        </div>
      </div>

      {/* Button Grid */}
      <div className="calculator-grid">
        {/* Row 1 */}
        <Button onClick={clear} className="operator">C</Button>
        <Button onClick={clearEntry} className="operator">CE</Button>
        <Button onClick={() => inputOperation('/')} className="operator">÷</Button>
        <Button onClick={() => inputOperation('*')} className="operator">×</Button>

        {/* Row 2 */}
        <Button onClick={() => inputNumber(7)}>7</Button>
        <Button onClick={() => inputNumber(8)}>8</Button>
        <Button onClick={() => inputNumber(9)}>9</Button>
        <Button onClick={() => inputOperation('-')} className="operator">-</Button>

        {/* Row 3 */}
        <Button onClick={() => inputNumber(4)}>4</Button>
        <Button onClick={() => inputNumber(5)}>5</Button>
        <Button onClick={() => inputNumber(6)}>6</Button>
        <Button onClick={() => inputOperation('+')} className="operator">+</Button>

        {/* Row 4 */}
        <Button onClick={() => inputNumber(1)}>1</Button>
        <Button onClick={() => inputNumber(2)}>2</Button>
        <Button onClick={() => inputNumber(3)}>3</Button>
        <Button onClick={performCalculation} className="equals" style={{ gridRow: 'span 2' }}>=</Button>

        {/* Row 5 */}
        <Button onClick={() => inputNumber(0)} style={{ gridColumn: 'span 2' }}>0</Button>
        <Button onClick={() => setDisplay(display.includes('.') ? display : display + '.')}>.</Button>
      </div>
    </div>
  );
};

const Button = ({ onClick, children, className, style }) => (
  <button
    onClick={onClick}
    className={`calc-btn ${className || ''}`}
    style={style}
  >
    {children}
  </button>
);

export default CalculatorApp;