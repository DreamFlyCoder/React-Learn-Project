import { useState } from 'react';
import './Chess.css';

/**
 * 象棋棋子组件
 * @param {Object} piece - 棋子对象 {type, color, position}
 * @param {function} onPieceClick - 点击棋子时的回调函数
 * @param {boolean} isSelected - 是否被选中
 */
function ChessPiece({ piece, onPieceClick, isSelected }) {
  if (!piece) return null;
  
  return (
    <div 
      className={`chess-piece ${piece.color} ${isSelected ? 'selected' : ''}`}
      onClick={() => onPieceClick(piece)}
    >
      {piece.type}
    </div>
  );
}

/**
 * 象棋棋盘组件
 * @param {Array} board - 9x10的棋盘数组
 * @param {Object} selectedPiece - 当前选中的棋子
 * @param {Array} possibleMoves - 可能的移动位置
 * @param {function} onSquareClick - 点击格子时的回调函数
 * @param {function} onPieceClick - 点击棋子时的回调函数
 */
function ChessBoard({ board, selectedPiece, possibleMoves, onSquareClick, onPieceClick }) {
  return (
    <div className="chess-board">
      {/* 九宫格对角线 */}
      <div className="palace-lines"></div>
      
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="chess-row">
          {row.map((piece, colIndex) => {
            const position = { row: rowIndex, col: colIndex };
            const isPossibleMove = possibleMoves.some(move => 
              move.row === rowIndex && move.col === colIndex
            );
            const isSelected = selectedPiece && 
              selectedPiece.position.row === rowIndex && 
              selectedPiece.position.col === colIndex;
            
            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`chess-square ${isPossibleMove ? 'possible-move' : ''}`}
                onClick={() => onSquareClick(position)}
              >
                <ChessPiece 
                  piece={piece} 
                  onPieceClick={onPieceClick}
                  isSelected={isSelected}
                />
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

/**
 * 主象棋游戏组件
 */
export default function Chess() {
  // 初始化棋盘 - 9列10行的空棋盘
  const initialBoard = Array(10).fill(null).map(() => Array(9).fill(null));
  
  // 设置初始棋子位置
  const setupInitialPieces = () => {
    const board = initialBoard.map(row => [...row]);
    
    // 红方棋子（下方，row 6-9）
    const redPieces = [
      { type: '车', color: 'red', position: { row: 9, col: 0 } },
      { type: '马', color: 'red', position: { row: 9, col: 1 } },
      { type: '象', color: 'red', position: { row: 9, col: 2 } },
      { type: '士', color: 'red', position: { row: 9, col: 3 } },
      { type: '帅', color: 'red', position: { row: 9, col: 4 } },
      { type: '士', color: 'red', position: { row: 9, col: 5 } },
      { type: '象', color: 'red', position: { row: 9, col: 6 } },
      { type: '马', color: 'red', position: { row: 9, col: 7 } },
      { type: '车', color: 'red', position: { row: 9, col: 8 } },
      { type: '炮', color: 'red', position: { row: 7, col: 1 } },
      { type: '炮', color: 'red', position: { row: 7, col: 7 } },
      { type: '兵', color: 'red', position: { row: 6, col: 0 } },
      { type: '兵', color: 'red', position: { row: 6, col: 2 } },
      { type: '兵', color: 'red', position: { row: 6, col: 4 } },
      { type: '兵', color: 'red', position: { row: 6, col: 6 } },
      { type: '兵', color: 'red', position: { row: 6, col: 8 } },
    ];
    
    // 黑方棋子（上方，row 0-3）
    const blackPieces = [
      { type: '车', color: 'black', position: { row: 0, col: 0 } },
      { type: '马', color: 'black', position: { row: 0, col: 1 } },
      { type: '象', color: 'black', position: { row: 0, col: 2 } },
      { type: '士', color: 'black', position: { row: 0, col: 3 } },
      { type: '将', color: 'black', position: { row: 0, col: 4 } },
      { type: '士', color: 'black', position: { row: 0, col: 5 } },
      { type: '象', color: 'black', position: { row: 0, col: 6 } },
      { type: '马', color: 'black', position: { row: 0, col: 7 } },
      { type: '车', color: 'black', position: { row: 0, col: 8 } },
      { type: '炮', color: 'black', position: { row: 2, col: 1 } },
      { type: '炮', color: 'black', position: { row: 2, col: 7 } },
      { type: '卒', color: 'black', position: { row: 3, col: 0 } },
      { type: '卒', color: 'black', position: { row: 3, col: 2 } },
      { type: '卒', color: 'black', position: { row: 3, col: 4 } },
      { type: '卒', color: 'black', position: { row: 3, col: 6 } },
      { type: '卒', color: 'black', position: { row: 3, col: 8 } },
    ];
    
    // 将棋子放置到棋盘上
    [...redPieces, ...blackPieces].forEach(piece => {
      board[piece.position.row][piece.position.col] = piece;
    });
    
    return board;
  };

  const [board, setBoard] = useState(setupInitialPieces);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [possibleMoves, setPossibleMoves] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState('red'); // red 或 black
  const [gameStatus, setGameStatus] = useState('playing'); // playing, red-wins, black-wins

  /**
   * 处理棋子点击
   * @param {Object} piece - 被点击的棋子
   */
  const handlePieceClick = (piece) => {
    // 如果点击的是当前玩家的棋子，选中它
    if (piece.color === currentPlayer) {
      setSelectedPiece(piece);
      setPossibleMoves(getPossibleMoves(piece, board));
    } else if (selectedPiece) {
      // 如果点击的是对方棋子且已选中棋子，尝试移动
      handleMove(selectedPiece, piece.position);
    }
  };

  /**
   * 处理格子点击
   * @param {Object} position - 点击的位置
   */
  const handleSquareClick = (position) => {
    if (selectedPiece) {
      handleMove(selectedPiece, position);
    }
  };

  /**
   * 处理移动
   * @param {Object} piece - 要移动的棋子
   * @param {Object} targetPosition - 目标位置
   */
  const handleMove = (piece, targetPosition) => {
    const newBoard = board.map(row => [...row]);
    const { row: fromRow, col: fromCol } = piece.position;
    const { row: toRow, col: toCol } = targetPosition;

    // 检查移动是否合法
    if (isValidMove(piece, targetPosition, board)) {
      // 移动棋子
      newBoard[toRow][toCol] = { ...piece, position: targetPosition };
      newBoard[fromRow][fromCol] = null;
      
      setBoard(newBoard);
      setSelectedPiece(null);
      setPossibleMoves([]);
      
      // 切换玩家
      setCurrentPlayer(currentPlayer === 'red' ? 'black' : 'red');
      
      // 检查游戏状态
      checkGameStatus(newBoard);
    } else {
      // 移动不合法，取消选择
      setSelectedPiece(null);
      setPossibleMoves([]);
    }
  };

  /**
   * 检查移动是否合法（简化版规则）
   * @param {Object} piece - 棋子
   * @param {Object} targetPosition - 目标位置
   * @param {Array} board - 棋盘
   */
  const isValidMove = (piece, targetPosition, board) => {
    const { row: fromRow, col: fromCol } = piece.position;
    const { row: toRow, col: toCol } = targetPosition;
    
    // 基本检查
    if (toRow < 0 || toRow >= 10 || toCol < 0 || toCol >= 9) return false;
    if (fromRow === toRow && fromCol === toCol) return false;
    
    const targetPiece = board[toRow][toCol];
    if (targetPiece && targetPiece.color === piece.color) return false;
    
    // 简化的移动规则
    const rowDiff = Math.abs(toRow - fromRow);
    const colDiff = Math.abs(toCol - fromCol);
    
    switch (piece.type) {
      case '兵':
      case '卒':
        // 兵只能向前走一步，过河后可以左右走
        if (piece.color === 'red') {
          return (toRow === fromRow - 1 && toCol === fromCol) || 
                 (fromRow <= 4 && rowDiff === 0 && colDiff === 1);
        } else {
          return (toRow === fromRow + 1 && toCol === fromCol) || 
                 (fromRow >= 5 && rowDiff === 0 && colDiff === 1);
        }
      
      case '车':
        // 车走直线
        return (rowDiff === 0 || colDiff === 0) && isPathClear(fromRow, fromCol, toRow, toCol, board);
      
      case '炮':
        // 炮走直线，吃子需要隔一个棋子
        if (rowDiff === 0 || colDiff === 0) {
          if (targetPiece) {
            // 炮吃子：路径上必须恰好有一个棋子
            return countPiecesInPath(fromRow, fromCol, toRow, toCol, board) === 1;
          } else {
            // 炮移动：路径必须完全畅通
            return isPathClear(fromRow, fromCol, toRow, toCol, board);
          }
        }
        return false;
      
      case '马':
        // 马走日字，不能蹩马腿
        if ((rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2)) {
          // 检查马腿是否被蹩
          const horseLegRow = fromRow + (toRow - fromRow) / 2;
          const horseLegCol = fromCol + (toCol - fromCol) / 2;
          
          // 如果马腿位置有棋子，则被蹩腿
          if (board[horseLegRow][horseLegCol]) {
            return false;
          }
          return true;
        }
        return false;
      
      case '象':
        // 象走田字，不能过河
        return rowDiff === 2 && colDiff === 2 && 
               (piece.color === 'red' ? toRow >= 5 : toRow <= 4);
      
      case '士':
        // 士只能在九宫格内走斜线
        {
          const inPalace = (piece.color === 'red' ? 
            (toRow >= 7 && toRow <= 9 && toCol >= 3 && toCol <= 5) :
            (toRow >= 0 && toRow <= 2 && toCol >= 3 && toCol <= 5));
          return rowDiff === 1 && colDiff === 1 && inPalace;
        }
      
      case '帅':
      case '将':
        // 帅/将只能在九宫格内走直线
        {
          const inPalace2 = (piece.color === 'red' ? 
            (toRow >= 7 && toRow <= 9 && toCol >= 3 && toCol <= 5) :
            (toRow >= 0 && toRow <= 2 && toCol >= 3 && toCol <= 5));
          return ((rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1)) && inPalace2;
        }
      
      default:
        return false;
    }
  };

  /**
   * 获取棋子的可能移动位置
   * @param {Object} piece - 棋子
   * @param {Array} board - 棋盘
   */
  const getPossibleMoves = (piece, board) => {
    const moves = [];
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 9; col++) {
        if (isValidMove(piece, { row, col }, board)) {
          moves.push({ row, col });
        }
      }
    }
    return moves;
  };

  /**
   * 检查路径是否畅通
   */
  const isPathClear = (fromRow, fromCol, toRow, toCol, board) => {
    const rowStep = fromRow === toRow ? 0 : (toRow - fromRow) / Math.abs(toRow - fromRow);
    const colStep = fromCol === toCol ? 0 : (toCol - fromCol) / Math.abs(toCol - fromCol);
    
    let row = fromRow + rowStep;
    let col = fromCol + colStep;
    
    while (row !== toRow || col !== toCol) {
      if (board[row][col]) return false;
      row += rowStep;
      col += colStep;
    }
    return true;
  };

  /**
   * 计算路径上的棋子数量
   */
  const countPiecesInPath = (fromRow, fromCol, toRow, toCol, board) => {
    const rowStep = fromRow === toRow ? 0 : (toRow - fromRow) / Math.abs(toRow - fromRow);
    const colStep = fromCol === toCol ? 0 : (toCol - fromCol) / Math.abs(toCol - fromCol);
    
    let count = 0;
    let row = fromRow + rowStep;
    let col = fromCol + colStep;
    
    while (row !== toRow || col !== toCol) {
      if (board[row][col]) count++;
      row += rowStep;
      col += colStep;
    }
    return count;
  };

  /**
   * 检查游戏状态
   */
  const checkGameStatus = (board) => {
    // 简化版：检查是否有帅/将
    let hasRedGeneral = false;
    let hasBlackGeneral = false;
    
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 9; col++) {
        const piece = board[row][col];
        if (piece) {
          if (piece.type === '帅') hasRedGeneral = true;
          if (piece.type === '将') hasBlackGeneral = true;
        }
      }
    }
    
    if (!hasRedGeneral) setGameStatus('black-wins');
    if (!hasBlackGeneral) setGameStatus('red-wins');
  };

  /**
   * 重新开始游戏
   */
  const restartGame = () => {
    setBoard(setupInitialPieces());
    setSelectedPiece(null);
    setPossibleMoves([]);
    setCurrentPlayer('red');
    setGameStatus('playing');
  };

  return (
    <div className="chess-game">
      <div className="chess-header">
        <h1>中国象棋</h1>
        <div className="game-info">
          <p>当前玩家: <span className={currentPlayer}>{currentPlayer === 'red' ? '红方' : '黑方'}</span></p>
          {gameStatus !== 'playing' && (
            <p className="game-status">
              {gameStatus === 'red-wins' ? '红方获胜！' : '黑方获胜！'}
            </p>
          )}
        </div>
        <button onClick={restartGame} className="restart-btn">重新开始</button>
      </div>
      
      <div className="chess-container">
        <ChessBoard
          board={board}
          selectedPiece={selectedPiece}
          possibleMoves={possibleMoves}
          onSquareClick={handleSquareClick}
          onPieceClick={handlePieceClick}
        />
      </div>
    </div>
  );
}
