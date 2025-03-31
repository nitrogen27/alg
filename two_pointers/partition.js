/*
Example 1:

Input: s = "ababcbacadefegdehijhklij"
Output: [9,7,8]
Explanation:
The partition is "ababcbaca", "defegde", "hijhklij".
This is a partition so that each letter appears in at most one part.
A partition like "ababcbacadefegde", "hijhklij" is incorrect, because it splits s into less parts.
Example 2:

Input: s = "eccbbbbdec"
Output: [10]

*/
export function partition(s) {
  const lastSymbol = new Map();
  let start = 0;
  let end = 0;
  const partition = [];

  for (let i = 0; i < s.length; i++) {
    lastSymbol.set(s[i], i);
  }
  for (let i = 0; i < s.length; i++) {
    let newEnd = lastSymbol.get(s[i]);
    if (newEnd > end) {
      end = newEnd;
    }
    if (i === end) {
      partition.push(end + 1 - start);
      start = end + 1;
    }
  }
  console.log(partition);
  return partition;
}
