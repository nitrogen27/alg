/**
 * @param {string[]} words
 * @param {number} k
 * @return {string[]}
 */
var topKFrequent = function(words, k) {
     let hash = {};
    for (let word of words) {
        hash[word] = hash[word]+1||1;
    }
    let result = Object.keys(hash).sort((a,b)=>{
            let countCompare = hash[b] - hash[a];
            if (countCompare == 0) return a.localeCompare(b);
            else return countCompare;
        }   
    );
    return result.slice(0, k);
};
export function words(ws, k) {
  const fr = new Map();
  for (let w of ws) {
    fr.set(w, fr.has(w) ? fr.get(w) + 1 : 1);
  }
  const sortedWordsByFr = Array.from(fr).sort((a, b) => {
    if (a[1] !== b[1]) {
      return b[1] - a[1];
    }
    return a[0].localeCompare(b[0]);
  });

  const result = sortedWordsByFr.slice(0, k).map((r) => r[0]);

  console.log(result);

  return result;
}
