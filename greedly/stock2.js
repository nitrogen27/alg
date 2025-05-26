
/*

7 1 5 3 6 4

1.  Infinity > 7 min = 7 max = 7 profit = 7 - 7 = 0
2.  7 > 1 min = 1 max = 1  profit = 1 - 1 = 0
3.  5 > 1 min = 1 max = 5  profit = 5 - 1 = 4
4.  5 > 3 min = 3 max = 3 profit = 3 - 3 = 0
5   6 > 3 min = 3 max = 6 profit = 6 - 3 = 3
6   min = 4 max = 4 4 - 4 = 0

1. 1 < 7  profit = 0
2. 5 > 1  5 - 1 = 4  profit = 0 + 4 = 4
3. 3 < 5  profit = 4
4. 6 > 3  6 - 3 = 3  profit = 3 + 4 = 7
5. 4 < 6  profit = 7

 */

export function stock2(prices) {
  let profit = 0;

  for (let i = 1; i < prices.length; i++) {
    if(prices[i] > prices[i - 1]){
      profit+= prices[i] - prices[i - 1];
    }
  }
  console.log(profit);
  return profit;
}
