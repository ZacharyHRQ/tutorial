'use client';

import { useState, useCallback, memo } from 'react';

// Child component that logs when rendered
const ChildComponent = memo(function ChildComponent({ onClick }: { onClick: () => void }) {
  console.log('ChildComponent rendered');
  return <button onClick={onClick}>Click Me</button>;
});

export default function ReRendersDemo() {
  const [count, setCount] = useState(0);

  // useCallback to prevent unnecessary re-renders
  const handleClick = useCallback(() => {
    console.log('Button clicked');
  }, []);

  // Stale closure demo
  const handleStaleClosure = () => {
    setTimeout(() => {
      console.log('Stale count:', count);
    }, 3000);
  };

  return (
    <div>
      <h1>Re-renders Demo</h1>
      <div>
        <h2>Unnecessary Re-render Demo</h2>
        <p>Count: {count}</p>
        <button onClick={() => setCount(count + 1)}>Increment Count</button>
        <ChildComponent onClick={handleClick} />
      </div>
      <div>
        <h2>Stale Closure Demo</h2>
        <button onClick={handleStaleClosure}>Log Count After Delay</button>
      </div>
    </div>
  );
}
