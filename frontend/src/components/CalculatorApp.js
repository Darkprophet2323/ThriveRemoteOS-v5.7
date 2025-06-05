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
    <div style={{
      padding: '20px',
      background: 'linear-gradient(135deg, #2C3E50, #34495E)',
      color: '#fff',
      fontFamily: 'monospace',
      height: '100%',
      overflow: 'hidden'
    }}>
      <h3 style={{ color: '#D4AF37', marginBottom: '20px', textAlign: 'center' }}>
        🧮 ThriveOS Calculator
      </h3>
      
      {/* Display */}
      <div style={{
        background: '#1a1a1a',
        padding: '15px',
        borderRadius: '8px',
        marginBottom: '15px',
        border: '2px solid #D4AF37'
      }}>
        <div style={{
          fontSize: '2rem',
          textAlign: 'right',
          fontWeight: 'bold',
          color: '#D4AF37',
          minHeight: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end'
        }}>
          {display}
        </div>
      </div>

      {/* Button Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '8px',
        maxWidth: '280px'
      }}>
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
        <Button onClick={() => setDisplay(display + '.')}>.</Button>
      </div>
    </div>
  );
};

const Button = ({ onClick, children, className, style }) => (
  <button
    onClick={onClick}
    style={{
      padding: '15px',
      border: 'none',
      borderRadius: '8px',
      fontSize: '1.2rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      background: className === 'operator' ? '#D4AF37' : 
                 className === 'equals' ? '#27AE60' : '#34495E',
      color: className === 'operator' || className === 'equals' ? '#000' : '#fff',
      border: '2px solid transparent',
      ...style
    }}
    onMouseEnter={(e) => {
      e.target.style.transform = 'scale(1.05)';
      e.target.style.borderColor = '#D4AF37';
    }}
    onMouseLeave={(e) => {
      e.target.style.transform = 'scale(1)';
      e.target.style.borderColor = 'transparent';
    }}
    onMouseDown={(e) => {
      e.target.style.transform = 'scale(0.95)';
    }}
    onMouseUp={(e) => {
      e.target.style.transform = 'scale(1.05)';
    }}
  >
    {children}
  </button>
);

export default CalculatorApp;