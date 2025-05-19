import InteractiveClientComponent from './InteractiveClientComponent';

// This is a Server Component by default (no 'use client' directive)
export default function ClientServerPage() {
  // This data could come from a database or API
  const serverData = {
    message: 'Hello from the server!',
    timestamp: new Date().toISOString(),
  };

  return (
    <div className="space-y-8">
      <div className="p-4 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Server Component</h2>
        <p className="mb-2">
          This content is rendered on the server. The timestamp below is generated
          when the page is rendered on the server:
        </p>
        <p className="text-sm text-gray-600">
          Server timestamp: {serverData.timestamp}
        </p>
      </div>

      <div className="p-4 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-medium text-blue-900 mb-2">
          About Server Components
        </h3>
        <ul className="list-disc list-inside text-blue-700 space-y-2">
          <li>Render on the server by default</li>
          <li>Can access server-side resources directly</li>
          <li>Reduce client-side JavaScript</li>
          <li>Can pass data to Client Components</li>
        </ul>
      </div>

      <InteractiveClientComponent serverMessage={serverData.message} />
    </div>
  );
}
