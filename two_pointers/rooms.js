/*

[[9,10],[4,9],[4,17]]

[[4,9],[4,17],[9,10]]

1. 4 < 9 min [9, 17] room = 1
2  9 < 17  min [10, 17] room =2


1. 4 < 9 room = 1
2. 9 < 10 room = 2

[[13,15],[1,13]]

[[1,13],[13,15]]

left [1, 13] right [13,15]



1. 13 < 13 min [13,15] room = 2



[[2,11],[6,16],[11,16]]

[[2,11],[6,16],[11,16]]

1. 6 < 11 min [11, 16] room 2
2. 11 < 11 min [11,16]


[[0,30],[5,10],[15,20]]

[[5,8],[6,8]]

 */

export function getMinMeetingRooms(intervals) {
  let rooms = 0;

  const sortedIntervals = intervals.sort((a, b) => a[1] - b[1]);
  const ends = new Set();
  let start = 0;
  let end = 1;

  ends.add(sortedIntervals[start][1]);

  while (end < sortedIntervals.length) {
    ends.add(sortedIntervals[end][1]);
    const startValue = sortedIntervals[start][0];
    let min = Math.min(...ends);
    if(startValue >= min){
      ends.delete(min);
      min = Math.min(...ends);
    }
    if (startValue < min) {
      rooms++;
    }
    start++;
    end++;
  }
  console.log(rooms);
  return rooms || 1;
}
