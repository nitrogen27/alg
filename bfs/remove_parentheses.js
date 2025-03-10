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

