/*

1       |   5  7
 2      |  4
   5    |      7

  axis = (maxX - minX)/2
  maxX > axis maxX = axis * 2 + minX
  maxX < axis minX = maxX - axis * 2

 */

export function isReflection(points) {
  const hash = new Map();
  let minX = Infinity,
    maxX = -Infinity;
  for (let point of points) {
    const [x, y] = point;
    minX = Math.min(minX, x);
    maxX = Math.max(maxX, x);
    if (hash.has(x)) {
      hash.set(x, [...hash.get(x), y]);
    } else {
      hash.set(x, [y]);
    }
  }
  let axis =  (maxX - minX)/2
  if(minX < 0 && maxX > 0 && maxX <= Math.abs(minX)){
    axis = -(maxX - Math.abs(minX))/2
  }

  for (let point of points) {
    const [x, y] = point;
    let pairX;
    if (x === axis) {
      pairX = axis;
    } else {
      pairX = x > axis ? x - 2 * axis : 2 * axis + x;
    }
    if (!hash.has(pairX)) {
      return false;
    }
    if (!hash.get(pairX).includes(y)) {
      return false;
    }
  }
  return true;
}
