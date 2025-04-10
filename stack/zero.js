export function zeromove(nums) {
  const zerostack = [];

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === 0) {
      zerostack.push(i);
    } else {
      if (zerostack.length) {
        nums[zerostack.shift()] = nums[i];
        nums[i] = 0;
        zerostack.push(i);
      }
    }
  }
  console.log(nums);
  return nums;
}
