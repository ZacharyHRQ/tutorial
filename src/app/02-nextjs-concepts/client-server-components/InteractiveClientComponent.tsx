'use client';

import { useState } from 'react';

interface InteractiveClientComponentProps {
  serverMessage?: string;
}

export default function InteractiveClientComponent({ 
  serverMessage 
}: InteractiveClientComponentProps) {
  const [count, setCount] = useState(0);

  return (
    <div className="p-4 bg-gray-50 rounded-lg space-y-4">
      <h3 className="text-lg font-medium">Interactive Client Component</h3>
      
      <div className="flex items-center gap-4">
        <button
          onClick={() => setCount(c => c + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Increment Count
        </button>
        <span className="text-lg font-medium">Count: {count}</span>
      </div>

      {serverMessage && (
        <div className="p-3 bg-blue-50 rounded">
          <p className="text-blue-700">
            Message from Server: {serverMessage}
          </p>
        </div>
      )}

      <div className="text-sm text-gray-600">
        <p>This component is marked with &apos;use client&apos; and can:</p>
        <ul className="list-disc list-inside mt-2">
          <li>Use React hooks (useState, useEffect, etc.)</li>
          <li>Handle user interactions</li>
          <li>Maintain client-side state</li>
          <li>Access browser APIs</li>
        </ul>
      </div>
    </div>
  );
} 