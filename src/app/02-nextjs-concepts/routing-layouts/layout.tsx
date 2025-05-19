export default function RoutingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-6">
      <header className="bg-blue-50 p-4 rounded-lg">
        <h1 className="text-2xl font-bold text-blue-900">Routing & Layouts Demo</h1>
        <p className="text-blue-700">This is a layout specific to the routing section</p>
      </header>

      <main className="bg-white p-6 rounded-lg shadow">
        {children}
      </main>

      <footer className="bg-gray-50 p-4 rounded-lg text-center text-gray-600">
        <p>End of Routing Section</p>
      </footer>
    </div>
  );
} 