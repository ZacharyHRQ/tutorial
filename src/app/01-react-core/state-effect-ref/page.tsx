'use client';

import { useState, useEffect, useRef } from 'react';

export default function StateEffectRefDemo() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');
  const [mockData, setMockData] = useState('Loading...');
  const inputRef = useRef<HTMLInputElement>(null);
  const prevCountRef = useRef<number>(0);

  // Mount effect
  useEffect(() => {
    setTimeout(() => {
      setMockData('Data loaded!');
    }, 1000);
  }, []);

  // Dependency effect
  useEffect(() => {
    console.log('Counter changed:', count);
  }, [count]);

  // Cleanup effect
  useEffect(() => {
    const timerId = setInterval(() => {
      console.log('Timer tick');
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

  // Store previous count
  useEffect(() => {
    prevCountRef.current = count;
  });

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <div>
      <h1>State, Effect, and Ref Demo</h1>
      <div>
        <h2>useState Demo</h2>
        <p>Count: {count}</p>
        <button onClick={() => setCount(count + 1)}>+</button>
        <button onClick={() => setCount(count - 1)}>-</button>
        <br />
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <p>Text: {text}</p>
      </div>
      <div>
        <h2>useEffect Demo</h2>
        <p>Mock Data: {mockData}</p>
        <p>Check console for timer ticks.</p>
      </div>
      <div>
        <h2>useRef Demo</h2>
        <input type="text" ref={inputRef} />
        <button onClick={focusInput}>Focus Input</button>
        <p>Previous Count: {prevCountRef.current}</p>
      </div>
    </div>
  );
}
