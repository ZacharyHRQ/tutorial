// This worker performs a computationally intensive task
// and sends the result back to the main thread

self.onmessage = function(event) {
  const { countTo } = event.data;
  
  // Simulate heavy computation
  let result = 0;
  for (let i = 0; i < countTo; i++) {
    result += i;
  }

  // Send the result back to the main thread
  self.postMessage({
    result: `Computed sum from 0 to ${countTo - 1}: ${result}`,
    originalInput: countTo
  });
};
