export function symmetricTree(root) {
  function isSymmetric(q,p) {
    if(!q && !p){
      return true
    }
    if(!q || !p){
      return false
    }
    return q.val === p.val && isSymmetric(q.left,p.right) && isSymmetric(q.right, p.left)
  }
  return isSymmetric(root.left,root.right);
}

