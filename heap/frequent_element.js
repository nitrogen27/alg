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

export function frequent_elements(nums, k) {
  const hash = new Map();
  const heap = [];
  const result = [];

  for (let n of nums) {
    hash.set(n, hash.has(n) ? hash.get(n) + 1 : 1);
  }
  for (let [key, value] of Array.from(hash)) {
    heap[value] =  heap[value] ? [...heap[value],key] : [key];

  }
  while (heap.length) {
    if (result.length < k) {
      const value = heap.pop();
      if(value){
        result.push(...value);
      }

    } else {
      console.log(result);
      return result;
    }
  }
}
