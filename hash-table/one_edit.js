/*
"ABC" "ABMC" true  add

"ABC" "ABBC" true  add

"ABC"  "AB" true   delete

"ABC"  "ABM" true  change

"" "" false

"" "A" true

"A" "" true

"ABC" "ABC" false

"ABC" "MVC" false

"ABC" "ABBB" false

"ABC" "MV" false

"ABC" "MA" false

"ABBC" "ABC" true  add


"ABC" "AB"

1. A A 1
2 B B 0
s =
"teacher"
t =
"detacher"
 */

export function one_edit(s, t) {
  let sCount = s.length;
  let tCount = t.length;

  if (Math.abs(t.length - s.length) > 1) {
   return false;
  }

  const fr = new Map();

  for (let char of t) {
    if (fr.has(char)) {
      fr.set(char, fr.get(char) + 1);
    } else {
      fr.set(char, 1);
    }
  }
  for (let char of s) {
    if (fr.has(char) && fr.get(char) !== 0) {
      fr.set(char, fr.get(char) - 1);
      tCount--;
    }
  }
  if (t.length - sCount === 1 && tCount === 1) {
    return true;
  }
  if (sCount - t.length === 1 && tCount === 0) {
    return true;
  }
  return sCount - t.length === 0 && tCount === 1;
}
/*
"ABC" "ABMC" true  add

"ABC" "ABBC" true  add

"ABC"  "AB" true   delete

"ABC"  "ABM" true  change

"ABC" "ABMC

left right

1. A === A left = 0 right = 0
2. B === B left = 1 right = 1
3. C !== M left = 2 right = 2 count = 1

3. C !== M left = 2 right = 2 count = 1



"ABMC" "ABC"

1. A === A left = 0 right = 0
2. B === B left = 1 right = 1
3. M !== C left = 2 right = 2 count = 1
4. C === C left = 3 right = 2

"ABC"  "ABM"

1. A === A left = 0 right = 0
2. B === B left = 1 right = 1
3. M !== C left = 3 right = 3 count = 1

"ABCD" "DCB"
1. A !== D left = 0 right = 0 count = 1
2. B !== C left = 1 right = 1 count = 2

"MABC"   "ABC"

1. M !== A left = 0 right = 0 count = 1
2. A === A left = 1 right = 0
3. B === B left = 2 right = 1
4. C === B left = 3 right = 2


"AB"   "AB"

1. A === A left = 0 right = 0 count = 1
2. A === A left = 1 right = 0
3. B === B left = 2 right = 1
4. C === B left = 3 right = 2

"AB"   "ABC"

1. A === A left = 0 right = 0
2. B === B left = 1 right = 1

"ABC"   "ABM"

1. A === A left = 0 right = 0
2. B === B left = 1 right = 1
2. C !== M left = 2 right = 2 count = 1

right не двигаем если нет совпадения
 */

export function one_edit(s, t) {
  let left = 0;
  let right = 0;
  let count = 0;

  while (left < s.length) {
    if (s[left] !== t[right]) {
      count++;
    } else {
      right++;
    }
    left++;
    if (count > 1) {
      return false;
    }
  }
  if (t.length > s.length && t[right]) {
   count++;
  }
  console.log(left, right, count)
  return count === 1;
}
