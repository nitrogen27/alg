import { List } from "./helpers.js";
function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

export function sumArray(array1, array2) {
  const list1 = new List();
  const list2 = new List();

  const resultList = new List();

  const l1 = list1.addNodesFromArray(array1);
  const l2 = list2.addNodesFromArray(array2);

  const l = new ListNode();

  let cur1 = l1;
  let cur2 = l2;
  let cur3 = l;

  let ost = 0;

  while (cur1 || cur2) {
    let value = ost;

    if (cur1 && !cur2) {
      value = cur1.val + ost;
      cur1 = cur1.next;
    }

    if (!cur1 && cur2) {
      value = cur2.val + ost;
      cur2 = cur2.next;
    }
    if (cur1 && cur2) {
      value = cur1.val + cur2.val + value;
      cur1 = cur1.next;
      cur2 = cur2.next;
    }

    ost = 0;
    if (value >= 10) {
      value = value % 10;
      ost = 1;
    }

    cur3.val = value;

    cur3.next = cur1 ?? cur2;
    if (!cur3.next && ost) {
      cur3.next = new ListNode(ost);
    }
    cur3 = cur3.next;
  }
  resultList.addNodes(l);
  const ready = resultList.getArrayFromList();
  console.log("ready", array1.reverse(), array2.reverse(), ready.reverse().join(" "));
  return ready;
}

