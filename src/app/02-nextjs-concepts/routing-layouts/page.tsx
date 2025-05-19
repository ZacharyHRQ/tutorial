import Link from 'next/link';

export default function RoutingPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Main Routing Page</h2>
      
      <div className="p-4 bg-gray-50 rounded-lg">
        <p className="mb-4">
          This is the main page of the routing section. Notice how it's wrapped in a layout
          that provides a consistent header and footer.
        </p>
        
        <Link 
          href="/02-nextjs-concepts/routing-layouts/nested-route"
          className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Go to Nested Route
        </Link>
      </div>

      <div className="p-4 bg-blue-50 rounded-lg">
        <h3 className="font-medium text-blue-900 mb-2">About Next.js Routing</h3>
        <ul className="list-disc list-inside text-blue-700 space-y-2">
          <li>Next.js uses file-system based routing</li>
          <li>Files in the <code>app</code> directory automatically become routes</li>
          <li>Layouts can be shared between routes</li>
          <li>Nested routes are created using nested folders</li>
        </ul>
      </div>
    </div>
  );
}
