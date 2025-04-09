export function sameTree(p, q) {
  function isSame(p, q) {
    if (p.val !== q.val) {
      return false;
    }
    let left , right = false;
    if(p.left !== null && q.left !== null){
     left = isSame(p.left, q.left);
    }
    if(p.right !== null && q.right !== null){
      right =  isSame(p.right, q.right);
    }
    if(p.left === null && q.left === null || (p.right === null && q.right === null)){
      return true;
    }
    return !(left === false || right === false);

  }
  console.log(isSame(p, q));
  return isSame(p, q);
}
export function sameTree(p, q) {
  function isSame(p, q) {
    if (p === null && q === null) {
      return true;
    }
    if (p.val !== q.val) {
      return false;
    }
    let left = false,
      right = false;
    if (p.left !== null && q.left !== null) {
      left = isSame(p.left, q.left);
    }
    if (p.right !== null && q.right !== null) {
      right = isSame(p.right, q.right);
    }
    if (p.left === null && q.left === null) {
      left = true;
    }
    if (p.right === null && q.right === null) {
      right = true;
    }
    return !(left === false || right === false);
  }
  console.log(isSame(p, q));
  return isSame(p, q);
}
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function(p, q) {
    function isSame(p, q) {
        if(!p && !q){
            return true
        }
    if (p?.val !== q?.val) {
      return false;
    }
    let left = false , right = false;
    if(p.left !== null && q.left !== null){
     left = isSame(p.left, q.left);
    }
    if(p.right !== null && q.right !== null){
      right =  isSame(p.right, q.right);
    }
    if (p.left === null && q.left === null) {
      left = true;
    }
    if (p.right === null && q.right === null) {
      right = true;
    }
    return !(left === false || right === false);

  }
  return isSame(p, q);
};
