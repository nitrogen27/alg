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
/*

["C","A","A","A","B] ["C","A","3","B","B"]

1 right + 1 !== right === "A" left = 0; right = 0 count = 0
2 right + 1 === right === "A" left = 1; right = 1 count = 0
3 right + 1 === right === "A" left = 1; right = 2 count = 1
4 right + 1 !== right !== "B" left = 1; right = 3 count = 2
5 right + 1 !== right !== undefined left = 2; right = 4 count = 0

left 3 right 4

 */

export function compress_in_place(chars) {
  let left = 0;
  let right = 0;
  let count = 0;

  while (right < chars.length) {
    right++;
    if (right === right + 1) {
      count++;
    } else {
      left++;
      if (count > 1) {
        for (let number of (count + 1).toString()) {
          chars[left] = number;
          left++;
        }
      }
      count = 0;
    }
  }
  console.log(chars.slice(0, left));
  return chars.slice(0, left);
}
/**
 * @param {character[]} chars
 * @return {number}
 */
var compress = function(chars) {
    let n = chars.length;
    let idx = 0;
    for (let i = 0; i < n; i++) {
        let ch = chars[i];
        let count = 0;
        while (i < n && chars[i] === ch) {
            count++;
            i++;
        }
        if (count === 1) {
            chars[idx++] = ch;
        } else {
            chars[idx++] = ch;
            for (let digit of count.toString()) {
                chars[idx++] = digit;
            }
        }
        i--;
    }
    chars.length = idx;
    return idx;
};
/*

["C","A","A","A","B","B"] ["C","A","3","B","B"]

1 right + 1 !== right === "A" left = 0; right = 0 count = 0
2 right + 1 === right === "A" left = 1; right = 1 count = 0
3 right + 1 === right === "A" left = 1; right = 2 count = 1
4 right + 1 !== right !== "B" left = 3; right = 3 count = 2  ["C", "A","3","B","B","B"]
5 right + 1 === right === "B" left = 3; right = 4 count = 0
5 right + 1 === right !=== empty left = 3; right = 4 count = 1

left 3 right 4

 */

export function compress_in_place(chars) {
  let left = 0;
  let right = 0;
  let count = 0;

  while (right < chars.length) {
    if (chars[right] === chars[right + 1]) {
      count++;
    } else {
      left++;
      if (count >= 1) {
        for (let number of (count + 1).toString()) {
          chars[left] = number;
          left++;
          chars[left] = chars[right + 1];
        }
      }
      count = 0;
    }
    right++;
  }
  chars.length = left;
  console.log(chars, left);
  return left;
}
