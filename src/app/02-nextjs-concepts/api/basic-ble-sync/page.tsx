'use client';

import { useState } from 'react';

interface ApiResponse {
  message: string;
  status?: string;
  receivedData?: any;
  timestamp?: string;
  error?: string;
  details?: string;
}

export default function BasicBleSyncPage() {
  const [getResponse, setGetResponse] = useState<ApiResponse | null>(null);
  const [postResponse, setPostResponse] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const testGetApi = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/02-nextjs-concepts/api/basic-ble-sync');
      const data = await response.json();
      setGetResponse(data);
      console.log('GET Response:', data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch');
      console.error('GET Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const testPostApi = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/02-nextjs-concepts/api/basic-ble-sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mockData: "hello",
          timestamp: new Date().toISOString(),
          deviceId: "mock-device-123"
        }),
      });
      const data = await response.json();
      setPostResponse(data);
      console.log('POST Response:', data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch');
      console.error('POST Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Basic BLE Sync API Test</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* GET Request Section */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium mb-4">Test GET Request</h3>
          <button
            onClick={testGetApi}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {isLoading ? 'Loading...' : 'Test GET API'}
          </button>

          {getResponse && (
            <div className="mt-4 p-3 bg-white rounded border">
              <h4 className="font-medium mb-2">Response:</h4>
              <pre className="text-sm overflow-auto">
                {JSON.stringify(getResponse, null, 2)}
              </pre>
            </div>
          )}
        </div>

        {/* POST Request Section */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium mb-4">Test POST Request</h3>
          <button
            onClick={testPostApi}
            disabled={isLoading}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
          >
            {isLoading ? 'Loading...' : 'Test POST API'}
          </button>

          {postResponse && (
            <div className="mt-4 p-3 bg-white rounded border">
              <h4 className="font-medium mb-2">Response:</h4>
              <pre className="text-sm overflow-auto">
                {JSON.stringify(postResponse, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-lg">
          <h4 className="font-medium">Error:</h4>
          <p>{error}</p>
        </div>
      )}

      <div className="p-4 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-medium text-blue-900 mb-2">
          About API Routes
        </h3>
        <ul className="list-disc list-inside text-blue-700 space-y-2">
          <li>API routes are server-side only</li>
          <li>They can handle HTTP methods (GET, POST, etc.)</li>
          <li>They can access server-side resources</li>
          <li>They can be called from client components</li>
        </ul>
      </div>
    </div>
  );
} 