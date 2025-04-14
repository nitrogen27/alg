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
