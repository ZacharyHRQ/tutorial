'use client';

import Link from 'next/link';

export default function NavMenu() {
  return (
    <nav>
      <ul>
        <li><Link href="/01-react-core/state-effect-ref">React Core: State, Effect, Ref</Link></li>
        <li><Link href="/01-react-core/re-renders">React Core: Re-renders</Link></li>
        <li><Link href="/02-nextjs-concepts/routing-layouts">Next.js: Routing & Layouts</Link></li>
        <li><Link href="/02-nextjs-concepts/client-server-components">Next.js: Client & Server Components</Link></li>
        <li><Link href="/02-nextjs-concepts/api/basic-ble-sync">Next.js: Basic BLE Sync API</Link></li>
        <li><Link href="/03-web-bluetooth">Web Bluetooth API</Link></li>
        <li><Link href="/04-file-system-access">File System Access API</Link></li>
        <li><Link href="/05-performance-concurrency/web-workers">Performance: Web Workers</Link></li>
        <li><Link href="/05-performance-concurrency/data-batching">Performance: Data Batching</Link></li>
        <li><Link href="/05-performance-concurrency/throttle-debounce">Performance: Throttle & Debounce</Link></li>
        <li><Link href="/05-performance-concurrency/mutex-patterns">Performance: Mutex Patterns</Link></li>
        <li><Link href="/06-tools-libraries/zustand-state">Tools: Zustand State</Link></li>
        <li><Link href="/06-tools-libraries/react-use-example">Tools: React Use Example</Link></li>
      </ul>
    </nav>
  );
}
