import { useState } from 'react';
import './Game.css';

/**
 * 单个格子组件
 * @param {string|null} value - 格子的值，'X'、'O' 或 null
 * @param {function} onSquareClick - 点击格子时的回调函数
 */
function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

/**
 * 棋盘组件
 * @param {boolean} xIsNext - 是否轮到 X 玩家
 * @param {Array} squares - 9个格子的状态数组
 * @param {function} onPlay - 游戏状态更新回调函数
 */
function Board({ xIsNext, squares, onPlay }) {
  /**
   * 处理格子点击事件
   * @param {number} i - 被点击格子的索引 (0-8)
   */
  function handleClick(i) {
    // 如果游戏已结束或格子已被占用，则不执行任何操作
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    
    // 创建新的格子状态数组（不可变更新）
    const nextSquares = squares.slice();
    
    // 根据当前玩家设置格子值
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    
    // 通知父组件更新游戏状态
    onPlay(nextSquares);
  }

  // 计算当前是否有获胜者
  const winner = calculateWinner(squares);
  let status;
  
  // 根据游戏状态设置显示文本
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

/**
 * 主游戏组件 - 管理整个井字棋游戏的状态和逻辑
 */
export default function Game() {
  // 游戏历史记录，每个元素代表一个游戏状态（9个格子的数组）
  const [history, setHistory] = useState([Array(9).fill(null)]);
  
  // 当前移动的步数（用于时间旅行功能）
  const [currentMove, setCurrentMove] = useState(0);
  
  // 根据当前步数判断是否轮到 X 玩家（偶数步为 X，奇数步为 O）
  const xIsNext = currentMove % 2 === 0;
  
  // 获取当前步骤的棋盘状态
  const currentSquares = history[currentMove];

  /**
   * 处理游戏状态更新
   * @param {Array} nextSquares - 新的棋盘状态
   */
  function handlePlay(nextSquares) {
    // 创建新的历史记录：保留当前步骤之前的历史 + 新的棋盘状态
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    
    // 更新历史记录
    setHistory(nextHistory);
    
    // 更新当前步数为最新步骤
    setCurrentMove(nextHistory.length - 1);
  }

  /**
   * 时间旅行功能 - 跳转到指定的游戏步骤
   * @param {number} nextMove - 要跳转到的步骤
   */
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  // 生成历史记录按钮列表
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

/**
 * 计算井字棋的获胜者
 * @param {Array} squares - 9个格子的状态数组
 * @returns {string|null} 获胜者 ('X' 或 'O')，如果没有获胜者则返回 null
 */
function calculateWinner(squares) {
  // 定义所有可能的获胜组合（横、竖、斜线）
  const lines = [
    [0, 1, 2], // 第一行
    [3, 4, 5], // 第二行
    [6, 7, 8], // 第三行
    [0, 3, 6], // 第一列
    [1, 4, 7], // 第二列
    [2, 5, 8], // 第三列
    [0, 4, 8], // 主对角线
    [2, 4, 6], // 副对角线
  ];
  
  // 遍历所有可能的获胜组合
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    
    // 检查三个格子是否都有值且值相同
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]; // 返回获胜者
    }
  }
  
  // 没有获胜者
  return null;
}