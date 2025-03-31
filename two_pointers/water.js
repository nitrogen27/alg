/*
Input: height = [1,8,6,2,5,4,8,3,7]
Output: 49
Explanation: The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49.
Example 2:
Input: height = [1,1]
Output: 1
*/

export function water(nums) {
  let start = 0;
  let end = nums.length - 1;
  let size = 0;
  let newSize;

  while (start !== end) {
    if (nums[start] <= nums[end]) {
      newSize = (end - start) * nums[start];
      start += 1;
    } else {
      newSize = (end - start) * nums[end];
      end -= 1;
    }
    if(newSize > size){
      size = newSize;
    }
  }
  console.log(size);
  return size;
}
