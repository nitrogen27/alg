/*
[[1,20],[26,29][5,9],[4,5],[25,30]]


1,4,5,25

[[1,20],[4,5],[5,9],[25,30],[26,29]] 4 - rooms


left = 0 right = 0

right < 4

1. [1,20] [4,5] left = 0; right = 1 rooms = 2
2. [1,20] [5,9] left = 0; right = 2 rooms = 3
3. [1,20] [25,30] left =0; right = 3 rooms = 3
4. [25,30] [26,29] left =3; right = 4 rooms = 4

[[0,30],[5,10],[15,20]]
4       10
 5  8

 */

export function getMinMeetingRooms(intervals) {

  let rooms = 1;
  let left = 0;
  let right = 1;

  const sortedIntervals = intervals.sort((a, b) => a[0] - b[0]);

  while (right < sortedIntervals.length) {
    if (
      Math.max(sortedIntervals[left][0], sortedIntervals[right][0]) <=
      Math.min(sortedIntervals[left][1], sortedIntervals[right][1])
    ) {
      rooms++
    }
    else{
      left = right;
    }
    right++;
  }
  console.log(rooms);
  return rooms;
}
