import { ActionTypes } from '../constants';

export function initSplash() {
  return {
    type: ActionTypes.InitSplash
  }
};

export function startGame() {
  return {
    type: ActionTypes.START_GAME
  };
};

export function moveTetriminoDown() {
  return {
    type: ActionTypes.MOVE_TETRIMINO_DOWN
  };
};
