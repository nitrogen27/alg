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
