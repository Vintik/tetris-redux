import { each, clone, cloneDeep, times, sample } from 'lodash';
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
    return this;
  }
  rotate() {}
  drop() {}
}

class Board {
  constructor(width = DEFAULT_BOARD_WIDTH, height = DEFAULT_BOARD_HEIGHT) {
    this.rows = [];

    times(height, () => {
      const row = [];
      times(width, () => row.push(null));
      this.rows.push(row);
    });

    this.width = width;
    this.height = height;

    // _this.getTetriminoCells = this.getTetriminoCells;
    // _this.canMove = this.canMove;
    // _this.placeTetrimino = this.placeTetrimino;
    // _this.clearRow = this.clearRow;
    // _this.isRowFilled = this.isRowFilled;

    // return _this;
  }

  getTetriminoCells(tetrimino) {
    const cells = [];

    each(tetrimino.shape, (row, y) => {
      each(row, (value, x) => {
        if (value) {
          cells.push({
            x: x + tetrimino.left,
            y: y + tetrimino.top
          });
        }
      });
    });

    return cells;
  }

  placeTetrimino(tetrimino) {
    const cells = this.getTetriminoCells(tetrimino);
    this.rows = cloneDeep(this.rows);

    each(cells, (c) => {
      this.rows[c.y][c.x] = tetrimino.color;
    });

    return this;
  }

  canMove(tetrimino) {
    const x = tetrimino.left;
    const y = tetrimino.top;

    if (x < 0 || x + tetrimino.width >= this.width) {
      return false;
    }

    if (y + tetrimino.height > this.height) {
      return false;
    }

    const cells = this.getTetriminoCells(tetrimino);

    return _.every(cells, (cell) => {
      return !this.rows[cell.y][cell.x];
    });
  }

  clearRow(y) {}
  isRowFilled(y) {}
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
      let newTetriminoState = clone(state.tetrimino).moveDown();
      let newBoardState = state.board;

      if (!state.board.canMove(newTetriminoState)) {
        newBoardState = clone(state.board).placeTetrimino(state.tetrimino);
        newTetriminoState = new Tetrimino(newBoardState);
      }

      return {
        ...state,
        board: newBoardState,
        tetrimino: newTetriminoState
      };
    }

    case ActionTypes.MOVE_TETRIMINO_LEFT: {
      let newTetriminoState = state.tetrimino.moveLeft();
      let newBoardState = state.board;

      if (!state.board.canMove(newTetriminoState)) {
        newBoardState = state.board.placeTetrimino(state.tetrimino);
        newTetriminoState = new Tetrimino(newBoardState);
      }

      return {
        ...state,
        board: newBoardState,
        tetrimino: newTetriminoState
      };
    }

    case ActionTypes.MOVE_TETRIMINO_RIGHT: {

    }

    case ActionTypes.INIT_SPLASH:
    default: {
      return getInitialState();
    }

  }
};
