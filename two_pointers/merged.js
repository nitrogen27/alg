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
