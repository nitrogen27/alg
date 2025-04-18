export function closest(nums, x, k) {
  let left = 0;
  let right = nums.length - 1;

  const result = [];
  if (nums[left] < x && x < nums[right]) {
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (nums[mid] === x) {
        left = mid;
        break;
      }
      if (nums[mid] > x) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }
    right = left + 1;
  } else {
    if (x < nums[left]) {
      right = left;
    }
    if (x > nums[right]) {
      left = right;
    }
  }

  while (result.length < k) {
    if (nums[left] < x && x < nums[right]) {
      if (Math.abs(x - nums[left]) <= Math.abs(x - nums[right])) {
        result.unshift(nums[left]);
        if (nums[left - 1]) {
          left--;
        }
      } else {
        result.push(nums[right]);
        if (nums[right + 1]) {
          right++;
        }
      }
    } else {
      if (x < nums[0]) {
        result.push(nums[right]);
        right++;
      }
      else if(x === nums[0]){
        result.push(nums[left]);
        left++;
      }
      else {
        result.unshift(nums[right]);
        right--;
      }
    }
  }
  console.log(result);
  return result;
}
