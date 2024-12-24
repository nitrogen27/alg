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
