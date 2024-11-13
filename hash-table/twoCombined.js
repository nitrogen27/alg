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
function getAllUniqueTwoNumberCombinations(numbers) {
    const combinations = [];
    const seen = new Set();
    for (let i = 0; i < numbers.length; i++) {
        for (let j = i + 1; j < numbers.length; j++) {
            const pair = [numbers[i], numbers[j]].sort((a, b) => a - b);
            const key = pair.join(',');
            if (!seen.has(key)) {
                seen.add(key);
                combinations.push(pair);
            }
        }
    }
    return combinations;
}

function getAllTwoNumberCombinationsUniqueNumbers(numbers) {
    const uniqueNumbers = [...new Set(numbers)];
    const combinations = [];
    for (let i = 0; i < uniqueNumbers.length; i++) {
        for (let j = i + 1; j < uniqueNumbers.length; j++) {
            combinations.push([uniqueNumbers[i], uniqueNumbers[j]]);
        }
    }
    return combinations;
}

// Пример использования:
const numbers = [1, 2, 2, 3];
const result = getAllTwoNumberCombinationsUniqueNumbers(numbers);
console.log(result);

// Вывод:
// [
//   [1, 2],
//   [1, 3],
//   [2, 3]
// ]


// Пример использования:
const numbers = [1, 2, 2, 3];
const result = getAllUniqueTwoNumberCombinations(numbers);
console.log(result);

// Вывод:
// [
//   [1, 2],
//   [1, 3],
//   [2, 2],
//   [2, 3]
// ]


// Пример использования:
const numbers = [2, 3, 5, 7, 5];
const targetSum = 10;
const pairs = findPairsThatSumToTarget(numbers, targetSum);

console.log("Пары чисел, сумма которых равна", targetSum, ":");
pairs.forEach(pair => console.log(pair));

