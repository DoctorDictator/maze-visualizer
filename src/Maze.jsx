import "./App.css";
import { useRef, useState, useEffect } from "react";

export default function Maze({ width = 101, height = 101 }) {
  const [maze, setMaze] = useState([]);
  const [timeoutIds, setTimeoutIds] = useState([]);
  const visitCounter = useRef(0);

  useEffect(() => {
    generateMaze(width, height);
  }, []);

  function bfs(startNode) {
    let queue = [startNode];
    let visited = new Set([`${startNode[0]},${startNode[1]}`]);

    function visitCell([x, y]) {
      const level = Math.min(visitCounter.current++, 8);
      setMaze((prevMaze) =>
        prevMaze.map((row, rowIndex) =>
          row.map((cell, cellIndex) => {
            if (rowIndex === y && cellIndex === x) {
              if (cell === "end") return "end";
              return `visited-${level}`;
            }
            return cell;
          })
        )
      );
      if (maze[y][x] === "end") return true;
      return false;
    }

    function step() {
      if (queue.length === 0) return;

      const [x, y] = queue.shift();
      const dirs = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
      ];

      for (const [dx, dy] of dirs) {
        const nx = x + dx;
        const ny = y + dy;

        if (
          nx >= 0 &&
          nx < width &&
          ny >= 0 &&
          ny < height &&
          !visited.has(`${nx},${ny}`)
        ) {
          visited.add(`${nx},${ny}`);
          if (maze[ny][nx] === "path" || maze[ny][nx] === "end") {
            if (visitCell([nx, ny])) return;
            queue.push([nx, ny]);
          }
        }
      }

      const timeoutId = setTimeout(step, 0.001);
      setTimeoutIds((prev) => [...prev, timeoutId]);
    }

    step();
  }

  function dfs(startNode) {
    let stack = [startNode];
    let visited = new Set([`${startNode[0]},${startNode[1]}`]);

    function visitCell([x, y]) {
      const level = Math.min(visitCounter.current++, 8);
      setMaze((prevMaze) =>
        prevMaze.map((row, rowIndex) =>
          row.map((cell, cellIndex) => {
            if (rowIndex === y && cellIndex === x) {
              if (cell === "end") return "end";
              return `visited-${level}`;
            }
            return cell;
          })
        )
      );
      if (maze[y][x] === "end") return true;
      return false;
    }

    function step() {
      if (stack.length === 0) return;

      const [x, y] = stack.pop();
      const dirs = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
      ];

      for (const [dx, dy] of dirs) {
        const nx = x + dx;
        const ny = y + dy;

        if (
          nx >= 0 &&
          nx < width &&
          ny >= 0 &&
          ny < height &&
          !visited.has(`${nx},${ny}`)
        ) {
          visited.add(`${nx},${ny}`);
          if (maze[ny][nx] === "path" || maze[ny][nx] === "end") {
            if (visitCell([nx, ny])) return;
            stack.push([nx, ny]);
          }
        }
      }

      const timeoutId = setTimeout(step, 0.001);
      setTimeoutIds((prev) => [...prev, timeoutId]);
    }

    step();
  }
  function dijkstra(startNode) {
  let pq = [[0, startNode]]; // [distance, [x, y]]
  let visited = new Set();
  let distances = Array(height)
    .fill()
    .map(() => Array(width).fill(Infinity));
  distances[startNode[1]][startNode[0]] = 0;

  function visitCell([x, y]) {
    const level = Math.min(visitCounter.current++, 8);
    setMaze((prevMaze) =>
      prevMaze.map((row, rowIndex) =>
        row.map((cell, cellIndex) => {
          if (rowIndex === y && cellIndex === x) {
            if (cell === "end") return "end";
            return `visited-${level}`;
          }
          return cell;
        })
      )
    );
    if (maze[y][x] === "end") return true;
    return false;
  }

  function step() {
    if (pq.length === 0) return;

    pq.sort((a, b) => a[0] - b[0]); // sort by distance
    const [dist, [x, y]] = pq.shift();
    const key = `${x},${y}`;

    if (visited.has(key)) return setTimeout(step, 0.001);
    visited.add(key);

    if (visitCell([x, y])) return;

    const dirs = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ];

    for (const [dx, dy] of dirs) {
      const nx = x + dx;
      const ny = y + dy;

      if (
        nx >= 0 &&
        nx < width &&
        ny >= 0 &&
        ny < height &&
        !visited.has(`${nx},${ny}`)
      ) {
        if (maze[ny][nx] === "path" || maze[ny][nx] === "end") {
          const newDist = dist + 1;
          if (newDist < distances[ny][nx]) {
            distances[ny][nx] = newDist;
            pq.push([newDist, [nx, ny]]);
          }
        }
      }
    }

    const timeoutId = setTimeout(step, 0.001);
    setTimeoutIds((prev) => [...prev, timeoutId]);
  }

  step();
}


  function generateMaze(height, width) {
    if (height % 2 === 0) height += 1;
    if (width % 2 === 0) width += 1;

    visitCounter.current = 0;
    let matrix = Array.from({ length: height }, () =>
      Array(width).fill("wall")
    );

    const dirs = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ];

    function isCellValid(x, y) {
      return (
        y > 0 &&
        x > 0 &&
        x < width - 1 &&
        y < height - 1 &&
        matrix[y][x] === "wall"
      );
    }

    function carvePath(x, y) {
      matrix[y][x] = "path";

      const directions = dirs.sort(() => Math.random() - 0.5);
      for (let [dx, dy] of directions) {
        const nx = x + dx * 2;
        const ny = y + dy * 2;
        if (isCellValid(nx, ny)) {
          matrix[y + dy][x + dx] = "path";
          carvePath(nx, ny);
        }
      }
    }

    carvePath(1, 1);

    matrix[1][0] = "start";
    matrix[height - 2][width - 1] = "end";

    setMaze(matrix);
  }

  function refreshMaze() {
    timeoutIds.forEach(clearTimeout);
    setTimeoutIds([]);
    generateMaze(100, 100);
  }

  return (
    <div className="maze-grid">
      <div className="controls">
        <button className="maze-button" onClick={refreshMaze}>
          Refresh Maze
        </button>
        <button className="maze-button" onClick={() => bfs([1, 0])}>
          Breadth-First Search
        </button>
        <button className="maze-button" onClick={() => dfs([1, 0])}>
          Depth-First Search
        </button>
        <button className="maze-button" onClick={() => dijkstra([1, 0])}>
          Dijkstra's Algorithm
        </button>

      </div>
      <div className="maze">
        {maze.map((row, rowIndex) => (
          <div className="row" key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <div
                className={`cell ${cell}`}
                key={`${rowIndex}-${cellIndex}`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
