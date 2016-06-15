import { clone, times, sample } from 'lodash';
import { GameStates, ActionTypes, TetriminoColors, TetriminoShapes } from '../constants';

const DEFAULT_BOARD_WIDTH = 10;
const DEFAULT_BOARD_HEIGHT = 24;

class Tetrimino {
  constructor(board, type, color) {
    this.shape = type ? TetriminoShapes[type] : sample(TetriminoShapes);
    this.color = color ? TetriminoColors[color] : sample(TetriminoColors);

    this.height = this.shape.length;
    this.width = this.shape[0].length;

    this.left = (Math.floor(board.width / 2) - board.width % 2) - (Math.floor(this.width / 2) + (this.width % 2));
    this.top = 0;

    return this;
  }

  moveLeft(board) {
    const newLeft = this.left - 1;
    const canMove = every(this.shape, (row, y) => {
      return every(row, (cell, x) => {
        return cell && !board.isFilled(x, y);
      })
    })

  }
  moveRight() {}
  moveDown() {
    this.top++;
    return clone(this);
  }
  rotate() {}
  drop() {}
}

class Board {
  constructor(width = DEFAULT_BOARD_WIDTH, height = DEFAULT_BOARD_HEIGHT) {
    const _this = [];

    times(height, () => {
      const row = [];
      times(width, () => row.push(null));
      _this.push(row);
    });

    _this.width = width;
    _this.height = height;

    _this.canPlace = this.canPlace;

    return _this;
  }

  placeTetrimino(tetrimino, x, y) {}
  canPlace(tetrimino) {
    const x = tetrimino.left;
    const y = tetrimino.top;

    if (x < 0 || x + tetrimino.width >= this.width) {
      return false;
    }

    if (y + tetrimino.height >= this.height) {
      return false;
    }

    return true;

  }
  clearRow(y) {}
  isRowFilled(y) {}
  fillCell(x, y, color) {
    board[y][x] = color;
  }
}

export function startGame() {
  const board = new Board();
  const tetrimino = new Tetrimino(board);

  return {
    gameState: GameStates.GAME_STARTED,
    board: board,
    tetrimino: tetrimino
  };
};


const getInitialState = () => {
  return {
    gameState: GameStates.SPLASH,
    board: null,
    tetrimino: null
  };
};

export default function gameStateReducer(state = {}, action) {
  switch (action.type) {
    case ActionTypes.START_GAME: {
      return startGame();
    }

    case ActionTypes.MOVE_TETRIMINO_DOWN: {
      const newTetriminoState = state.tetrimino.moveDown();

      if (state.board.canPlace(newTetriminoState)) {
        return {
          ...state,
          tetrimino: newTetriminoState
        };
      } else {
        const newBoardState = state.board.placeTetrimino(state.tetrimino);

        return {
          ...state,
          board: newBoard,
          tetrimino: new Tetrimino(newBoard)
        };
      }
    }

    case ActionTypes.INIT_SPLASH:
    default: {
      return getInitialState();
    }

  }
};
