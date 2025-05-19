'use client';

import Link from 'next/link';

const tutorialSections = [
  { path: '/01-react-core/state-effect-ref', label: 'React Core: State, Effect, Ref' },
  { path: '/01-react-core/re-renders', label: 'React Core: Re-renders' },
  { path: '/02-nextjs-concepts/routing-layouts', label: 'Next.js: Routing & Layouts' },
  { path: '/02-nextjs-concepts/client-server-components', label: 'Next.js: Client & Server Components' },
  { path: '/02-nextjs-concepts/api/basic-ble-sync', label: 'Next.js: Basic BLE Sync API' },
  { path: '/03-web-bluetooth', label: 'Web Bluetooth API' },
  { path: '/04-file-system-access', label: 'File System Access API' },
  { path: '/05-performance-concurrency/web-workers', label: 'Performance: Web Workers' },
  { path: '/05-performance-concurrency/data-batching', label: 'Performance: Data Batching' },
  { path: '/05-performance-concurrency/throttle-debounce', label: 'Performance: Throttle & Debounce' },
  { path: '/05-performance-concurrency/mutex-patterns', label: 'Performance: Mutex Patterns' },
  { path: '/06-tools-libraries/zustand-state', label: 'Tools: Zustand State' },
  { path: '/06-tools-libraries/react-use-example', label: 'Tools: React Use Example' },
];

export default function NavMenu() {
  return (
    <nav className="p-4">
      <ul className="space-y-2">
        {tutorialSections.map((section) => (
          <li key={section.path}>
            <Link 
              href={section.path}
              className="text-blue-600 hover:text-blue-800 hover:underline"
            >
              {section.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
