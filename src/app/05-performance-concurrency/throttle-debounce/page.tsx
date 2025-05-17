'use client';

import { useState } from 'react';
import { throttle, debounce } from 'lodash-es';

export default function ThrottleDebouncePage() {
  const [inputValue, setInputValue] = useState<string>('');

  const handleNormalLog = (value: string) => {
    console.log('Normal Log:', value);
  };

  const handleDebouncedLog = debounce((value: string) => {
    console.log('Debounced Log:', value);
  }, 500);

  const handleThrottledLog = throttle((value: string) => {
    console.log('Throttled Log:', value);
  }, 500);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    handleNormalLog(value);
    handleDebouncedLog(value);
    handleThrottledLog(value);
  };

  return (
    <div>
      <h1>Throttle & Debounce Demo</h1>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Type something..."
      />
      <p>Check console for logs.</p>
    </div>
  );
}
