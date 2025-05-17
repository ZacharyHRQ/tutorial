export default function RoutingLayoutsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <header>
        <h1>Routing & Layouts Demo</h1>
      </header>
      {children}
      <footer>
        <p>End of Routing Section</p>
      </footer>
    </div>
  );
} 