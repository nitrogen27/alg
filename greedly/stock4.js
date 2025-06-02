function maxProfit(prices) {
    let buy1 = -Infinity;
    let profit1 = 0;
    let buy2 = -Infinity;
    let profit2 = 0;

    for (let price of prices) {
        buy1 = Math.max(buy1, -price);
        profit1 = Math.max(profit1, buy1 + price);
        buy2 = Math.max(buy2, profit1 - price);
        profit2 = Math.max(profit2, buy2 + price);
    }

    return profit2;
}
