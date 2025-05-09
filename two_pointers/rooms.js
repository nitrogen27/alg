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

Алгоритм

Сортировать указанные встречи по их start time.
Инициализируем новый min-heapи добавляем время окончания первой встречи в кучу. Нам просто нужно отслеживать время окончания, так как это говорит нам, когда освободится комната для совещаний.
Для каждой комнаты для совещаний проверьте, свободен ли минимальный элемент кучи, т.е. комната наверху кучи.
Если комната свободна, то мы извлекаем самый верхний элемент и добавляем его обратно со временем окончания текущей встречи, которую мы обрабатываем.
Если нет, то мы выделяем новую комнату и добавляем ее в кучу.
После обработки всех встреч размер кучи скажет нам количество выделенных комнат. Это будет минимальное количество комнат, необходимое для размещения всех встреч.

 */

export function getMinMeetingRooms(intervals) {
   let rooms = 0;
    const sortedIntervals = intervals.sort((a, b) => a[0] - b[0]);
    const ends = [];
    let start = 0;
    let end = 0;

    while (end < sortedIntervals.length) {
        ends.push(sortedIntervals[end][1]);
        const startValue = sortedIntervals[start][0];
        let min = Math.min(...ends);
        if (startValue >= min) {
            ends.splice(ends.indexOf(min), 1);
        }
        if (startValue < min) {
            rooms++;
        }
        start++;
        end++;
    }
    return rooms;
}
/**
 * @param {number[][]} intervals
 * @return {number}
 */
var minMeetingRooms = function(intervals) {
    let start = intervals.map((interval) => interval[0]).sort((a,b) => a-b);
    let end = intervals.map((interval) => interval[1]).sort((a,b) => a-b);

    let meetingRooms = 0;
    let count = 0;
    let s = 0, e = 0;

    while(s < intervals.length) {
        if(start[s] < end[e]) {
            s++;
            count++;
        }
        else {
            e++;
            count--;
        }
        meetingRooms = Math.max(meetingRooms, count);
    }
    return meetingRooms;
};
