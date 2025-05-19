'use client';

import { useState, useCallback, memo } from 'react';

// Child component that will be memoized
const ChildComponent = memo(function ChildComponent({ 
  onClick, 
  label 
}: { 
  onClick?: () => void;
  label?: string;
}) {
  console.log(`${label || 'Child'} component rendered`);
  
  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <p className="mb-2">This is a {label || 'child'} component</p>
      {onClick && (
        <button
          onClick={onClick}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Click me
        </button>
      )}
    </div>
  );
});

export default function ReRendersDemo() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  // Function that will be recreated on every render
  const handleClickWithoutCallback = () => {
    console.log('Button clicked!');
  };

  // Function that will be memoized
  const handleClickWithCallback = useCallback(() => {
    console.log('Button clicked!');
  }, []);

  // Function that captures stale closure
  const handleStaleClosure = () => {
    setTimeout(() => {
      console.log('Stale count value:', count);
    }, 3000);
  };

  // Function that uses functional update to avoid stale closure
  const handleFixedClosure = () => {
    setTimeout(() => {
      setCount(prevCount => {
        console.log('Current count value:', prevCount);
        return prevCount;
      });
    }, 3000);
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">React Re-renders Demo</h2>

      {/* Parent state that triggers re-renders */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold">Parent Component State</h3>
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => setCount(c => c + 1)}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Increment Count
            </button>
            <span className="text-lg font-medium">Count: {count}</span>
          </div>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Type to trigger re-renders..."
          />
        </div>
      </section>

      {/* Memo demo */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold">React.memo Demo</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium mb-2">Without Memo</h4>
            <ChildComponent label="Non-memoized" />
          </div>
          <div>
            <h4 className="font-medium mb-2">With Memo</h4>
            <ChildComponent label="Memoized" />
          </div>
        </div>
      </section>

      {/* useCallback demo */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold">useCallback Demo</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium mb-2">Without useCallback</h4>
            <ChildComponent 
              label="Non-callback" 
              onClick={handleClickWithoutCallback} 
            />
          </div>
          <div>
            <h4 className="font-medium mb-2">With useCallback</h4>
            <ChildComponent 
              label="Callback" 
              onClick={handleClickWithCallback} 
            />
          </div>
        </div>
      </section>

      {/* Stale closure demo */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold">Stale Closure Demo</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium mb-2">Stale Closure</h4>
            <p className="mb-2">Click and quickly increment the count before 3 seconds</p>
            <button
              onClick={handleStaleClosure}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Show Stale Value
            </button>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium mb-2">Fixed Closure</h4>
            <p className="mb-2">Click and quickly increment the count before 3 seconds</p>
            <button
              onClick={handleFixedClosure}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Show Current Value
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
