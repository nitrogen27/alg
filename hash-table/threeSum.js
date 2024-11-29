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
function optThreeSum(nums) {
  nums.sort((a, b) => a - b);
  const result = [];
  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    let left = i + 1;
    let right = nums.length - 1;
    while (left <= right) {
      while(left > i + 1 && nums[left] === nums[left-1]) left++
      while(right < nums.length - 1 && nums[right] === nums[right+1]) right--
      let target = 0 - nums[i];
      if (nums[left] + nums[right] === target) {
        result.push([nums[i], nums[left], nums[right]]);
      }
      if (target > nums[left] + nums[right]) {
        left++;
      } else {
        right--;
      }
    }
  }
  return result;
}
