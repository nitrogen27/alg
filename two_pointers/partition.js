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
/**
 * @param {string} s
 * @return {number[]}
 */
const toInt = (char)=> char.charCodeAt(0) - 'a'.charCodeAt(0);
var partitionLabels = function(s) {
    const last = new Array(26).fill(-1);
    for(let i = 0; i < s.length; i++){
        const char = s[i], order = toInt(char);
        last[order] = i;
    }
    let result = [], size = 0, max = 0;
    for(let i = 0; i < s.length; i++){
        size++
        const char = s[i], order = toInt(char);
        max = Math.max(max, last[order])
        if(max > i)
            continue;
        max = 0
        result.push(size)
        size = 0
    }
    return result;
};
