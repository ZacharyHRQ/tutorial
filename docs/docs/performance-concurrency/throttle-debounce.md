# Throttling and Debouncing

Throttling and debouncing are techniques used to control how often a function is executed, particularly useful for handling events that can fire rapidly, such as scroll, resize, or input events.

## Key Concepts

1. **Throttling**
   - Limits function execution to once per specified time period
   - Ensures regular execution at a controlled rate
   - Useful for continuous events like scrolling

2. **Debouncing**
   - Delays function execution until after a specified time has passed
   - Only executes the function once after the event stops firing
   - Ideal for search inputs and form validation

## Example Implementation

```typescript
// Throttle implementation
function throttle<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let lastCall = 0;
  
  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      func(...args);
      lastCall = now;
    }
  };
}

// Debounce implementation
function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}
```

## Use Cases

1. **Throttling**
   - Scroll event handling
   - Resize event handling
   - API rate limiting
   - Game input handling

2. **Debouncing**
   - Search input fields
   - Form validation
   - Window resize calculations
   - Auto-save functionality

## Key Differences

1. **Timing**
   - Throttle: Regular intervals
   - Debounce: After inactivity

2. **Use Cases**
   - Throttle: Continuous events
   - Debounce: One-time events

3. **Behavior**
   - Throttle: Guaranteed execution
   - Debounce: Delayed execution

## Best Practices

1. **Choose the Right Delay**
   - Consider user experience
   - Balance responsiveness and performance
   - Test different values

2. **Memory Management**
   - Clear timeouts properly
   - Handle component unmounting
   - Avoid memory leaks

3. **Error Handling**
   - Handle edge cases
   - Provide fallback behavior
   - Log errors appropriately

4. **Performance Considerations**
   - Monitor execution frequency
   - Profile memory usage
   - Optimize delay values

## Implementation Tips

1. **React Integration**
   ```typescript
   const throttledHandler = useCallback(
     throttle((value: string) => {
       // Handle the value
     }, 1000),
     []
   );
   ```

2. **Cleanup**
   ```typescript
   useEffect(() => {
     const handler = throttle(() => {
       // Handle event
     }, 1000);
     
     window.addEventListener('scroll', handler);
     return () => window.removeEventListener('scroll', handler);
   }, []);
   ```

## Common Pitfalls

1. **Memory Leaks**
   - Not clearing timeouts
   - Not removing event listeners
   - Keeping stale references

2. **Stale State**
   - Using outdated values
   - Not considering closure scope
   - Missing dependencies

## Further Reading

- [MDN: Throttling and Debouncing](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame)
- [Lodash: Throttle and Debounce](https://lodash.com/docs#throttle)
- [React: useCallback Hook](https://reactjs.org/docs/hooks-reference.html#usecallback) 