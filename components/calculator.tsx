'use client';

import { useState, useEffect } from 'react';

export function Calculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [newNumber, setNewNumber] = useState(true);
  const [error, setError] = useState(false);

  const handleNumber = (num: string) => {
    setError(false);
    if (newNumber) {
      setDisplay(num);
      setNewNumber(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleDecimal = () => {
    setError(false);
    if (newNumber) {
      setDisplay('0.');
      setNewNumber(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleOperation = (op: string) => {
    setError(false);
    const currentValue = parseFloat(display);

    if (previousValue !== null && operation && !newNumber) {
      const result = calculate(previousValue, currentValue, operation);
      setDisplay(result.toString());
      setPreviousValue(result);
    } else {
      setPreviousValue(currentValue);
    }

    setOperation(op);
    setNewNumber(true);
  };

  const calculate = (prev: number, current: number, op: string): number => {
    switch (op) {
      case '+':
        return prev + current;
      case '-':
        return prev - current;
      case '×':
        return prev * current;
      case '÷':
        if (current === 0) {
          setError(true);
          return 0;
        }
        return prev / current;
      case '^':
        return Math.pow(prev, current);
      default:
        return current;
    }
  };

  const handleEquals = () => {
    const currentValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const result = calculate(previousValue, currentValue, operation);
      setDisplay(result.toString());
      setPreviousValue(null);
      setOperation(null);
      setNewNumber(true);
    }
  };

  const handleScientific = (func: string) => {
    setError(false);
    const current = parseFloat(display);
    let result = 0;

    switch (func) {
      case 'sqrt':
        if (current < 0) {
          setError(true);
          return;
        }
        result = Math.sqrt(current);
        break;
      case 'sin':
        result = Math.sin((current * Math.PI) / 180);
        break;
      case 'cos':
        result = Math.cos((current * Math.PI) / 180);
        break;
      case 'tan':
        result = Math.tan((current * Math.PI) / 180);
        break;
      case 'π':
        setDisplay(Math.PI.toString());
        setNewNumber(true);
        return;
      case 'e':
        setDisplay(Math.E.toString());
        setNewNumber(true);
        return;
    }

    setDisplay(result.toString());
    setNewNumber(true);
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setNewNumber(true);
    setError(false);
  };

  const handleBackspace = () => {
    if (display.length === 1) {
      setDisplay('0');
      setNewNumber(true);
    } else {
      setDisplay(display.slice(0, -1));
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;
      if ('0123456789'.includes(key)) {
        handleNumber(key);
      } else if (key === '.') {
        handleDecimal();
      } else if (key === '+' || key === '-') {
        handleOperation(key);
      } else if (key === '*') {
        handleOperation('×');
      } else if (key === '/') {
        e.preventDefault();
        handleOperation('÷');
      } else if (key === 'Enter') {
        handleEquals();
      } else if (key === 'Backspace') {
        e.preventDefault();
        handleBackspace();
      } else if (key === 'Escape') {
        handleClear();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [display, previousValue, operation, newNumber]);

  const buttonClass =
    'w-full h-14 rounded-lg font-semibold text-sm transition-all active:scale-95';
  const numberButtonClass = `${buttonClass} bg-white text-foreground hover:bg-secondary border border-border`;
  const operationButtonClass = `${buttonClass} bg-primary text-primary-foreground hover:bg-accent border border-primary`;
  const scientificButtonClass = `${buttonClass} bg-muted text-foreground hover:bg-border border border-border`;

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-2">Calculator</h1>
          <p className="text-muted-foreground text-sm">
            Perform calculations with ease
          </p>
        </div>

        {/* Calculator Card */}
        <div className="bg-card rounded-2xl shadow-lg p-6 border border-border">
          {/* Display */}
          <div
            className={`mb-6 p-4 rounded-lg text-right text-4xl font-bold font-mono overflow-hidden text-ellipsis break-words ${
              error
                ? 'bg-destructive/10 text-destructive'
                : 'bg-secondary text-foreground'
            }`}
          >
            {error ? 'Error' : display}
          </div>

          {/* Scientific Functions */}
          <div className="grid grid-cols-4 gap-2 mb-4">
            <button
              onClick={() => handleScientific('sqrt')}
              className={scientificButtonClass}
              title="Square Root"
            >
              √
            </button>
            <button
              onClick={() => handleScientific('sin')}
              className={scientificButtonClass}
            >
              sin
            </button>
            <button
              onClick={() => handleScientific('cos')}
              className={scientificButtonClass}
            >
              cos
            </button>
            <button
              onClick={() => handleScientific('tan')}
              className={scientificButtonClass}
            >
              tan
            </button>
          </div>

          {/* Constants */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            <button
              onClick={() => handleScientific('π')}
              className={scientificButtonClass}
              title="Pi"
            >
              π
            </button>
            <button
              onClick={() => handleScientific('e')}
              className={scientificButtonClass}
              title="Euler&apos;s Number"
            >
              e
            </button>
          </div>

          {/* Main Calculator */}
          <div className="grid grid-cols-4 gap-2">
            {/* Row 1 */}
            <button
              onClick={handleClear}
              className={`${operationButtonClass} col-span-2`}
            >
              AC
            </button>
            <button onClick={handleBackspace} className={operationButtonClass}>
              ←
            </button>
            <button
              onClick={() => handleOperation('÷')}
              className={operationButtonClass}
            >
              ÷
            </button>

            {/* Row 2 */}
            <button
              onClick={() => handleNumber('7')}
              className={numberButtonClass}
            >
              7
            </button>
            <button
              onClick={() => handleNumber('8')}
              className={numberButtonClass}
            >
              8
            </button>
            <button
              onClick={() => handleNumber('9')}
              className={numberButtonClass}
            >
              9
            </button>
            <button
              onClick={() => handleOperation('×')}
              className={operationButtonClass}
            >
              ×
            </button>

            {/* Row 3 */}
            <button
              onClick={() => handleNumber('4')}
              className={numberButtonClass}
            >
              4
            </button>
            <button
              onClick={() => handleNumber('5')}
              className={numberButtonClass}
            >
              5
            </button>
            <button
              onClick={() => handleNumber('6')}
              className={numberButtonClass}
            >
              6
            </button>
            <button
              onClick={() => handleOperation('-')}
              className={operationButtonClass}
            >
              −
            </button>

            {/* Row 4 */}
            <button
              onClick={() => handleNumber('1')}
              className={numberButtonClass}
            >
              1
            </button>
            <button
              onClick={() => handleNumber('2')}
              className={numberButtonClass}
            >
              2
            </button>
            <button
              onClick={() => handleNumber('3')}
              className={numberButtonClass}
            >
              3
            </button>
            <button
              onClick={() => handleOperation('+')}
              className={operationButtonClass}
            >
              +
            </button>

            {/* Row 5 */}
            <button
              onClick={() => handleNumber('0')}
              className={`${numberButtonClass} col-span-2`}
            >
              0
            </button>
            <button onClick={handleDecimal} className={numberButtonClass}>
              .
            </button>
            <button
              onClick={handleEquals}
              className={`${operationButtonClass}`}
            >
              =
            </button>

            {/* Row 6 - Power Function */}
            <button
              onClick={() => handleOperation('^')}
              className={`${operationButtonClass} col-span-4`}
            >
              x^y (Power)
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-xs text-muted-foreground">
          <p>Press Enter to calculate, Esc to clear, Backspace to delete</p>
        </div>
      </div>
    </div>
  );
}
