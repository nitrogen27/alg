function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val);
    this.left = (left === undefined ? null : left);
    this.right = (right === undefined ? null : right);
}

function isBalanced(root) {
    // Вспомогательная функция для проверки сбалансированности и вычисления высоты
    const checkHeight = (node) => {
        if (!node) return 0; // Высота пустого поддерева = 0
        
        const leftHeight = checkHeight(node.left);
        if (leftHeight === -1) return -1; // Левое поддерево несбалансировано
        
        const rightHeight = checkHeight(node.right);
        if (rightHeight === -1) return -1; // Правое поддерево несбалансировано
        
        // Проверка разницы высот
        if (Math.abs(leftHeight - rightHeight) > 1) return -1;
        
        // Возвращаем высоту текущего поддерева
        return Math.max(leftHeight, rightHeight) + 1;
    };
    
    return checkHeight(root) !== -1;
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
 * @param {TreeNode} root
 * @return {boolean}
 */
var isBalanced = function(root) {
    function getHeight(node){
        if(!node){
            return 0
        }
       return 1 + (Math.max(getHeight(node.right),getHeight(node.left))); 
    }

    if(!root){
        return true
    }

    return Math.abs(getHeight(root.right)- getHeight(root.left)) <= 1 && isBalanced(root.left) && isBalanced(root.right)
};
