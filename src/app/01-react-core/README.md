# React Core Concepts

This section covers fundamental React concepts and hooks that are essential for building modern React applications.

## useState

The `useState` hook is React's way of adding state to functional components. It returns an array with two elements:
1. The current state value
2. A function to update that state

```typescript
const [count, setCount] = useState(0);
```

Key points:
- State updates are asynchronous
- State updates trigger re-renders
- State is preserved between re-renders
- Each component instance has its own state

## useEffect

The `useEffect` hook lets you perform side effects in function components. It takes two arguments:
1. A function containing the effect code
2. A dependency array that determines when the effect runs

```typescript
useEffect(() => {
  // Effect code
  return () => {
    // Cleanup code
  };
}, [dependencies]);
```

Common use cases:
- Data fetching
- Subscriptions
- DOM manipulations
- Event listeners
- Timers

The dependency array can be:
- `[]` - Run only on mount
- `[value]` - Run when value changes
- Omitted - Run after every render

## useRef

The `useRef` hook creates a mutable reference that persists across renders. It has two main uses:
1. Accessing DOM elements
2. Storing mutable values that don't trigger re-renders

```typescript
const inputRef = useRef<HTMLInputElement>(null);
```

## Re-renders and Optimization

React components re-render when:
- Their state changes
- Their props change
- Their parent re-renders

Optimization techniques:
- `React.memo` - Prevents re-renders if props haven't changed
- `useCallback` - Memoizes functions to prevent unnecessary re-renders
- `useMemo` - Memoizes computed values

## Stale Closures

A stale closure occurs when a function captures a value from an outer scope that has since changed. Common in:
- Event handlers
- Timeouts
- Intervals
- Callbacks

Solutions:
- Use functional updates for state
- Include dependencies in useEffect
- Use refs for values that shouldn't trigger re-renders

## Resources

- [React Hooks Documentation](https://react.dev/reference/react)
- [React.memo Documentation](https://react.dev/reference/react/memo)
- [useCallback Documentation](https://react.dev/reference/react/useCallback)
- [useEffect Documentation](https://react.dev/reference/react/useEffect)
- [useRef Documentation](https://react.dev/reference/react/useRef) 