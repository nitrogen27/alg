
/**
 * Универсальная валидация значения по маске vue-the-mask
 * @param {string} value - Входное значение (с маской)
 * @param {string} mask - Маска в формате vue-the-mask
 * @returns {boolean} - true если значение полностью соответствует маске
 */
export function validateWithMask(value, mask) {
  // Токены маски (можно расширить при необходимости)
  const TOKENS = {
    '#': { pattern: /\d/ },
    'X': { pattern: /./ },
    'S': { pattern: /[a-zA-Z]/ },
    'A': { pattern: /[a-zA-Z0-9]/ },
    'N': { pattern: /[0-9a-zA-Z]/ },
    'Z': { pattern: /[-_]/ }
  };

  let valueIndex = 0;
  let maskIndex = 0;
  let inOptional = false;
  let optionalContent = '';

  while (maskIndex < mask.length && valueIndex < value.length) {
    const maskChar = mask[maskIndex];
    const valueChar = value[valueIndex];

    // Обработка экранирования
    if (maskChar === '\\') {
      if (maskIndex + 1 < mask.length) {
        maskIndex++;
        const nextChar = mask[maskIndex];
        if (valueChar !== nextChar) return false;
        valueIndex++;
        maskIndex++;
        continue;
      }
    }

    // Обработка необязательных блоков
    if (maskChar === '[') {
      inOptional = true;
      optionalContent = '';
      maskIndex++;
      continue;
    }

    if (maskChar === ']' && inOptional) {
      inOptional = false;
      
      // Рекурсивная проверка необязательного контента
      if (optionalContent && value.startsWith(optionalContent, valueIndex)) {
        valueIndex += optionalContent.length;
      }
      optionalContent = '';
      maskIndex++;
      continue;
    }

    // Сборка необязательного контента
    if (inOptional) {
      optionalContent += maskChar;
      maskIndex++;
      continue;
    }

    // Проверка токенов
    if (TOKENS[maskChar]) {
      if (!TOKENS[maskChar].pattern.test(valueChar)) return false;
      valueIndex++;
      maskIndex++;
      continue;
    }

    // Проверка статических символов
    if (maskChar !== valueChar) return false;
    
    valueIndex++;
    maskIndex++;
  }

  // Проверка остатка маски (должны быть только необязательные части)
  const remainingMask = mask.slice(maskIndex);
  if (remainingMask.replace(/\\[\[\]]/g, '').replace(/\[.*?\]/g, '') !== '') {
    return false;
  }

  // Проверка полного соответствия длины
  return valueIndex === value.length;
}
<template>
  <b-form-group>
    <b-form-input
      v-model="phone"
      v-mask="'+7 (###) ###-##-##'"
      :state="phoneState"
    />
    <b-form-invalid-feedback>
      Заполните поле полностью
    </b-form-invalid-feedback>
  </b-form-group>
</template>

<script>
import { validateByMaskLength } from '@/utils/maskValidation';

export default {
  data() {
    return {
      phone: ''
    };
  },
  computed: {
    phoneState() {
      if (!this.phone) return null;
      return validateByMaskLength(
        this.phone, 
        '+7 (###) ###-##-##'
      );
    }
  }
};
</script>
/**
 * Универсальная валидация для vue-the-mask с поддержкой пробелов
 * @param {string} value - Введенное значение
 * @param {string} mask - Маска в формате vue-the-mask
 * @param {boolean} [ignoreWhitespace=false] - Игнорировать пробелы при валидации
 * @returns {boolean}
 */
