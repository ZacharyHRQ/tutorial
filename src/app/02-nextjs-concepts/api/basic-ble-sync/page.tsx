'use client';

import { useState } from 'react';

export default function BasicBleSyncPage() {
  const [response, setResponse] = useState<{ message: string; status?: string; receivedData?: { mockData: string } } | null>(null);

  const testGetApi = async () => {
    const res = await fetch('/02-nextjs-concepts/api/basic-ble-sync');
    const data = await res.json();
    console.log('GET Response:', data);
    setResponse(data);
  };

  const testPostApi = async () => {
    const res = await fetch('/02-nextjs-concepts/api/basic-ble-sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mockData: "hello" }),
    });
    const data = await res.json();
    console.log('POST Response:', data);
    setResponse(data);
  };

  return (
    <div>
      <h1>Basic BLE Sync API Test</h1>
      <button onClick={testGetApi}>Test GET API</button>
      <button onClick={testPostApi}>Test POST API</button>
      {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
    </div>
  );
} 