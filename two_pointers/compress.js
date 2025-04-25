/*

DAAABBBCCC ["D","A",3,"B","3","C","3"]

AAABB


DA

1 D === D left === 0; right === 0
2 D !== A left === 0; right === 1
3 A === A left === 1; right === 2
4 A === A left === 1; right === 3
5 A !== B left === 1  right === 4

AAABBCC

1 A === A left === 0; right === 0
2 A === A left === 0; right === 1
3 A === A left === 0; right === 2
4 A !== B left === 0; right === 3
4 B === B left === 3; right === 4
5 B !== C left === 3; right === 5
6 C === C left === 5; right === 6

AB

1 A === A left === 0; right === 0
2 A !== B left === 0 right === 1

 */

export function compress(chars) {
  let left = 0;
  let right = 0;
  const result = [];

  while (right < chars.length) {
    if (chars[left] !== chars[right]) {
      result.push(chars[left]);
      const count = right - left;
      if (count > 1) {
        for (let number of count.toString()) {
          result.push(number);
        }
      }
      left = right;
    }
    right++;
  }
  const count = right - left;
  result.push(chars[left]);
  if (count > 1) {
    for (let number of count.toString()) {
      result.push(number);
    }
  }
  console.log(result);
  return result;
}