export function validateWithMask(value, mask, ignoreWhitespace = false) {
  // Токены маски (можно расширить)
  const TOKENS = {
    '#': { pattern: /\d/ },
    'X': { pattern: /./ },
    'S': { pattern: /[a-zA-Z]/ },
    'A': { pattern: /[a-zA-Z0-9]/ },
    'N': { pattern: /[0-9a-zA-Z]/ },
    'Z': { pattern: /[-_]/ }
  };

  // Подготовка значений
  const cleanValue = ignoreWhitespace 
    ? value.replace(/\s/g, '') 
    : value;
    
  const cleanMask = ignoreWhitespace 
    ? mask.replace(/\s/g, '') 
    : mask;

  let valueIndex = 0;
  let maskIndex = 0;
  let inOptional = false;
  let optionalContent = '';

  while (maskIndex < cleanMask.length && valueIndex < cleanValue.length) {
    const maskChar = cleanMask[maskIndex];
    const valueChar = cleanValue[valueIndex];

    // Обработка экранирования
    if (maskChar === '\\') {
      if (maskIndex + 1 < cleanMask.length) {
        maskIndex++;
        const nextChar = cleanMask[maskIndex];
        if (valueChar !== nextChar) return false;
        valueIndex++;
        maskIndex++;
        continue;
      }
    }

    // Обработка необязательных блоков
    if (maskChar === '[') {
      inOptional = true;
      optionalContent = '';
      maskIndex++;
      continue;
    }

    if (maskChar === ']' && inOptional) {
      inOptional = false;
      if (optionalContent && cleanValue.startsWith(optionalContent, valueIndex)) {
        valueIndex += optionalContent.length;
      }
      optionalContent = '';
      maskIndex++;
      continue;
    }

    // Сборка необязательного контента
    if (inOptional) {
      optionalContent += maskChar;
      maskIndex++;
      continue;
    }

    // Проверка токенов
    if (TOKENS[maskChar]) {
      if (!TOKENS[maskChar].pattern.test(valueChar)) return false;
      valueIndex++;
      maskIndex++;
      continue;
    }

    // Проверка статических символов с учетом пробелов
    if (maskChar === ' ') {
      // Пропускаем пробелы в маске
      maskIndex++;
      continue;
    }

    if (maskChar !== valueChar) {
      // Разрешаем пробелы в значении, даже если их нет в маске
      if (valueChar === ' ' && !ignoreWhitespace) {
        valueIndex++;
        continue;
      }
      return false;
    }
    
    valueIndex++;
    maskIndex++;
  }

  // Пропускаем оставшиеся пробелы в значении
  while (valueIndex < cleanValue.length && cleanValue[valueIndex] === ' ') {
    valueIndex++;
  }

  // Проверка остатка маски (должны быть только необязательные части)
  const remainingMask = cleanMask.slice(maskIndex).replace(/\[.*?\]/g, '');
  if (remainingMask.replace(/\s/g, '') !== '') {
    return false;
  }

  // Проверка полного соответствия длины
  return valueIndex === cleanValue.length;
}
/**
 * Универсальная валидация для vue-the-mask с поддержкой маски телефона
 * @param {string} value - Введенное значение
 * @param {string} mask - Маска в формате vue-the-mask
 * @param {boolean} [ignoreWhitespace=false] - Игнорировать пробелы при валидации
 * @returns {boolean}
 */
