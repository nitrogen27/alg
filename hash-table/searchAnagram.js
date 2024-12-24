export function searchAnagram(str, target) {
  const hashStr = new Map();
  const link = new Map();
  const sizeTarget = target.length;
  const result = [];

  for (let i = 0; i < str.length; i++) {
    if (hashStr.has(str[i])) {
      hashStr.set(str[i], [...hashStr.get(str[i]), i]);
    } else {
      hashStr.set(str[i], [i]);
    }
  }

  for (let i = 0; i < target.length; i++) {
    if (hashStr.has(target[i])) {
      hashStr.get(target[i]).forEach((n) => link.set(n, i));
    }
  }

  const flatPrepare = Array.from(link.keys())
    .flat()
    .sort((a, b) => a - b);

  for (let i = 0; i < flatPrepare.length; i++) {
    let start = i;
    const part = [flatPrepare[i]];
    const partHash = new Set();
    partHash.add(link.get(flatPrepare[i]));
    while (
      flatPrepare[start] + 1 === flatPrepare[start + 1] &&
      part.length < sizeTarget &&
      !partHash.has(link.get(flatPrepare[start + 1]))
    ) {
      partHash.add(link.get(flatPrepare[start + 1]));
      part.push(flatPrepare[start + 1]);
      start++;
    }
    if (part.length === sizeTarget) result.push(part[0]);
  }
  console.log(result);
  return result;
}
/*
flatPrepare [ 0, 1, 2, 3, 4 ]
hashStr [ [ 'a', [ 0, 1, 3 ] ], [ 'b', [ 2, 4 ] ] ]
link [
  [ 0, [ 0 ] ],
  [ 1, [ 0 ] ],
  [ 3, [ 0 ] ],
  [ 2, [ 1 ] ],
  [ 4, [ 1 ] ]
]
[ [ 1, 2 ], [ 2, 3 ], [ 3, 4 ] ]
  expect(searchAnagram("aabab", "ab")).exist;
*/
export function searchAnagram(str, target) {
  const hashStr = new Map();
  const link = new Map();
  const sizeTarget = target.length;
  const result = [];

  for (let i = 0; i < str.length; i++) {
    if (hashStr.has(str[i])) {
      hashStr.set(str[i], [...hashStr.get(str[i]), i]);
    } else {
      hashStr.set(str[i], [i]);
    }
  }

  for (let i = 0; i < target.length; i++) {
    if (hashStr.has(target[i])) {
      hashStr.get(target[i]).forEach((n) => {
        if (link.get(n)) {
          link.set(n, [...link.get(n), i]);
        } else {
          link.set(n, [i]);
        }
      });
    }
  }

  const flatPrepare = Array.from(link.keys())
    .flat()
    .sort((a, b) => a - b);

  for (let i = 0; i < flatPrepare.length; i++) {
    let start = i;
    const part = [flatPrepare[i]];
    const partHash = new Set();
    partHash.add(link.get(flatPrepare[i])[0]);
    while (
      flatPrepare[start] + 1 === flatPrepare[start + 1] &&
      part.length < sizeTarget &&
      !partHash.has(link.get(flatPrepare[start + 1])[0])
      ) {
      partHash.add(link.get(flatPrepare[start + 1])[0]);
      part.push(flatPrepare[start + 1]);
      start++;
    }
    console.log("partHash1",Array.from(partHash))
    if (part.length === sizeTarget) result.push(part);
  }
  console.log("flatPrepare", flatPrepare);
  console.log("hashStr", Array.from(hashStr));
  console.log("link", Array.from(link));
  console.log(result);
  return result;
}
