export function mergedArray(nums1, m, nums2, n) {
  for(let i=0; i < m + n; i++){
    if(nums1[i] > nums2[0] || nums1[i] === 0){
      nums1.splice(i,0,nums2[0]);
      nums1.pop();
      nums2.shift();
    }
  }
  return true;
}
var merge = function (nums1, m, nums2, n) {
    // Set p1 and p2 to point to the end of their respective arrays.
    let p1 = m - 1;
    let p2 = n - 1;
    // And move p backward through the array, each time writing
    // the largest value pointed at by p1 or p2.
    for (let p = m + n - 1; p >= 0; p--) {
        if (p2 < 0) {
            break;
        }
        if (p1 >= 0 && nums1[p1] > nums2[p2]) {
            nums1[p] = nums1[p1--];
        } else {
            nums1[p] = nums2[p2--];
        }
    }
};
/*
[1,3,5,0,0,0]
[2,4,6]

5 < 6  [1,3,5,0,0,6] [2,4]

5 > 4  [1,3,5,0,5,6] [2,4]

3 > 2  [1,3,3,4,5,6] [2]

1 < 2  [1,2,3,4,5,6] []

 */

export function merged(nums1, m, nums2, n) {
  let curNums1 = m - 1;
  let curNums2 = n - 1;
  while (curNums2) {
    if (nums1[curNums1] > nums2[curNums2]) {
      nums1[curNums1 + n] = nums1[curNums1];
      curNums1--;
    } else {
      nums1[curNums1 + n] = nums2[curNums2];
      curNums1--;
      curNums2--;
    }
  }
  return nums1
}
export function merged(nums1, m, nums2, n) {
  let curNums1 = m - 1;
  let curNums2 = n - 1;
  let curEnd = m + n - 1;
  
  while(curNums2){
    if(nums1[curNums1] <= nums2[curNums2]){
      nums1[curEnd] = nums2[curNums2];
      curNums2--;
    }
    else{
      nums2[curEnd] = nums1[curNums1];
      curNums1--;
    }
    curEnd--;
  }
}
export function merged(nums1, m, nums2, n) {
  let curNums1 = m - 1;
  let curNums2 = n - 1;
  let curEnd = m + n - 1;
  
  while(curNums2){
    if(nums1[curNums1] <= nums2[curNums2]){
      nums1[curEnd] = nums2[curNums2];
      curNums2--;
    }
    else{
      nums2[curEnd] = nums1[curNums1];
      curNums1--;
    }
    curEnd--;
  }
}
