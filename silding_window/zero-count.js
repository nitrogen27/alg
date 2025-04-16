export function counter(nums) {
  let left = 0;
  let right = 0;
  let count = 0;
  let result = 0;

  while (right < nums.length) {
    if(nums[right] === 0 && count < 2){
      count++
    }
    if(count < 2){
      result = Math.max(result, right - left)
      right++
    }
    if(count >= 2){
      if(nums[left] === 0){
        count--;
        right++;
      }
      left++
    }

  }
  console.log("result", result)
  return result;
}
