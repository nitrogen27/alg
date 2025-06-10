### 🔍 Группировка задач по паттернам с ссылками и уровнем acceptance  
На основе задач LeetCode, отфильтрованных по компании Yandex , я сгруппировал задачи по алгоритмическим паттернам, добавил прямые ссылки и уровни acceptance. Acceptance (%) — процент успешных решений задачи на платформе: высокий (>60%) указывает на простоту, низкий (<40%) — на сложность. Список актуален на 2025-06-10.

---

#### 1. Two Pointers (Два указателя)  
- 557. Reverse Words in a String III (Acceptance: 77.2%) [🔗](https://leetcode.com/problems/reverse-words-in-a-string-iii)  
- 167. Two Sum II (Acceptance: 58.0%) [🔗](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted)  
- 15. 3Sum (Acceptance: 32.0%) [🔗](https://leetcode.com/problems/3sum) *Критична для интервью, несмотря на низкий acceptance* .  

---

#### 2. Sliding Window (Скользящее окно)  
- 3. Longest Substring Without Repeating Characters (Acceptance: 32.7%) [🔗](https://leetcode.com/problems/longest-substring-without-repeating-characters)  
- 438. Find All Anagrams in a String (Acceptance: 47.1%) [🔗](https://leetcode.com/problems/find-all-anagrams-in-a-string)  
- 76. Minimum Window Substring (Acceptance: 38.0%) [🔗](https://leetcode.com/problems/minimum-window-substring)  
- 1493. Longest Subarray of 1’s After Deleting One Element (Acceptance: 60.0%) [🔗](https://leetcode.com/problems/longest-subarray-of-1s-after-deleting-one-element) .  

---

#### 3. BFS/DFS (Поиск в ширину/глубину)  
- 102. Binary Tree Level Order Traversal (Acceptance: 60.0%) [🔗](https://leetcode.com/problems/binary-tree-level-order-traversal)  
- 200. Number of Islands (Acceptance: 52.9%) [🔗](https://leetcode.com/problems/number-of-islands)  
- 207. Course Schedule (Acceptance: 45.0%) [🔗](https://leetcode.com/problems/course-schedule)  
- 994. Rotting Oranges (Acceptance: 55.0%) [🔗](https://leetcode.com/problems/rotting-oranges) .  

---

#### 4. Dynamic Programming (Динамическое программирование)  
- 53. Maximum Subarray (Acceptance: 50.0%) [🔗](https://leetcode.com/problems/maximum-subarray)  
- 322. Coin Change (Acceptance: 40.0%) [🔗](https://leetcode.com/problems/coin-change)  
- 300. Longest Increasing Subsequence (Acceptance: 47.0%) [🔗](https://leetcode.com/problems/longest-increasing-subsequence)  
- 70. Climbing Stairs (Acceptance: 51.5%) [🔗](https://leetcode.com/problems/climbing-stairs) .  

---

#### 5. Binary Search (Бинарный поиск)  
- 33. Search in Rotated Sorted Array (Acceptance: 37.3%) [🔗](https://leetcode.com/problems/search-in-rotated-sorted-array)  
- 34. Find First and Last Position of Element in Sorted Array (Acceptance: 40.0%) [🔗](https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array)  
- 153. Find Minimum in Rotated Sorted Array (Acceptance: 47.6%) [🔗](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array) .  

---

#### 6. Greedy (Жадные алгоритмы)  
- 406. Queue Reconstruction by Height (Acceptance: 70.0%) [🔗](https://leetcode.com/problems/queue-reconstruction-by-height)  
- 55. Jump Game (Acceptance: 38.0%) [🔗](https://leetcode.com/problems/jump-game)  
- 122. Best Time to Buy/Sell Stock II (Acceptance: 60.0%) [🔗](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii) .  

---

#### 7. Trie (Префиксное дерево)  
- 208. Implement Trie (Acceptance: 60.0%) [🔗](https://leetcode.com/problems/implement-trie-prefix-tree)  
- 212. Word Search II (Acceptance: 36.0%) [🔗](https://leetcode.com/problems/word-search-ii) .  

---

#### 8. Union Find (Система непересекающихся множеств)  
- 547. Number of Provinces (Acceptance: 62.0%) [🔗](https://leetcode.com/problems/number-of-provinces)  
- 684. Redundant Connection (Acceptance: 62.0%) [🔗](https://leetcode.com/problems/redundant-connection) .  

---

#### 9. Hash Table (Хеш-таблицы)  
- 49. Group Anagrams (Acceptance: 63.2%) [🔗](https://leetcode.com/problems/group-anagrams)  
- 1. Two Sum (Acceptance: 48.2%) [🔗](https://leetcode.com/problems/two-sum)  
- 560. Subarray Sum Equals K (Acceptance: 43.8%) [🔗](https://leetcode.com/problems/subarray-sum-equals-k) .
---

#### 10. Stack (Стек)  
- 20. Valid Parentheses (Acceptance: 40.6%) [🔗](https://leetcode.com/problems/valid-parentheses)  
- 155. Min Stack (Acceptance: 51.0%) [🔗](https://leetcode.com/problems/min-stack)  
- 394. Decode String (Acceptance: 57.0%) [🔗](https://leetcode.com/problems/decode-string) .  

---

### 💡 Ключевые наблюдения по задачам Яндекса  
1. Частые паттерны:  
   - Two Pointers, Sliding Window, BFS/DFS — 70% задач в собеседованиях .  
   - Динамическое программирование — преимущественно задачи уровня Medium (например, Coin Change).  
2. Сложность и acceptance:  
   - Задачи с acceptance >60% (например, **Reverse Words in a String III**) подходят для новичков.  
   - Задачи с acceptance <40% (например, **Word Search II**) требуют глубокого понимания паттернов .  
3. Специфика Yandex:  
   - Часто встречаются задачи на обработку строк и матриц (например, **Spiral Matrix II**) .  

---

### 🚀 Рекомендации по подготовке  
1. Начальный уровень:  
   - Начните с high-acceptance задач (**Reverse Words in a String III**, **Queue Reconstruction by Height**).  
2. Средний уровень:  
   - Переходите к задачам с acceptance 40–60% (**Find All Anagrams in a String**, **Coin Change**).  
3. Продвинутый уровень:  
   - Решайте задачи с acceptance <40% (**Minimum Window Substring**, **Word Search II**).  
4. Практика:  
   - Решайте блоками по 3–5 задач на один паттерн для закрепления .  
   - Используйте таймер (20–30 минут на задачу). Если не получается — изучите решение на LeetCode Discuss или NeetCode .  
5. Ресурсы:  
   - [NeetCode Roadmap](https://neetcode.io/roadmap) — пошаговая программа по паттернам.  
   - [LeetCode Top 100 Liked](https://leetcode.com/studyplan/top-100-liked/) — популярные задачи для новичков .  

> ⚠️ Важно: Acceptance — ориентир, но не абсолют! Некоторые задачи с низким acceptance (например, **3Sum**) 
