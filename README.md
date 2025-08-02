# 🧩 Maze Visualizer

Welcome to the **Maze Visualizer** – a fun little tool built with **React** to help you actually see how maze-solving algorithms like **Breadth-First Search (BFS)** and **Depth-First Search (DFS)** work step-by-step.

## ✨ What This Does

- 🔀 Generates a random maze every time you click "Refresh"
- 🔍 Visually shows how BFS and DFS explore the maze
- 🎨 Animates the process so you can follow each move
- 🎛️ Simple buttons to switch between algorithms

It’s all about learning how pathfinding works – but in a way that looks and feels alive.

## 🧠 Algorithms Inside

- **Breadth-First Search (BFS)**  
  Explores level by level, guarantees the shortest path (if one exists).

- **Depth-First Search (DFS)**  
  Dives deep first, doesn’t always find the shortest path, but can be faster in some cases.

- **Dijkstra’s Algorithm**  
  A weighted algorithm that finds the shortest path from the start to the end node. It guarantees the optimal path and works well even when node weights vary.

## 🛠️ Tech Stack

- **React** (for UI)
- **JavaScript** (logic)
- **CSS** (for grid layout & animations)

## 🚀 How to Run It Locally

```bash
# 1. Clone the repo
git clone https://github.com/DoctorDictator/maze-visualizer.git
cd maze-visualizer

# 2. Install the packages
npm install

# 3. Start the app
npm start
