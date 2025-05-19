import NavMenu from '../components/NavMenu';

export default function Home() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900">Welcome to the Interactive Tutorial</h2>
      
      <div className="prose max-w-none">
        <p className="text-lg text-gray-600">
          This tutorial covers essential concepts in modern web development using Next.js and React.
          Each section provides hands-on examples and explanations of key concepts.
        </p>

        <h3 className="text-xl font-semibold mt-8 mb-4">What You'll Learn:</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900">React Core Concepts</h4>
            <ul className="mt-2 text-gray-600 list-disc list-inside">
              <li>State Management with useState</li>
              <li>Side Effects with useEffect</li>
              <li>Refs and DOM Access</li>
              <li>Understanding Re-renders</li>
            </ul>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900">Next.js Features</h4>
            <ul className="mt-2 text-gray-600 list-disc list-inside">
              <li>App Router and Layouts</li>
              <li>Server and Client Components</li>
              <li>API Routes</li>
            </ul>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900">Browser APIs</h4>
            <ul className="mt-2 text-gray-600 list-disc list-inside">
              <li>Web Bluetooth API</li>
              <li>File System Access API</li>
            </ul>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900">Performance & Tools</h4>
            <ul className="mt-2 text-gray-600 list-disc list-inside">
              <li>Web Workers</li>
              <li>Data Batching</li>
              <li>Throttling & Debouncing</li>
              <li>State Management with Zustand</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-900">Getting Started</h4>
          <p className="mt-2 text-blue-700">
            Use the navigation menu on the left to explore each section. Each example is self-contained
            and includes explanations of the concepts being demonstrated.
          </p>
        </div>
      </div>
    </div>
  );
}
