/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 
 Объяснение:

• Сортировка: Массив nums сортируется для упрощения процесса пропуска дубликатов и эффективного использования техники двух указателей.

• Первые два цикла (i и j): Мы итерируемся по отсортированному массиву с помощью двух вложенных циклов для первых двух чисел из четверки. Пропускаем дубликаты, чтобы обеспечить уникальность четверок.

• Техника двух указателей (left и right): Для третьего и четвертого чисел используем подход с двумя указателями, начиная с концов подмассива после второго индекса j.

• Вычисление суммы: Рассчитываем сумму четырех чисел. Если она равна target, добавляем четверку в результирующий список.

• Пропуск дубликатов: После нахождения корректной четверки, перемещаем указатели left и right, пропуская повторяющиеся значения, чтобы избежать дублирования четверок.

• Регулировка указателей: Если сумма меньше target, перемещаем указатель left вправо для увеличения суммы. Если больше target, перемещаем указатель right влево для уменьшения суммы.
 */
function fourSum(nums, target) {
    const quadruplets = [];
    if (nums.length < 4) return quadruplets;

    // Сортируем массив для упрощения избежания дубликатов
    nums.sort((a, b) => a - b);

    const n = nums.length;

    // Первым указателем итерируемся по массиву
    for (let i = 0; i < n - 3; i++) {
        // Пропускаем дубликаты для первого числа
        if (i > 0 && nums[i] === nums[i - 1]) continue;

        // Вторым указателем итерируемся по массиву
        for (let j = i + 1; j < n - 2; j++) {
            // Пропускаем дубликаты для второго числа
            if (j > i + 1 && nums[j] === nums[j - 1]) continue;

            // Используем два указателя для третьего и четвертого чисел
            let left = j + 1;
            let right = n - 1;

            while (left < right) {
                const total = nums[i] + nums[j] + nums[left] + nums[right];

                if (total === target) {
                    quadruplets.push([nums[i], nums[j], nums[left], nums[right]]);

                    // Пропускаем дубликаты для третьего числа
                    while (left < right && nums[left] === nums[left + 1]) left++;
                    // Пропускаем дубликаты для четвертого числа
                    while (left < right && nums[right] === nums[right - 1]) right--;

                    left++;
                    right--;
                } else if (total < target) {
                    left++;
                } else {
                    right--;
                }
            }
        }
    }

    return quadruplets;
}
var fourSum = function(nums, target) {
    nums.sort((a, b) => a - b);
    const result = []
    
    for(let i = 0; i < nums.length - 3; i++) {
        for(let j = i + 1; j < nums.length - 2; j++) {
            let low = j + 1;
            let high = nums.length - 1

            while(low < high) {
                const sum = nums[i] + nums[j] + nums[low] + nums[high];
                if(sum === target) {
                    result.push([nums[i], nums[j], nums[low], nums[high]])
                    while(nums[low] === nums[low + 1]) low++;
                    while(nums[high] === nums[high - 1]) high--;
                    low++;
                    high--;
                } else if(sum < target) {
                    low++
                } else {
                    high--
                }
            }   
            while(nums[j] === nums[j + 1]) j++;
        }   
        while(nums[i] === nums[i + 1]) i++;
    }
    return result
};
