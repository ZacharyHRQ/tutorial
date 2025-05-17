import Link from 'next/link';

export default function NestedRoutePage() {
  return (
    <div>
      <h1>This is a Nested Route</h1>
      <Link href="/02-nextjs-concepts/routing-layouts">Go Back</Link>
    </div>
  );
}
