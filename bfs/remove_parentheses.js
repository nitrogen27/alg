Example 1:

Input: s = "()())()"
Output: ["(())()","()()()"]
Example 2:

Input: s = "(a)())()"
Output: ["(a())()","(a)()()"]
Example 3:

Input: s = ")("
Output: [""]
 
export function remove_parentheses(s) {
  function validate(s) {
    const stack = [];
    for(let symbol of s){
      if(symbol === "("){
        stack.push(symbol);
      }
      if(symbol === ")" && stack.pop() !== "("){
        return false
      }
    }
    return stack.length === 0;
  }
  const stack = [s];
  const visited = new Set();
  let result = "";
  while (stack.length) {
    let isValid = false;
    const newStr = stack.pop();
    if (validate(newStr)) {
      isValid = true;
      result = newStr;
    }
    if (!isValid) {
      for (let i = 0; i < newStr.length; i++) {
        if (newStr[i] !== "(" && newStr[i] !== ")") continue;
        const next = newStr.substring(0, i) + newStr.substring(i + 1);
        if (!visited.has(next) && next) {
          visited.add(next);
          stack.push(next);
        }
      }
    }
  }
  console.log(result);
  return result;
}
export function remove_parentheses(s) {
  function validate(s) {
    const stack = [];
    for(let symbol of s){
      if(symbol === "("){
        stack.push(symbol);
      }
      if(symbol === ")" && stack.pop() !== "("){
        return false
      }
    }
    return stack.length === 0;
  }
  if (!s || s.length === 0) return [''];
  const stack = [s];
  const visited = new Set();
  let result = [];
  let isValid = false;
  while (stack.length > 0) {
    const newStr = stack.shift();
    if (validate(newStr)) {
      isValid = true;
      result.push(newStr);
    }
    if (!isValid) {
      for (let i = 0; i < newStr.length; i++) {
        if (newStr[i] !== "(" && newStr[i] !== ")") continue;
        const next = newStr.substring(0, i) + newStr.substring(i + 1);
        if (!visited.has(next)) {
          visited.add(next);
          stack.push(next);
        }
      }
    }
  }
  console.log(result);
  return result;
}
/**
 * @param {string} s
 * @return {string[]}
 */
var isValid = string => {
  let open = 0;
  for (const c of string) {
    if (c === '(') open++;// Increment open brackets
    else if (c === ')') {
      if (open === 0) return false;// If closing bracket, but no open bracket, this is invalid
      open--;
    }
  }

  return open === 0;// Open brackets should be zero for valid string
};
/**
 * @param {string} s
 * @return {string[]}
 */
var isValid = string => {
    let open = 0;
    for (const c of string) {
        if (c === '(') open++;// Increment open brackets
        else if (c === ')') {
            if (open === 0) return false;// If closing bracket, but no open bracket, this is invalid
            open--;
        }
    }
    
    return open === 0;// Open brackets should be zero for valid string
};

var removeInvalidParentheses = function(s) {
    /**
        Concept:
            -- Since we have to remove minimum number of invalid parentheses, the problem can be looked at as considering every invalid string and trying to remove a parentheses at each
               position and trying to see if all those strings are valid. This can be thought as similar to BFS.
            -- Every time an invalid string is present, we repeat the above process.
            -- If a valid string is found, that's the string with minimum removes. We should be looking
               for more such valid strings in our queue, but not creating substrings anymore.
        
        Approach:
            -- Push input string on a queue and also mark it as seen, so we don't look at it again.
            -- For each string removed from queue front, check if it is a valid string.
               -- If valid, keep looking for other valid strings in the queue.
               -- If invalid and a valid string is already found, don't do anything.
               -- If invalid and no valid string is found, do the following:
                  -- For each character of the string, create a substring with all characters but that.
                  -- If the substring is not seen before, add it to seen and push to queue
    */
    
    // Time Complexity: O(2^N) since each one of N characters can be included in string or not.
    // Space Complexity: O(N^2) since there is worst case N recursion depth, with O(N) space to store string at each level
    
    if (!s || s.length === 0) return [''];
    
    const queue = [s], seen = new Set(), result = [];
    seen.add(s);
    
    let validFound = false;
    
    while (queue.length > 0) {
        let expression = queue.shift();
        
        // If expression is valid
        if (isValid(expression)) {
            result.push(expression);// Push to result
            validFound = true;
        }
        
        if (validFound) continue;// If atleast one valid string found, don't do anything
        
        for (let i = 0; i < expression.length; i++) {
            if (expression[i] !== '(' && expression[i] !== ')') {
                continue;// If expression's i-th character is anything but one of ( or ), continue
            }
            
            // Calculate next string for consideration
            // Characters 0 to i-th (not including) + Characters (i + 1)th (including) to end
            let next = expression.substring(0, i) + expression.substring(i + 1);
            if (!seen.has(next)) {
                seen.add(next);
                queue.push(next);
            }
        }
    }
    
    return result;
};
