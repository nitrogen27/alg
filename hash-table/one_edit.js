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
