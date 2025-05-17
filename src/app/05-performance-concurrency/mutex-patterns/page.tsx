'use client';

import { useState } from 'react';

export default function MutexPatternsPage() {
  const [sharedCounter, setSharedCounter] = useState<number>(0);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const incrementSharedCounter = async () => {
    if (isUpdating) {
      console.log('Already updating');
      return;
    }
    setIsUpdating(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSharedCounter(prev => prev + 1);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div>
      <h1>Mutex Patterns Demo</h1>
      <p>Shared Counter: {sharedCounter}</p>
      <button onClick={incrementSharedCounter} disabled={isUpdating}>Increment (With Mutex)</button>
      <button onClick={incrementSharedCounter} disabled={isUpdating}>Increment (With Mutex)</button>
    </div>
  );
}
