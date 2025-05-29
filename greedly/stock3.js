/*
1 3 2 8 4 9

profit = 0 fee = 2

min = 1

1. 3 > 1 3 - 1 - 2 = 0
2. 2 < 3
3. 8 > 2 8 - 2 - 2 = 4  8 - 1 - 2 = 5 5 > 4 profit = 5
4. 4 < 8
5. 9 > 4 8 - 1 - 2 = 5 9 - 4 - 2 = 3 9 - 1 - 2 = 6 8 > 6  profit = 5 + 3 = 8

min = 1
1. 3 > 1  profit = 3 - 1 - 2 = 0
2. 2 < 3 3 - 2 = 1 1 < 2  min = 1
3. 8 > 2  profit = 8 - 1 - 2 = 5
4. 4 < 8  8 - 4 = 4 4 > 2 min = 4
5. 9 > 4 profit = 5 + 9 - 4 - 2 = 8

start = 0 fee = 2

1 3 2 8 4 9

1. 3 > 1 3 - 1 = 2 1 - 1 = 0 0 < 2 start = 1; profit = 2
2. 2 < 3 start = 1;
3. 8 > 2 8 - 3 = 5 3 - 2 = 1 1 < 2 start = 3 profit = 2 + 5 = 7
4. 4 < 8 start = 3
5. 9 > 4  8 - 4 = 4 4 > 2  start = 5  profit = 7 + 9 - 4 - 2 = 10

10 - 2 = 8

fee = 1

1. 2 > 1 2 - 1 = 1

1 - 1 = 0
[4,5,2,4,3,3,1,2,5,4]
 */

export function stock3(prices, fee) {
  let start = 0;
  let profit = 0;
  for (let i = 1; i < prices.length; i++) {
    if (prices[i] > prices[i - 1]) {
      if (prices[start] - prices[i - 1] > fee) {
        const add = prices[i] - prices[i - 1] - fee
        if(add > 0){
          profit += add;
          start = i;
        }
      } else {
        const add = prices[i] - prices[start];
        if(add > 0){
          profit += prices[i] - prices[start];
          start = i;
        }
      }
    }
    else{
      if(start === 0){
        start = i;
      }
    }
  }
  if(fee < profit){
    profit-= fee;
    console.log(profit)
    return profit;
  }
  console.log(0);
  return 0;
}
