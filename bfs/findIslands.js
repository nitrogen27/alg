/*
 [
 [1,0,0]
 [0,1,0]
 [1,1,0]]


 [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]

 [["1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","0","0","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","0","0","0","0","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1"]]
 Не работает если размер матрицы больше 10!
 */

export function findIsland(grid) {
  let islands = 0;
  const dispositions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  const rowSize = grid.length - 1;
  const columnSize = grid[0].length - 1;
  const visited = new Set();
  const stack = [];
  function bfs(r, c) {
    const n = `${r}${c}`;
    if(visited.has(n)){
      return;
    }
    stack.push(n);
    islands++;
    while (stack.length) {
      const position = stack.pop();
      if (!visited.has(position)) {
        visited.add(position);
        console.log(`Зашли в позицию: ${position}`);
        for (let disposition of dispositions) {
          const neighbour = [
            Number(position[0]) + Number(disposition[0]),
            Number(position[1]) + Number(disposition[1]),
          ];
          if (
            neighbour[0] <= rowSize &&
            neighbour[1] <= columnSize &&
            neighbour[0] >= 0 &&
            neighbour[1] >= 0
          ) {
            const node = `${neighbour[0]}${neighbour[1]}`;
            if (Number(grid[neighbour[0]][neighbour[1]]) === 1) {
              stack.push(node);
            }
          }
        }
      }
    }
  }
  for (let i = 0; i < rowSize + 1; i++) {
    for (let j = 0; j < columnSize + 1; j++) {
      if (Number(grid[i][j]) === 1) {
        bfs(i, j);
      }
    }
  }
  console.log(`Нашлось ${islands} остров(а)`);
  return islands;
}
/*
 [
 [1,0,0]
 [0,1,0]
 [1,1,0]]


 [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]

 */

export function findIsland(grid) {
  let islands = 0;
  const dispositions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  const rowSize = grid.length - 1;
  const columnSize = grid[0].length - 1;
  const visited = new Set();
  const stack = [];
  function bfs(r, c) {
    const n = [r,c];
    if(visited.has(`${r}${c}`)){
      return;
    }
    stack.push(n);
    islands++;
    while (stack.length) {
      const [positionR,positionC] = stack.pop();
      const positionKey = `${positionR}${positionC}`;
      if (!visited.has(positionKey)) {
        visited.add(positionKey);
        console.log(`Зашли в позицию: ${positionKey}`);
        for (let disposition of dispositions) {
          const neighbour = [
            Number(positionR) + Number(disposition[0]),
            Number(positionC) + Number(disposition[1]),
          ];
          if (
            neighbour[0] <= rowSize &&
            neighbour[1] <= columnSize &&
            neighbour[0] >= 0 &&
            neighbour[1] >= 0
          ) {
            const node = [neighbour[0], neighbour[1]];
            if (Number(grid[neighbour[0]][neighbour[1]]) === 1) {
              stack.push(node);
            }
          }
        }
      }
    }
  }
  for (let i = 0; i < rowSize + 1; i++) {
    for (let j = 0; j < columnSize + 1; j++) {
      if (Number(grid[i][j]) === 1) {
        bfs(i, j);
      }
    }
  }
  console.log(`Нашлось ${islands} остров(а)`);
  return islands;
}
export function findIsland(grid) {
  let islands = 0;
  const dispositions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  const rowSize = grid.length - 1;
  const columnSize = grid[0].length - 1;
  const visited = new Set();
  const stack = [];
  function bfs(r, c) {
    const n = [r,c];
    if(visited.has(`${r},${c}`)){
      return;
    }
    stack.push(n);
    islands++;
    while (stack.length) {
      const [positionR,positionC] = stack.pop();
      const positionKey = `${positionR},${positionC}`;
      if (!visited.has(positionKey)) {
        visited.add(positionKey);
        console.log(`Зашли в позицию: ${positionKey}`);
        for (let disposition of dispositions) {
          const neighbour = [
            Number(positionR) + Number(disposition[0]),
            Number(positionC) + Number(disposition[1]),
          ];
          if (
            neighbour[0] <= rowSize &&
            neighbour[1] <= columnSize &&
            neighbour[0] >= 0 &&
            neighbour[1] >= 0
          ) {
            const node = [neighbour[0], neighbour[1]];
            if (Number(grid[neighbour[0]][neighbour[1]]) === 1) {
              stack.push(node);
            }
          }
        }
      }
    }
  }
  for (let i = 0; i < rowSize + 1; i++) {
    for (let j = 0; j < columnSize + 1; j++) {
      if (Number(grid[i][j]) === 1) {
        bfs(i, j);
      }
    }
  }
  console.log(`Нашлось ${islands} остров(а)`);
  return islands;
}
