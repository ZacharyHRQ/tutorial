import Link from 'next/link';

export default function NestedRoutePage() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Nested Route Page</h2>
      
      <div className="p-4 bg-gray-50 rounded-lg">
        <p className="mb-4">
          This is a nested route. Notice how it inherits the layout from its parent
          route, including the header and footer.
        </p>
        
        <Link 
          href="/02-nextjs-concepts/routing-layouts"
          className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Go Back
        </Link>
      </div>

      <div className="p-4 bg-blue-50 rounded-lg">
        <h3 className="font-medium text-blue-900 mb-2">About Nested Routes</h3>
        <ul className="list-disc list-inside text-blue-700 space-y-2">
          <li>Nested routes are created by adding folders inside the app directory</li>
          <li>They can have their own layouts, loading states, and error boundaries</li>
          <li>They inherit layouts from parent routes</li>
          <li>They can be accessed using nested paths in the URL</li>
        </ul>
      </div>
    </div>
  );
}
