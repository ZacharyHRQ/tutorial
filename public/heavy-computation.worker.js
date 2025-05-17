// Web Worker for heavy computation
self.onmessage = function(event) {
  const countTo = event.data.countTo;
  let result = 0;
  for (let i = 0; i < countTo; i++) {
    result += i;
  }
  self.postMessage({ result: result, originalInput: countTo });
};
