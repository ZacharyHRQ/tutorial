# Mutex Patterns

Mutex (Mutual Exclusion) patterns are used to ensure that only one piece of code can access a shared resource at a time, preventing race conditions and maintaining data consistency.

## Key Concepts

1. **Mutex**
   - Ensures exclusive access to a resource
   - Prevents concurrent modifications
   - Maintains data integrity

2. **Semaphore**
   - Controls access to multiple resources
   - Allows a specified number of concurrent accesses
   - Useful for resource pooling

## Example Implementation

```typescript
// Mutex implementation
class Mutex {
  private locked = false;
  private queue: Array<() => void> = [];

  async acquire(): Promise<void> {
    if (!this.locked) {
      this.locked = true;
      return;
    }

    return new Promise<void>((resolve) => {
      this.queue.push(resolve);
    });
  }

  release(): void {
    if (this.queue.length > 0) {
      const next = this.queue.shift();
      next?.();
    } else {
      this.locked = false;
    }
  }
}

// Semaphore implementation
class Semaphore {
  private permits: number;
  private queue: Array<() => void> = [];

  constructor(permits: number) {
    this.permits = permits;
  }

  async acquire(): Promise<void> {
    if (this.permits > 0) {
      this.permits--;
      return;
    }

    return new Promise<void>((resolve) => {
      this.queue.push(resolve);
    });
  }

  release(): void {
    if (this.queue.length > 0) {
      const next = this.queue.shift();
      next?.();
    } else {
      this.permits++;
    }
  }
}
```

## Use Cases

1. **Mutex**
   - Database transactions
   - File system operations
   - Critical section protection
   - State management

2. **Semaphore**
   - Connection pooling
   - Rate limiting
   - Resource management
   - Concurrent task control

## Best Practices

1. **Resource Management**
   - Always release locks
   - Handle errors properly
   - Implement timeouts
   - Clean up resources

2. **Error Handling**
   - Handle deadlocks
   - Implement retry logic
   - Log lock acquisition failures
   - Provide fallback mechanisms

3. **Performance Considerations**
   - Minimize lock duration
   - Avoid nested locks
   - Use appropriate granularity
   - Monitor lock contention

## Implementation Tips

1. **Async/Await Usage**
   ```typescript
   async function withMutex<T>(mutex: Mutex, fn: () => Promise<T>): Promise<T> {
    await mutex.acquire();
    try {
      return await fn();
    } finally {
      mutex.release();
    }
   }
   ```

2. **Timeout Handling**
   ```typescript
   async function acquireWithTimeout(mutex: Mutex, timeout: number): Promise<boolean> {
     const timeoutPromise = new Promise<boolean>((resolve) => {
       setTimeout(() => resolve(false), timeout);
     });
     
     return Promise.race([
       mutex.acquire().then(() => true),
       timeoutPromise
     ]);
   }
   ```

## Common Pitfalls

1. **Deadlocks**
   - Multiple lock acquisition
   - Circular dependencies
   - Missing lock release
   - Improper lock ordering

2. **Performance Issues**
   - Long lock durations
   - Excessive locking
   - Lock contention
   - Resource starvation

## Further Reading

- [MDN: Atomics](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Atomics)
- [Concurrency in JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [Web Workers and Concurrency](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) 