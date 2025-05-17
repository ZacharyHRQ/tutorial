# Performance & Concurrency

This section demonstrates performance and concurrency patterns using minimal, runnable examples.

## Web Workers
- Web Workers allow you to run scripts in background threads.
- Example: A web worker that performs a computationally intensive loop.

## Data Batching
- Batching updates can prevent UI jank.
- Example: A data stream that updates the UI directly and in batches.

## Throttling & Debouncing
- Throttling and debouncing can limit the rate at which a function is called.
- Example: An input field that logs changes normally, debounced, and throttled.

## Mutex Patterns
- Mutex patterns can prevent race conditions in concurrent code.
- Example: A shared counter that uses a basic mutex to prevent concurrent updates.

## Learn More
- [MDN Web Workers Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)
- [Lodash Documentation](https://lodash.com/docs) 