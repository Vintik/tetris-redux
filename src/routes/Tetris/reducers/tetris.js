import { each, clone, every, cloneDeep, times, sample, zip } from 'lodash';
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
  }

  moveLeft() {
    this.left--;
    return this;
  }

  moveRight() {
    this.left++;
    return this;
  }

  moveDown() {
    this.top++;
    return this;
  }

  // TODO: In real tetris the tetrimino should rotate around the center,
  //       instead of keeping the same position on the board.
  rotate() {
    this.shape = zip.apply(null, this.shape).map(row => {
      return row.reverse()
    });

    this.height = this.shape.length;
    this.width = this.shape[0].length;

    return this;
  }
  drop() {}
}

class Board {
  constructor(width = DEFAULT_BOARD_WIDTH, height = DEFAULT_BOARD_HEIGHT) {
    this.rows = [];

    times(height, () => this.addRow(width));

    this.width = width;
    this.height = height;
  }

  addRow(width) {
    const row = [];
    times(width, () => row.push(null));
    this.rows.unshift(row);
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

    if (x < 0 || x + tetrimino.width > this.width) {
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

  clearRows(tetrimino) {
    const lenRows = tetrimino.shape.length;

    times(lenRows, (index) => {
      const rowIndex = tetrimino.top + index;
      const isRowFull = every(this.rows[rowIndex], (val) => !!val);

      if (isRowFull) {
        this.rows.splice(rowIndex, 1);
        this.addRow(this.width);
      }
    });

    return this;
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


const initialState = {
  gameState: GameStates.SPLASH,
  board: null,
  tetrimino: null
};

export default function gameStateReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.START_GAME: {
      return startGame();
    }

    case ActionTypes.MOVE_TETRIMINO_DOWN: {
      let newTetriminoState = clone(state.tetrimino).moveDown();
      let newBoardState = state.board;

      if (!state.board.canMove(newTetriminoState)) {
        newBoardState = clone(state.board)
          .placeTetrimino(state.tetrimino)
          .clearRows(state.tetrimino);
        newTetriminoState = new Tetrimino(newBoardState);
      }

      return {
        ...state,
        board: newBoardState,
        tetrimino: newTetriminoState
      };
    }

    case ActionTypes.MOVE_TETRIMINO_LEFT: {
      let newTetriminoState = clone(state.tetrimino).moveLeft();

      if (!state.board.canMove(newTetriminoState)) {
        return state;
      }

      return {
        ...state,
        tetrimino: newTetriminoState
      };
    }

    case ActionTypes.MOVE_TETRIMINO_RIGHT: {
      let newTetriminoState = clone(state.tetrimino).moveRight();

      if (!state.board.canMove(newTetriminoState)) {
        return state;
      }

      return {
        ...state,
        tetrimino: newTetriminoState
      };
    }

    case ActionTypes.ROTATE_TETRIMINO: {
      let newTetriminoState = clone(state.tetrimino).rotate();

      if (!state.board.canMove(newTetriminoState)) {
        return state;
      }

      return {
        ...state,
        tetrimino: newTetriminoState
      };
    }
  }

  return initialState;
};
