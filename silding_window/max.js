
Example 1:

Input: nums = [1,3,-1,-3,5,3,6,7], k = 3
Output: [3,3,5,5,6,7]
Explanation: 
Window position                Max
---------------               -----
[1  3  -1] -3  5  3  6  7       3
 1 [3  -1  -3] 5  3  6  7       3
 1  3 [-1  -3  5] 3  6  7       5
 1  3  -1 [-3  5  3] 6  7       5
 1  3  -1  -3 [5  3  6] 7       6
 1  3  -1  -3  5 [3  6  7]      7
Example 2:

Input: nums = [1], k = 1
Output: [1]
export function max(nums, k) {
  const help = [];
  const result = [];
  let start = 0;

  for (let i = 0; i < nums.length; i++) {
    while (nums[i] > nums[help[help.length - 1]]) {
      help.pop();
    }
    help.push(i);

    if (i - start + 1 === k) {
      result.push(nums[help[0]]);
      start++;
    }
  }
  console.log(result);
  return result;
}
