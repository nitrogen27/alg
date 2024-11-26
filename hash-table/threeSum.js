function threeSum(nums) {
  const result = [];

  if (nums.length === 0) {
    return result;
  }
  if (nums.length === 3) {
    if (nums[0] + nums[1] + nums[2] === 0) {
      return [nums];
    }
    return result;
  }

  nums.sort((a, b) => a - b);

  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i - 1] === nums[i]) continue;
    for (let j = i + 1; j < nums.length - 1; j++) {
      if (j > i + 1 && nums[j - 1] === nums[j]) continue;

      const target = 0 - (nums[i] + nums[j]);

      let left = j + 1;
      let right = nums.length - 1;

      while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (target === nums[mid]) {
          result.push([nums[i], nums[j], nums[mid]]);
        }
        if (target < nums[mid]) {
          right = mid - 1;
        } else {
          left = mid + 1;
        }
      }
    }
  }
  return result;
}
