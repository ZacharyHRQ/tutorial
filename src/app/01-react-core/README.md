# React Core Concepts

This section demonstrates core React concepts using minimal, runnable examples.

## useState
- `useState` is a hook that lets you add state to functional components.
- Example: A counter and a text input.

## useEffect
- `useEffect` is a hook for performing side effects in functional components.
- Examples:
  - Mount effect: Simulates a fetch on component mount.
  - Dependency effect: Logs when the counter changes.
  - Cleanup effect: Sets up and cleans up an interval.

## useRef
- `useRef` is a hook that returns a mutable ref object.
- Examples:
  - DOM focus: Focuses an input field on button click.
  - Mutable value: Stores the previous value of the counter.

## Re-renders
- Demonstrates unnecessary re-renders and how to prevent them using `React.memo` and `useCallback`.
- Example: A child component that logs when rendered.

## Stale Closures
- Demonstrates stale closures and how to fix them.
- Example: A button that logs the count after a delay.

## Learn More
- [React Hooks Documentation](https://reactjs.org/docs/hooks-intro.html)
- [React.memo Documentation](https://reactjs.org/docs/react-api.html#reactmemo)
- [useCallback Documentation](https://reactjs.org/docs/hooks-reference.html#usecallback) 