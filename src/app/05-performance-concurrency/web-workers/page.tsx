'use client';

import { useState, useEffect } from 'react';

export default function WebWorkersPage() {
  const [workerResult, setWorkerResult] = useState<string>('');
  const [isCalculating, setIsCalculating] = useState<boolean>(false);

  useEffect(() => {
    const worker = new Worker('/heavy-computation.worker.js');
    worker.onmessage = (event) => {
      setWorkerResult(`Result: ${event.data.result}, Original Input: ${event.data.originalInput}`);
      setIsCalculating(false);
    };
    return () => worker.terminate();
  }, []);

  const startHeavyComputation = () => {
    setIsCalculating(true);
    const worker = new Worker('/heavy-computation.worker.js');
    worker.postMessage({ countTo: 1000000000 });
  };

  return (
    <div>
      <h1>Web Workers Demo</h1>
      <button onClick={startHeavyComputation} disabled={isCalculating}>Start Heavy Computation in Worker</button>
      {isCalculating && <p>Calculating...</p>}
      <p>{workerResult}</p>
    </div>
  );
}
