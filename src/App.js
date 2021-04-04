import React, { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [displayWarning, setDisplayWarning] = useState(false);

  const incrementCounter = () => {
    if (displayWarning) {
      setDisplayWarning(false);
    }
    setCount(count + 1);
  };

  const decrementCounter = () => {
    if (count > 0) {
      setCount(count - 1);
    } else if (!displayWarning) {
      setDisplayWarning(true);
    }
  };

  return (
    <div data-test="component-app">
      <h1 data-test="counter-display">
        The counter currently is&nbsp;
        <span data-test="count">{count}</span>
      </h1>
      {displayWarning && (
        <span data-test="warning">Cannot decrement below zero</span>
      )}
      <button data-test="increment-button" onClick={incrementCounter}>
        Increment counter
      </button>
      <button data-test="decrement-button" onClick={decrementCounter}>
        Decrement counter
      </button>
    </div>
  );
}

export default App;
