 function anagram(ans) {
  const hash = new Map();
  for (let i = 0; i < ans.length; i++) {
    const an = ans[i];
    const key = Array.from(an)
      .sort((a, b) => a.localeCompare(b))
      .join("");
    if (hash.has(key) && key !== an) {
      hash.set(key, [...hash.get(key), an]);
    } else {
      hash.set(key, [an]);
    }
  }
  return Array.from(hash.values());
}
