'use client';

import { useToggle, useLocalStorage } from 'react-use';

export default function ReactUseExamplePage() {
  const [on, toggle] = useToggle(false);
  const [name, setName] = useLocalStorage('myName', 'Initial Name');

  return (
    <div>
      <h1>React Use Example</h1>
      <div>
        <h2>useToggle Demo</h2>
        <p>Value: {on ? 'ON' : 'OFF'}</p>
        <button onClick={toggle}>Toggle</button>
      </div>
      <div>
        <h2>useLocalStorage Demo</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
        <p>Stored Name: {name}</p>
      </div>
    </div>
  );
}
