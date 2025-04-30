/*
  s      t
[A,C] [A,B,C] insert
[A,B] [A,B,C]
[A,B] [C,A,B]

[A,B,C] [A,C] delete
[A,B,C] [A,B]
[C,A,B] [A,B]

[A,M,B] [A,B,C] update


[A,C] [A,B,C] insert

0 A === A left = 0 right = 0
1 C !== B left 1 right 1 count 1

C === C left =1 right = 2

[A,C] [A,B,C]

0 A === A left = 0 right = 0
1 C !== B left 1 right 1 count 1

[A,C] [A,C,B]

0 A === A left = 0 right = 0
1 C === C left 1 right 1

[A,C] [A,B,A]

0 A === A left = 0 right = 0
1 C !== B left 1 right 1 count 1

C !== A left = 1  right = 2 count =2


[A,B,C] [A,C]  insert

0 A === A left = 0 right = 0
1 B !== C left 1 right 1 count 1
3 C === C left = 2 right = 1

[C,A,B] [A,B]

0 C !== A left = 0 right = 0 count 1
1 A === A left 1 right 0
3 B === B left = 2 right = 1


[A,B,C]  [A,B,M,A]

0 A === A left = 0 right = 0
1 B === B left 1 right 1
3 C !== M left = 2 right = 2 count = 1

C !== A left = 2 right = 3

teacher detacher

0 t === d left = 0 right = 0 count = 1
1 t !== e left 0 right 1 count = 2

teacher teachy

5 e !== y left = 5 right = 5 count = 1
6 r !== y left = 6 right = 5 count = 2

 */

export function one_edit(s, t) {
  if (Math.abs(s.length - t.length) > 1) {
    return false;
  }
  let left = 0,
    right = 0,
    count = 0;

  while (left < s.length) {
    if (s[left] !== t[right]) {
      count++;
      if(count > 1){
        return false;
      }
      if (s.length < t.length) {
        right++;
        if(left + 1 === s.length){
          break
        }
      }
      if (s.length > t.length) {
        left++;
      }
      if (s.length === t.length) {
        left++;
        right++;
      }
    } else {
      left++;
      right++;
    }
  }
  if (s.length < t.length && s[left] !== t[right]) {
    count++;
  }
  return count === 1;
}
