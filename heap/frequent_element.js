export function Frequent_elements(nums, k) {
  const hash = new Map();
  const heap = [];
  const result = [];

  for (let n of nums) {
    hash.set(n, hash.has(n) ? hash.get(n) + 1 : 1);
  }

  for (let [key, value] of Array.from(hash)) {
    heap[value] = key;
  }
  while (heap.length) {
    if (result.length < k) {
      result.push(heap.pop());
    } else {
      console.log(result);
      return result;
    }
  }
}

