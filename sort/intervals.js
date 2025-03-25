var merge = function (intervals) {
    intervals.sort((a, b) => a[0] - b[0]);
    let merged = [];
    for (let interval of intervals) {
        // if the list of merged intervals is empty or if the current
        // interval does not overlap with the previous, simply append it.
        if (merged.length === 0 || merged[merged.length - 1][1] < interval[0]) {
            merged.push(interval);
        }
        // otherwise, there is overlap, so we merge the current and previous
        // intervals.
        else {
            merged[merged.length - 1][1] = Math.max(
                merged[merged.length - 1][1],
                interval[1],
            );
        }
    }
    return merged;
};
export function interval(a) {
  const sortedIntervals = a.sort((a, b) => a[0] - b[0]);
  const merged = [sortedIntervals.shift()];

  for (let interval of sortedIntervals) {
    if (merged[merged.length - 1][1] >= interval[1]) {
      const end = merged.pop();
      merged.push([end[0], interval[1]]);
    } else {
      merged.push(interval);
    }
  }
  console.log(merged)
  return merged
}
/*
[1,4],[2,5], [7,10],[10,15],[18,20]
[1,5],[7,15],[18,20]

[1,5][2,3]


 */
export function interval(a) {
  const sortedIntervals = a.sort((a, b) => a[0] - b[0]);
  const merged = [sortedIntervals.shift()];

  for (let interval of sortedIntervals) {
    if (merged[merged.length - 1][1] >= interval[0]) {
      if (merged[merged.length - 1][1] < interval[0]) {
        const end = merged.pop();
        merged.push([end[0], interval[1]]);
      }
    } else {
      merged.push(interval);
    }
  }
  console.log(merged);
  return merged;
}
