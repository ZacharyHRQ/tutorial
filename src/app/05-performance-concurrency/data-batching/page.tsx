'use client';

import { useState, useEffect } from 'react';

export default function DataBatchingPage() {
  const [batchedData, setBatchedData] = useState<number[]>([]);
  const [directData, setDirectData] = useState<number[]>([]);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    let tempData: number[] = [];

    if (isSimulating) {
      intervalId = setInterval(() => {
        const newNumber = Math.random();
        setDirectData(prev => [...prev, newNumber]);
        tempData.push(newNumber);
      }, 50);

      const batchIntervalId = setInterval(() => {
        setBatchedData(prev => [...prev, ...tempData]);
        tempData = [];
      }, 500);

      return () => {
        clearInterval(intervalId);
        clearInterval(batchIntervalId);
      };
    }
  }, [isSimulating]);

  return (
    <div>
      <h1>Data Batching Demo</h1>
      <button onClick={() => setIsSimulating(!isSimulating)}>
        {isSimulating ? 'Stop Simulating' : 'Start Simulating Data Stream'}
      </button>
      <div>
        <h2>Direct Updates</h2>
        <p>Last 10 items: {directData.slice(-10).join(', ')}</p>
      </div>
      <div>
        <h2>Batched Updates</h2>
        <p>Last 10 items: {batchedData.slice(-10).join(', ')}</p>
      </div>
    </div>
  );
}
