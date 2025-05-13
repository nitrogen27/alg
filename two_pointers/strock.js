/*
[10,2,4,1]

min = 0 max = 1 max =  Max(max - min)


1. 2 < 10  min = 2  4 > 2 max = 4 max = 4 - 2 = 2
2. 4 > 2  min  = 2  1 < 4 max = 4 max = 4 - 2 = 2


[100, 2]

min = 2
max  = 2
0

[2, 100]

1. 2 < 100  min = 2  max = 100

[7,1,5,3,6,4]

1. 7 > 1 min = 1 max = 5  5 - 1 = 4
2. 5 > 1 min = 1  5 > 3 max = 5 5 - 1 =4
3. 5 > 3

[7,6,4,3,1]

1. 6 < 7  4 < 6

 */

export function stock(prices) {
  let min = 0,
    max = 1;
  let minValue = prices[min];
  let profit = 0;
  while (max < prices.length) {
    const newMinValue = Math.min(prices[min], prices[min + 1] || prices[min]);
    minValue = Math.min(minValue, newMinValue);

    const newMaxValue = Math.max(prices[max], prices[max + 1] || prices[max]);

    profit = Math.max(profit, newMaxValue - minValue);
    min++;
    max++;
  }
  console.log(profit);
  return profit;
}
