Example 1:

Input: s = "ABAB", k = 2
Output: 4
Explanation: Replace the two 'A's with two 'B's or vice versa.
Example 2:

Input: s = "AABABBA", k = 1
Output: 4
Explanation: Replace the one 'A' in the middle with 'B' and form "AABBBBA".
The substring "BBBB" has the longest repeating letters, which is 4.
There may exists other ways to achieve this answer too.
export function replacement(s, k) {
  let start = 0;
  let end = 0;
  let result = 0;
  const fr = new Array(26).fill(0);
  const help = [];

  while (end < s.length) {
    fr[s.charCodeAt(end) - "A".charCodeAt(0)]++;
    while (
      fr[s.charCodeAt(end) - "A".charCodeAt(0)] >
      fr[s.charCodeAt(help[help.length - 1]) - "A".charCodeAt(0)]
    ) {
      help.pop();
    }
    help.push(end);
    let need = end - start + 1 -  fr[s.charCodeAt(help[help.length - 1]) - "A".charCodeAt(0)];
    if (need > k) {
      if (
        fr[s.charCodeAt(start) - "A".charCodeAt(0)] ===
        fr[s.charCodeAt(help[0]) - "A".charCodeAt(0)]
      ) {
        help.shift();
      }
      start++;
    }
    if (need < k) {
      if (end - start + 1 > result) {
        result = end - start + 1;
      }
      end++;
    }
  }
  return result;
}
export function replacement(s, k) {
  let start = 0;
  let end = 0;
  const fr = new Array(26).fill(1);
  let maxFr = 1;
  let result = 1;

  while (end < s.length) {
    let indexStartChar = s.charCodeAt(start) - "A".charCodeAt(0);
    let indexEndChar = s.charCodeAt(end) - "A".charCodeAt(0);
    maxFr = Math.max(maxFr, fr[indexEndChar]);
    const lengthStr = end - start + 1;
    const need = lengthStr - maxFr;
    if (need > k) {
      fr[indexStartChar]--;
      console.log(s.slice(start, end + 1), need,lengthStr, result);
      start++;
    }
    if (need <= k) {
      fr[indexEndChar]++;
      result = Math.max(result, lengthStr);
      console.log(s.slice(start, end + 1), need,lengthStr, result);
      end++;
    }
  }
  console.log(result);
  return result;
}
