Вот эквивалентная функция на JavaScript, которая возвращает правильное слово для количества лет:

function yearsWord(n) {
  if (n % 10 === 1 && n % 100 !== 11) return 'год';
  if (n % 10 >= 2 && n % 10 <= 4 && !(n % 100 >= 12 && n % 100 <= 14)) return 'года';
  return 'лет';
}

// Пример использования:
for (let i = 1; i <= 24; i++) {
  console.log(i, yearsWord(i));
}


Если нужно очень коротко в одну строку:

const yearsWord = n => (n % 10 === 1 && n % 100 !== 11) ? 'год' : (n % 10 >= 2 && n % 10 <= 4 && !(n % 100 >= 12 && n % 100 <= 14)) ? 'года' : 'лет';


Могу помочь с любыми другими {{ (() => { const d = new Date('2000-06-15'), n = new Date(), y = n.getFullYear() - d.getFullYear(); return (n.getMonth() > d.getMonth() || (n.getMonth() === d.getMonth() && n.getDate() >= d.getDate())) ? y : y - 1 })() }}


Или чуть короче, если дата в переменной date:

{{ (() => { const d = new Date(date), n = new Date(), y = n.getFullYear() - d.getFullYear(); return (n.getMonth() > d.getMonth() || (n.getMonth() === d.getMonth() && n.getDate() >= d.getDate())) ? y : y - 1 })() }}


Это выражение можно использовать прямо в шаблоне Vue.
