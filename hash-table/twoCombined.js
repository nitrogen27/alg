function findPairsThatSumToTarget(nums, target) {
    const pairs = [];
    const seen = new Set();

    for (const num of nums) {
        const complement = target - num;
        if (seen.has(complement)) {
            pairs.push([complement, num]);
        }
        seen.add(num);
    }

    return pairs;
}

// Пример использования:
const numbers = [2, 3, 5, 7, 5];
const targetSum = 10;
const pairs = findPairsThatSumToTarget(numbers, targetSum);

console.log("Пары чисел, сумма которых равна", targetSum, ":");
pairs.forEach(pair => console.log(pair));

