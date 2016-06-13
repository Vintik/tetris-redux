import { clone, times } from 'lodash';
import { GameStates, ActionTypes } from '../constants';

const DEFAULT_MATRIX_WIDTH = 10;
const DEFAULT_MATRIX_HEIGHT = 24;

const getInitialState = () => {
  return {
    gameState: GameStates.SPLASH,
    matrix: buildEmptyMatrix()
  };
};

export function startGame() {
  return {
    gameState: GameStates.GAME_STARTED,
    matrix: buildEmptyMatrix(DEFAULT_MATRIX_WIDTH, DEFAULT_MATRIX_HEIGHT)
  };
};

export function buildEmptyMatrix(width, height) {
  const matrix = [];

  times(height, () => {
    const row = [];
    times(width, () => row.push({}));
    matrix.push(row);
  });

  return matrix;
}

export default function tetrisReducer(state = {}, action) {
  switch (action.type) {
    case ActionTypes.START_GAME: {
      return startGame();
    }

    default: {
      return getInitialState();
    }

  }
};
