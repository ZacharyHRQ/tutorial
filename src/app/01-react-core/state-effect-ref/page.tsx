'use client';

import { useState, useEffect, useRef } from 'react';

export default function StateEffectRefDemo() {
  // useState examples
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  // useEffect examples
  const [mockData, setMockData] = useState('Loading...');
  const [prevCount, setPrevCount] = useState<number | undefined>();

  // useRef examples
  const inputRef = useRef<HTMLInputElement>(null);
  const prevCountRef = useRef<number>();

  // Mount effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setMockData('Data loaded successfully!');
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Dependency effect
  useEffect(() => {
    console.log('Counter changed:', count);
  }, [count]);

  // Cleanup effect
  useEffect(() => {
    const timerId = setInterval(() => {
      console.log('Timer tick');
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  // Track previous count
  useEffect(() => {
    prevCountRef.current = count;
    setPrevCount(prevCountRef.current);
  }, [count]);

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">React Core Hooks Demo</h2>

      {/* useState Section */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold">useState Examples</h3>
        
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium mb-2">Counter Example</h4>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCount(c => c - 1)}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              -
            </button>
            <span className="text-lg font-medium">Count: {count}</span>
            <button
              onClick={() => setCount(c => c + 1)}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              +
            </button>
          </div>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium mb-2">Text Input Example</h4>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Type something..."
          />
          <p className="mt-2">Current text: {text}</p>
        </div>
      </section>

      {/* useEffect Section */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold">useEffect Examples</h3>
        
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium mb-2">Mount Effect</h4>
          <p>{mockData}</p>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium mb-2">Dependency Effect</h4>
          <p>Check console for counter change logs</p>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium mb-2">Cleanup Effect</h4>
          <p>Check console for timer ticks</p>
        </div>
      </section>

      {/* useRef Section */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold">useRef Examples</h3>
        
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium mb-2">DOM Focus Example</h4>
          <div className="flex gap-4">
            <input
              ref={inputRef}
              type="text"
              className="flex-1 p-2 border rounded"
              placeholder="This input can be focused"
            />
            <button
              onClick={() => inputRef.current?.focus()}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Focus Input
            </button>
          </div>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium mb-2">Previous Value Tracking</h4>
          <p>Previous count: {prevCount}</p>
        </div>
      </section>
    </div>
  );
}
