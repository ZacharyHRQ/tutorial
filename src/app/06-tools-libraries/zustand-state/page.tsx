'use client';

import { useBearStore } from '../../store/myZustandStore';

export default function ZustandStatePage() {
  const { bears, increasePopulation } = useBearStore();

  return (
    <div>
      <h1>Zustand State Demo</h1>
      <p>Number of bears: {bears}</p>
      <button onClick={increasePopulation}>Add a Bear</button>
    </div>
  );
}
