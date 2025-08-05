Promise.sequenceAllSettled = async (promiseFactories) => {
  const results = [];
  for (const factory of promiseFactories) {
    try {
      const value = await factory();
      results.push({ status: 'fulfilled', value });
    } catch (reason) {
      results.push({ status: 'rejected', reason });
    }
  }
  return results;
};
// Фабрики запросов (промисы НЕ запускаются при создании массива!)
const requests = [
  () => fetch('https://api.example.com/data1'),
  () => fetch('https://api.example.com/data2'),
  () => fetch('https://api.example.com/data3'),
];

// Запуск последовательно
Promise.sequenceAllSettled(requests)
  .then(results => {
    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        console.log(`Запрос ${index}: Успех`, result.value);
      } else {
        console.error(`Запрос ${index}: Ошибка`, result.reason);
      }
    });
  });
