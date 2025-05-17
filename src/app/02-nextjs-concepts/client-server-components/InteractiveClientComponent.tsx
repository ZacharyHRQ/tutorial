'use client';

import { useState } from 'react';

export default function InteractiveClientComponent() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>Interactive Client Component</h2>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment Count</button>
    </div>
  );
} 