export function validateWithMask(value, mask, ignoreWhitespace = false) {
  // Токены маски (расширенные)
  const TOKENS = {
    '#': { pattern: /\d/ },
    'X': { pattern: /./ },
    'S': { pattern: /[a-zA-Z]/ },
    'A': { pattern: /[a-zA-Z0-9]/ },
    'N': { pattern: /[0-9a-zA-Z]/ },
    'Z': { pattern: /[-_]/ },
    'd': { pattern: /\d/ }  // Новый токен для цифр в статической части
  };

  // Подготовка значений
  const cleanValue = ignoreWhitespace 
    ? value.replace(/\s/g, '') 
    : value;
    
  const cleanMask = ignoreWhitespace 
    ? mask.replace(/\s/g, '') 
    : mask;

  let valueIndex = 0;
  let maskIndex = 0;
  let inOptional = false;
  let optionalContent = '';

  while (maskIndex < cleanMask.length && valueIndex < cleanValue.length) {
    const maskChar = cleanMask[maskIndex];
    const valueChar = cleanValue[valueIndex];

    // Обработка экранирования
    if (maskChar === '\\') {
      if (maskIndex + 1 < cleanMask.length) {
        maskIndex++;
        const nextChar = cleanMask[maskIndex];
        if (valueChar !== nextChar) return false;
        valueIndex++;
        maskIndex++;
        continue;
      }
    }

    // Обработка необязательных блоков
    if (maskChar === '[') {
      inOptional = true;
      optionalContent = '';
      maskIndex++;
      continue;
    }

    if (maskChar === ']' && inOptional) {
      inOptional = false;
      if (optionalContent && cleanValue.startsWith(optionalContent, valueIndex)) {
        valueIndex += optionalContent.length;
      }
      optionalContent = '';
      maskIndex++;
      continue;
    }

    // Сборка необязательного контента
    if (inOptional) {
      optionalContent += maskChar;
      maskIndex++;
      continue;
    }

    // Проверка токенов (включая цифры в статической части)
    if (TOKENS[maskChar]) {
      if (!TOKENS[maskChar].pattern.test(valueChar)) return false;
      valueIndex++;
      maskIndex++;
      continue;
    }

    // Проверка статических символов с учетом пробелов
    if (maskChar === ' ') {
      // Пропускаем пробелы в маске
      maskIndex++;
      continue;
    }

    // Специальная обработка для цифр в статической части
    if (!isNaN(maskChar) && maskChar !== ' ') {
      if (maskChar !== valueChar) {
        if (valueChar === ' ' && !ignoreWhitespace) {
          valueIndex++;
          continue;
        }
        return false;
      }
      valueIndex++;
      maskIndex++;
      continue;
    }

    if (maskChar !== valueChar) {
      // Разрешаем пробелы в значении, даже если их нет в маске
      if (valueChar === ' ' && !ignoreWhitespace) {
        valueIndex++;
        continue;
      }
      return false;
    }
    
    valueIndex++;
    maskIndex++;
  }

  // Пропускаем оставшиеся пробелы в значении
  while (valueIndex < cleanValue.length && cleanValue[valueIndex] === ' ') {
    valueIndex++;
  }

  // Проверка остатка маски (должны быть только необязательные части)
  const remainingMask = cleanMask.slice(maskIndex).replace(/\[.*?\]/g, '');
  if (remainingMask.replace(/\s/g, '') !== '') {
    return false;
  }

  // Проверка полного соответствия длины
  return valueIndex === cleanValue.length;
}
export function validateByMaskLength(value, mask, ignoreWhitespace = false) {
  const cleanValue = ignoreWhitespace 
    ? value.replace(/\s/g, '') 
    : value;
    
  const cleanMask = ignoreWhitespace 
    ? mask.replace(/\s/g, '') 
    : mask;

  // Вычисляем длину без необязательных блоков
  const baseLength = cleanMask
    .replace(/\[.*?\]/g, '')
    .replace(/\\[\[\]]/g, '')
    .replace(/\\(.)/g, '$1')
    .length;

  // Позволяем длине быть в пределах baseLength ± количество пробелов
  const minLength = baseLength;
  const maxLength = baseLength + (value.match(/\s/g)?.length || 0;
  
  return cleanValue.length >= minLength && cleanValue.length <= maxLength;
}
В библиотеке vue-the-mask (https://vuejs-tips.github.io/vue-the-mask/) маска задается с помощью специальных символов, например:

• # — цифра (0-9)

• A — буква (A-Z, a-z)

• N — буква или цифра

• и др.

Чтобы валидировать строку по маске, нужно проверить, что каждый символ значения соответствует правилу символа маски.

В самой библиотеке нет готовой функции валидации отдельно от компонента, но можно написать свою функцию на основе правил маски.

Пример функции валидации значения по маске из vue-the-mask:

function validateByMask(value, mask) {
  if (!value || !mask) return false;
  if (value.length !== mask.length) return false;

  // Правила из vue-the-mask
  const tokens = {
    '#': /d/,          // цифра
    'A': /[a-zA-Z]/,    // буква
    'N': /[a-zA-Z0-9]/, // буква или цифра
    'X': /./            // любой символ
  };

  for (let i = 0; i < mask.length; i++) {
    const maskChar = mask[i];
    const valueChar = value[i];

    if (tokens[maskChar]) {
      if (!tokens[maskChar].test(valueChar)) {
        return false;
      }
    } else {
      // если символ маски не спецсимвол, то он должен совпадать с символом значения
      if (maskChar !== valueChar) {
        return false;
      }
    }
  }

  return true;
}


Пример использования:

console.log(validateByMask('123-ABC', '###-AAA')); // true
console.log(validateByMask('12A-ABC', '###-AAA')); // false (вместо цифры буква)
console.log(validateByMask('123-AB1', '###-AAA')); // false (вместо буквы цифра)


Если у вас более сложные маски или вы используете другие спецсимволы из библиотеки, можно расширить объект tokens.

---

Если нужно — могу помочь адаптировать под ваш конкретный случай.
