
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
}<template>
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
